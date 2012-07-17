module.exports = {

	getConfig: function () {

		var configPublic = require('milo/config.public'),
			configPrivate = require('milo/config.private'),
			config = {},
			key;

		for (key in configPublic) {
		    if (configPublic.hasOwnProperty(key)) {
		        config[key] = configPublic[key];
		    }
		}

		for (key in configPrivate) {
		    if (configPrivate.hasOwnProperty(key)) {
		        config[key] = configPrivate[key];
		    }
		}

		return config;
		
	},

	getAsset: function (file) {

		return require('fs').readFileSync(process.env.NODE_PATH + 'milo/assets/' + file, 'utf-8');

	}

};