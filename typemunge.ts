import fs = require('fs')
import Q = require('q');
import _ = require('underscore');
import path = require('path')
var glob = require('glob');

export interface TypeMungeConfig {
    moduleType: string;
    moduleName: string;
    imports: TypeMungeImportsConfig;
    inlineTextFiles?: InlineTextConfig;
}

export interface TypeMungeCliConfig extends TypeMungeConfig {
    dts: string;
    js: string;
    dtsOut: string;
    jsOut: string;
}

interface TypeMungeImportConfig {
    alias:string;
    windowVariables: string[];
}

export interface TypeMungeImportsConfig {
    [key: string]: string|TypeMungeImportConfig;
}

interface InlineTextConfig {
    dir: string;
    pattern: string;
    namespace: string;
    useRequire: boolean;
}

function readFile(filepath : string) : Q.Promise<any>{
	var deferred = Q.defer();
	
	fs.readFile(path.resolve(filepath), 'utf8', function (err, data) {
	  if (err) deferred.reject(err);
	  
	  data = data.replace(/^\uFEFF/, '');
	  deferred.resolve(data);
	});

	return deferred.promise;
}

function writeFile(filepath : string, data) : Q.Promise<any> {
	var deferred = Q.defer();
	
    filepath = path.resolve(filepath);

	fs.writeFile(filepath, data, 'utf8', function (err) {
	  if (err) deferred.reject(err);
	  deferred.resolve(filepath);
	});

	return deferred.promise;
}

function searchDirectory(filepath : string, pattern) : Q.Promise<string[]> {

    var deferred = Q.defer<string[]>();

    glob(pattern, {cwd: filepath}, function (err, data) {
        if (err) deferred.reject(err);
        else deferred.resolve(data);
    });


    return deferred.promise;
}

interface Export {
    Name: string;
    Type: string;
}

function getExports(dtsContent : string): Export[]{
    var exports: Export[] = [];
	var regex = /declare\s+(module|class|enum|var)\s+(\S+)\s*{/g;
	for (var matches = regex.exec(dtsContent); matches != null; matches = regex.exec(dtsContent)) {
        exports.push({
            Name: matches[2],
            Type: matches[1]
        });
	}
	return _.uniq(exports, false, e => e.Name);
}

function mungeDts(dtsContent: string, moduleName : string, moduleType : string): string{

    switch(moduleType) {
        case 'global': break; //Use un-quoted module name
        case 'amd':
        case 'commonjs':
            moduleName = `'${moduleName}'`; //Use quoted (ambient) module name
            break;
        default:
            throw new Error(`Unrecognized module type: '${moduleType}'`);
    }
     
    return "declare module " + moduleName + " {\r\n"
        + dtsContent.replace(/declare module/g, 'module')
            .replace(/declare class/g, 'class')
            .replace(/declare enum/g, 'enum')
            .replace(/declare var/g, 'var')
        + "\r\n}";
        //+ `\r\ndeclare module '${config.moduleName}' {`
        //+ `\r\n\texports = ${config.moduleName}`
        //+ '\r\n}';
}

function mungeJs(jsContent : string, exports : Export[], 
    extraImports : TypeMungeImportsConfig, 
    inlineTextFilesConfig : InlineTextConfig,
    moduleType: string) : Q.Promise<string>{

	var imports : TypeMungeImportsConfig = {};
    if(moduleType === 'amd') {
        imports = {
    		require: 'require',
    		exports: 'exports'
    	};
    }
	
	if(extraImports) imports = _.extend(imports, extraImports);
	
	var defineStart : string;
    var defineEnd:string;
    if(moduleType === 'amd'){
        defineStart = "define([" 
				+ Object.keys(imports).map(function(k) { return "'" + k + "'";})
			+ "], function("
				+ Object.keys(imports).map(function(k) { return imports[k];})
			+ "){";
			
    	defineEnd = '})';
    }
    else if(moduleType === 'commonjs'){
        
        var requireStatement = (name : string, alias : string) => {
            if(alias) return `var ${alias} = require('${name}');`;
            else return `require('${name}');`;
        }
        
        defineStart = Object.keys(imports).map(k => { 
            if(typeof imports[k] === 'string') return requireStatement(k, <string>imports[k]);
            else {
                var importConfig = <TypeMungeImportConfig>imports[k];
                var windowVariables = importConfig.windowVariables.map(wv => `window.${wv} = ${importConfig.alias};`).join('\r\n');
                return `${requireStatement(k, importConfig.alias)}\r\n${windowVariables}`;
            }
        }).join('\r\n');
        defineEnd = '';
    }
    else throw new Error(`Unrecognized module type: '${moduleType}'`);
	
    var exportLines = _.chain(exports)
        .map(m => m.Name.match(/^[^\.]+/)[0]) //Take parent module only of any nested modules
        .unique()
        .map(m => {
	        if (jsContent.match(new RegExp("(^|\n)var " + m + "\\b", "g"))) return 'exports.' + m + ' = ' + m + ';';
	        else return '//exports.' + m + ' = ' + m + '; //Item not exported';
        })
        .value()
	    .join('\r\n');

	var output = defineStart + '\r\n' + jsContent + '\r\n' + exportLines + '\r\n' + defineEnd;

	if (!inlineTextFilesConfig) {
	    return Q(output);
	} else {
	    return searchDirectory(inlineTextFilesConfig.dir, inlineTextFilesConfig.pattern)
            .then(function (files) {
                return Q.all(
                    files.map(function (file) {
                        return readFile(inlineTextFilesConfig.dir + '/' + file)
                            .then(function (contents) {
                                return {
                                    contents: contents,
                                    path: file
                                };
                            });
                    })
                );
            })
            .then(function (readFiles) {
                console.log(Object.keys(readFiles[0]));
                if (!inlineTextFilesConfig.useRequire) output += `\r\nvar ${inlineTextFilesConfig.namespace} = {};`;

                readFiles.forEach(function (readFile) {
                    var contents = readFile.contents.replace(/\r?\n/g, '\\r\\n')
                                                    .replace(/'/g, "\\'");
                    if (inlineTextFilesConfig.useRequire) output += '\r\n' + "define('text!" + inlineTextFilesConfig.dir + "/" + readFile.path + "', [], function(){return'" + contents + "';});";
                    else output += `\r\n${inlineTextFilesConfig.namespace}['${readFile.path}'] = '${contents}';`
                });

                return output;
            });
	}
}

export function munge( config: TypeMungeConfig, dtsContent : string, jsContent? : string) 
    : Q.Promise<{jsMunged: string; dtsMunged : string;}> {
        
    var exports = getExports(dtsContent);
    console.log(`Found the following exports:\n${exports.map(e => e.Name + ' (' + e.Type + ')').join('\n')}`);

    var mungedDts = mungeDts(dtsContent, config.moduleName, config.moduleType);
    
    return (
            jsContent
                ? mungeJs(jsContent, exports, config.imports, config.inlineTextFiles, config.moduleType)
                : Q<string>(null)
        )
        .then(mungedJs => {
            return {
                jsMunged: mungedJs,
                dtsMunged: mungedDts
            }
        });
}
