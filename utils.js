function getConfig () {
	var fs = require('fs'),
		miloPath = this.miloPath,
		library = this.library,
		config = {},
		out = {},
		configPaths = [
			miloPath,
			miloPath + 'libraries/' + library + '/'
		],
		key;
		
	configPaths.forEach(function (path) {
		if (fs.existsSync(path + 'config.json')) {
			config = require(path + 'config');
			if (library === 'milo') {
				for (key in config.global) {
					out[key] = config.global[key];
				}
			}
			else {
				for (key in config) {
					out[key] = config[key];
				}
			}
		}
	});

	return out;
}

function getAsset (library, file) {
	var miloPath = this.miloPath;

	return require('fs').readFileSync(miloPath + 'libraries/' + library + '/assets/' + file, 'utf-8');
}

function getUtilityMap () {
	var fs = require('fs'),
		miloPath = this.miloPath,
		library = this.library,
		utils = {},
		name;

	files = fs.readdirSync(miloPath + 'libraries/' + library);
	files.forEach(function (file) {
		if (file.match('.js')) {
			name = file.replace('.js', '');
			utils[name] = miloPath + 'libraries/' + library + '/' + name;
		}
	});

	return utils;
}

module.exports = {
	getConfig 	  : getConfig,
	getAsset 	  : getAsset,
	getUtilityMap : getUtilityMap
};