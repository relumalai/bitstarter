#!/usr/bin/env node 
/* Automatically grades files for the presence of specific html tags/attributes. Using cheeio for basic dom parsing and commander for commandline application development. */

var fs = require('fs');
var program = require('commander');
var rest = require('restler');
var cheerio = require('cheerio');
var HTMLFILE_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.json";

var assertFileExists = function(infile) {

	var instr = infile.toString();
	if(!fs.existsSync(instr)) {

		console.log("%s does not exists", instr);
		process.exit(1); //stop 
	}
	return instr;
};

var cheerioHtmlFile = function(htmlfile) {
	return  cheerio.load(fs.readFileSync(htmlfile));
};

var loadChecks = function(checksfile) {
	return JSON.parse(fs.readFileSync(checksfile));
};

var checkHtmlFile = function(htmlfile, checksfile) {
	$ = cheerioHtmlFile(htmlfile);
	var checks = loadChecks(checksfile).sort();
	var out = {};
	for(var ii in checks) {
		var present = $(checks[ii]).length > 0;
		out [checks[ii]] = present;
	}
	return out;
};

var clone = function(fn) {
	//workaround for commander.js issue, http://stackoverflow.com/a/6772648
	return fn.bind({});	
};

if(require.main == module) {
	program
		.option('-c, --checks <check_file>', 'Path to checks.js', clone(assertFileExists), CHECKSFILE_DEFAULT)
		.option('-f, --file <html_file>', 'Path to index.html', clone(assertFileExists), HTMLFILE_DEFAULT)
		.option('-u, --url <url_to_grade>', 'url to grade')
		.parse(process.argv);
//	console.log ("%s is the program file", program.file);
//	console.log ("%s is the checks file", program.checks);
//	console.log ("%s is the url to be graded", program.url);
	rest.get(program.url).on('complete', function (result){
		if (result instanceof Error) {
		  console.log('Error:' + result.message);
		} else {
//			return result;
			fs.writeFileSync("temp_file.html", result, encoding='utf-8');
			}
	});
	
	var checkJson = checkHtmlFile("temp_file.html", program.checks);
	var outJson = JSON.stringify(checkJson, null, 4);
	console.log(outJson);
	} else {
	  	exports.checkHtmlFile = checkHtmlFile;
	  }
