///<reference path="../typings/mocha/mocha.d.ts" />
import chai = require('chai')
var expect = chai.expect;

import Q = require('q')
import typemunge = require('../typemunge')

var stripNewlines = (str : string) => str.replace(/\r?\n/g, '');

function assertMunged(dtsIn : string, 
	jsIn:string, 
	dtsExpected:string, 
	jsExpected:string, 
	config: typemunge.TypeMungeConfig,
	done: MochaDone){
	
	typemunge.munge(config, dtsIn, jsIn)
			.done(munged => {

				expect(stripNewlines(munged.jsMunged)).to.be.equal(stripNewlines(jsExpected));
				expect(stripNewlines(munged.dtsMunged)).to.be.equal(stripNewlines(dtsExpected));
				
				done()
			},done);
	
}

describe('munge', () => {
	it('should munge to amd with no configured imports', done => {
		var dts = 'declare module Blah {}';
		var js = 'var Blah;'
		
		var expectedJs = "define(['require','exports'], function(require,exports){var Blah;exports.Blah = Blah;})";
		var expectedDts = "declare module 'test' {module Blah {}}";
		
		var config : typemunge.TypeMungeConfig = {
			moduleType: 'amd',
			moduleName: 'test',
			imports: {}
		};
		
		assertMunged(dts, js, expectedDts, expectedJs, config, done);
	})
	
	it('should munge to amd with a configured import', done => {
		var dts = 'declare module Blah {}';
		var js = 'var Blah;'
		
		var expectedJs = "define(['require','exports','jquery'], function(require,exports,$){var Blah;exports.Blah = Blah;})";
		var expectedDts = "declare module 'test' {module Blah {}}";
		
		var config : typemunge.TypeMungeConfig = {
			moduleType: 'amd',
			moduleName: 'test',
			imports:  {
				jquery: '$'
			}
		}
		
		assertMunged(dts, js, expectedDts, expectedJs, config, done);
	})
	
	it('should munge to commonjs with no configured imports', done => {
		var dts = 'declare module Blah {}';
		var js = 'var Blah;'
		
		var expectedJs = "var Blah;exports.Blah = Blah;";
		var expectedDts = "declare module 'test' {module Blah {}}";
		
		var config : typemunge.TypeMungeConfig = {
			moduleType: 'commonjs',
			moduleName: 'test',
			imports: {}
		};
		
		assertMunged(dts, js, expectedDts, expectedJs, config, done);
	})
	
	it('should munge to commonjs with a configured import', done => {
		var dts = 'declare module Blah {}';
		var js = 'var Blah;'
		
		var expectedJs = "var $ = require('jquery');var Blah;exports.Blah = Blah;";
		var expectedDts = "declare module 'test' {module Blah {}}";
		
		var config : typemunge.TypeMungeConfig = {
			moduleType: 'commonjs',
			moduleName: 'test',
			imports: {
				jquery: '$'
			}
		};
		
		assertMunged(dts, js, expectedDts, expectedJs, config, done);
	})
	
	it('should munge to commonjs with an import with no alias', done => {
		var dts = 'declare module Blah {}';
		var js = 'var Blah;'
		
		var expectedJs = "require('jquery');var Blah;exports.Blah = Blah;";
		var expectedDts = "declare module 'test' {module Blah {}}";
		
		var config : typemunge.TypeMungeConfig = {
			moduleType: 'commonjs',
			moduleName: 'test',
			imports: {
				jquery: ''
			}
		};
		
		assertMunged(dts, js, expectedDts, expectedJs, config, done);
	})
	
	it('should munge to commonjs with windowified variables from import', done => {
		var dts = 'declare module Blah {}';
		var js = 'var Blah;'
		
		var expectedJs = "var $ = require('jquery');window.$ = $;window.jQuery = $;var Blah;exports.Blah = Blah;";
		var expectedDts = "declare module 'test' {module Blah {}}";
		
		var config : typemunge.TypeMungeConfig = {
			moduleType: 'commonjs',
			moduleName: 'test',
			imports: {
				jquery: {
					alias: '$',
					windowVariables: ['$', 'jQuery']
				}
			}
		};
		
		assertMunged(dts, js, expectedDts, expectedJs, config, done);
	})
	
	it('should munge to global module', () => {
		var dts = 'declare module Blah {}';
		
		var expectedDts = "declare module test {module Blah {}}";
		
		var config : typemunge.TypeMungeConfig = {
			moduleType: 'global',
			moduleName: 'test',
			imports: {},
		};
		
		return typemunge.munge(config, dts)
			.then(result => {
				expect(stripNewlines(result.dtsMunged)).to.be.equal(expectedDts);
				expect(result.jsMunged).to.be.null;
			})
	})
	
	it('should munge to amd with dts import', () => {
		var dts = 'declare module Blah {}';
		
		var expectedDts = "declare module 'test' {import wotsit = require('thing');module Blah {}}";
		
		var config : typemunge.TypeMungeConfig = {
			moduleType: 'amd',
			moduleName: 'test',
			imports: {},
			dtsImports: {
				thing: 'wotsit'
			}
		};
		
		return typemunge.munge(config, dts)
			.then(result => {
				expect(stripNewlines(result.dtsMunged)).to.be.equal(expectedDts);
			})
	})

})