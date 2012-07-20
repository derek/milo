function getConfig () {

	var configPublic = require('./config.public'),
		fs = require('fs'),
		configPrivate,
		config = {},
		key;

	for (key in configPublic.global) {
		config[key] = configPublic.global[key];
	}

	if (configPublic.libraries && configPublic.libraries[this.library]) {
		for (key in configPublic.libraries[this.library]) {
			config[key] = configPublic.libraries[this.library][key];
		}
	}

	if (fs.existsSync(miloPath + 'config.private.json')) {
		configPrivate = require('./config.private');
		for (key in configPrivate.global) {
			config[key] = configPrivate.global[key];
		}

		if (configPrivate.libraries && configPrivate.libraries[this.library]) {
			for (key in configPrivate.libraries[this.library]) {
				config[key] = configPrivate.libraries[this.library][key];
			}
		}
	}

	return config;

}

function getAsset (library, file) {
	var miloPath = getMiloPath();
	return require('fs').readFileSync(miloPath + 'libraries/' + library + '/assets/' + file, 'utf-8');

}

function renderTemplate (source, subs) {

	var handlebars = require('handlebars'),
		template = handlebars.compile(source);

	return template(subs);

}

function getGister (config) {
	var config = require('./utils').getConfig(),
		Gister = require('gister');

	return new Gister({
		token: config.github.token
	});
}

function getUtilityMap () {
	var fs = require('fs'),
		utils = {},
		files,
		i;

	utilDirs = fs.readdirSync(miloPath + 'libraries');
	utilDirs.forEach(function (dir) {
		utilFiles = fs.readdirSync(miloPath + 'libraries/' + dir);
		utilFiles.forEach(function (file) {
			if (file.match('.js')) {
				var name = file.replace('.js', '');
				utils[name] = 'libraries/' + dir + '/' + name;
			}
		});
	});

	return utils;
}

function getMiloPath () {
	var path = require('path');
	return __filename.replace(path.basename(__filename), '');
}

var miloPath = getMiloPath();

module.exports = {
	getConfig : getConfig,
	getAsset : getAsset,
	renderTemplate : renderTemplate,
	getGister : getGister,
	getUtilityMap: getUtilityMap,
	getMiloPath: getMiloPath
};