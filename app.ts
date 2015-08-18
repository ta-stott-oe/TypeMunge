import yargs = require('yargs')
import fs = require('fs');
import typemunge = require('./typemunge')
import Q = require('q')
import path = require('path')
var mkdirp = require('mkdirp')

function objectFromJsonFile<T>(filepath : string) : Q.Promise<T>{

    return Q.nfcall<string>(fs.readFile, filepath, 'utf8')
    	.then(function(data){
    		return JSON.parse(data);
    	});
}


var argv = yargs
    .options({
        'c': {
            alias: 'config',
            type: 'string',
            require: true
        },
        'j': {
            alias: 'js',
            type: 'string'
        },
        'd': {
            alias: 'dts',
            type: 'string',
        },
        'm': {
            alias: 'mkdir',
            type: 'boolean'
        }
    })
    .argv;

function writeFile(filepath : string, contents : string, mkdir : boolean) : Q.Promise<any> {
    var dir = path.dirname(filepath);
    
    var ensureDir = dir !== '.' || !fs.existsSync(dir) 
        ? mkdir
            ? Q.nfcall<any>(mkdirp, dir)
            : Q.reject<any>(`Directory not found: ${dir}`)
        : Q(true);
    
    return ensureDir.then(() => Q.nfcall(fs.writeFile, filepath, contents));
}

function resolveSafe(...pathsegments : any[]) : string {
    if(pathsegments.some(ps => ps === null || ps === undefined)) return null;
    else return path.resolve.apply(path, pathsegments);
}

objectFromJsonFile<typemunge.TypeMungeCliConfig>(argv['config'])
	.then(config => {
	
        //Resolve all paths relative to config file
        var baseDir = path.dirname(argv['config']);
    
        var dtsInPath = resolveSafe(baseDir, config.dts);
        var jsInPath = resolveSafe(baseDir, config.js);
        var dtsOutPath = argv['dts'] || resolveSafe(baseDir, config.dtsOut);
        var jsOutPath = argv['js'] || resolveSafe(baseDir, config.jsOut);
		var libraryName = config.moduleName;
	
        var inputFiles = [dtsInPath, jsInPath].filter(f => !!f);
        var missingFiles = inputFiles.filter(f => !fs.existsSync(f));
        if (missingFiles.length) {
            throw new Error("Missing required files: " + missingFiles.join(', '));
        } 

        return Q.all(inputFiles.map(p => Q.nfcall<string>(fs.readFile, p, 'utf8')))
			.then(fileContents => {			
                return typemunge.munge(config, fileContents[0], fileContents[1])
                    .then(munged => {
                        if(munged.jsMunged)
                            return Q.all([
                                writeFile(jsOutPath, munged.jsMunged, argv['mkdir']),
                                writeFile(dtsOutPath, munged.dtsMunged, argv['mkdir'])
                            ])
                        else return writeFile(dtsOutPath, munged.dtsMunged, argv['mkdir']);
                    })
			});
        })
	    .done(() => {}, 
            error => {
                console.log(error);
                process.exit(1);
            });
	
	