var getConfig = function () {

	var configPublic = require('milo/config.public'),
		configPrivate = require('milo/config.private'),
		config = {},
		i;

	for (i in configPublic) {
	    if (configPublic.hasOwnProperty(i)) {
	        config[i] = configPublic[i];   
	    }
	}

	for (i in configPrivate) {
	    if (configPrivate.hasOwnProperty(i)) {
	        config[i] = configPrivate[i];   
	    }
	}

	return config;
}

var getAsset = function (file) {
	return require('fs').readFileSync(process.env.NODE_PATH + 'milo/assets/' + file, 'utf-8');
}

module.exports = {
	getConfig: getConfig,
	getAsset: getAsset
};