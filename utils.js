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

	},

	renderTemplate: function (name, subs) {

		var handlebars = require('handlebars'),
			asset = 'templates/' + name + '.mustache',
	        source = require('milo/utils').getAsset(asset),
	        template = handlebars.compile(source);

		return template(subs);

	},

	getGister: function () {
		var config = require('milo/utils').getConfig(),
		Gister = require('gister');

        return new Gister({
            token: config.github.token
        });
	},

	getUtilities: function () {
		var fs = require('fs'),
			miloPath = process.env.NODE_PATH + "milo/",
			utils = [],
			files,
			i;

		files = fs.readdirSync(miloPath + 'utilities');

		files.forEach(function (file) {
			if (file.match('.js')) {
				utils.push(file.replace('.js', ''))
			}
		});

		return utils;
	}

};