import yargs = require('yargs')
import fs = require('fs');
import typemunge = require('./typemunge')
import Q = require('q')

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
            type: 'string'
        },
        'j': {
            alias: 'js',
            type: 'string'
        },
        'd': {
            alias: 'dts',
            type: 'string',
        }
    })
    .argv;

objectFromJsonFile<typemunge.TypeMungeCliConfig>(argv['config'])
	.then(config => {
	
        var _dtsPath = config.dts; ;
        var _jsPath = config.js;
        var _dtsOutPath = config.dtsOut || argv['dts'];
        var _jsOutPath = config.jsOut || argv['js'];
		var _libraryName = config.moduleName;
	
        var missingFiles = [_dtsPath, _jsPath].filter(f => !fs.existsSync(f));
        if (missingFiles.length) {
            throw new Error("Missing required files: " + missingFiles.join(', '));
        } 

        return Q.all([_dtsPath, _jsPath].map(p => Q.nfcall<string>(fs.readFile, p, 'utf8')))
			.then(files => {
				
                return typemunge.munge(files[0], files[1], config)
                    .then(munged => {
                        return Q.all([
                            Q.nfcall(fs.writeFile, _jsOutPath, munged.jsMunged),
                            Q.nfcall(fs.writeFile, _dtsOutPath, munged.dtsMunged)
                        ])
                    })
			});
        })
        .fail(error => console.log(error))
	    .done();
	
	