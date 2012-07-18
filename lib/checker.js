function checkREADME() {
	var config = require('milo/utils').getConfig(),
		fs = require('fs'),
        modules = fs.readdirSync(config.yuiPath + '/src');

    console.log();
	console.log('Checking README files...');

	modules.forEach(function (module) {
		var readmePath = config.yuiPath + 'src/' +  module,
			stat, exists;

		if(fs.existsSync(readmePath)) {
			stat = fs.statSync(readmePath, 'utf-8');
			if (stat.isDirectory()) {
				exists = fs.existsSync(readmePath + '/README.md');
				if (!exists) {
					console.log('\t' + module + ' is missing a README');
				}
			}
		}
	});
}

function checkHistory() {
	var config = require('milo/utils').getConfig(),
		fs = require('fs'),
        modules = fs.readdirSync(config.yuiPath + '/src'),
        historyFiles = [];

    console.log();
	console.log('Checking HISTORY files...');

	modules.forEach(function (module) {
		var historyPath = config.yuiPath + 'src/' +  module,
			stat, exists;

		if(fs.existsSync(historyPath)) {
			stat = fs.statSync(historyPath, 'utf-8');
			if (stat.isDirectory()) {
				exists = fs.existsSync(historyPath + '/HISTORY.md');
				if (!exists) {
					console.log('\t' + module + ' is missing a HISTORY.md');
				}
				else {
					historyFiles.push(historyPath + '/HISTORY.md');
				}
			}
		}
	});

	historyFiles.forEach(function (path){
		var text = fs.readFileSync(path, 'utf-8'),
			version = '3.6.0';

		if (!text.match(version)) {
			console.log('\t' + path + ' is missing a ' + version + ' entry');
		}
	});
}

module.exports = function () {
	checkREADME();
	checkHistory();
}