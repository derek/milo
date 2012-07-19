module.exports = {

	getConfig: function () {

		var configPublic = require('milo/config.public'),
			configPrivate = require('milo/config.private'),
			config = {},
			key;

		for (key in configPublic.global) {
	        config[key] = configPublic.global[key];
		}

		for (key in configPrivate.global) {
	        config[key] = configPrivate.global[key];
		}

		if (configPublic.libraries && configPublic.libraries[this.library]) {
			for (key in configPublic.libraries[this.library]) {
		        config[key] = configPublic.libraries[this.library][key];
			}
		}
		
		if (configPrivate.libraries && configPrivate.libraries[this.library]) {
			for (key in configPrivate.libraries[this.library]) {
		        config[key] = configPrivate.libraries[this.library][key];
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
		var config = require('milo/lib/utils').getConfig(),
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
		console.log(files);
		files.forEach(function (file) {


			if (file.match('.js')) {
				utils.push(file.replace('.js', ''))
			}
		});

		return utils;
	},
	
	getUtilityMap : function () {
		var fs = require('fs'),
			miloPath = process.env.NODE_PATH + "milo/",
			utils = {},
			files,
			i;

		utilDirs = fs.readdirSync(miloPath + 'utilities');
		utilDirs.forEach(function (dir) {
			utilFiles = fs.readdirSync(miloPath + 'utilities/' + dir);
			utilFiles.forEach(function (file) {
				if (file.match('.js')) {
					var name = file.replace('.js', '');
					utils[name] = 'utilities/' + dir + '/' + name;	
				}
			});
		});

		return utils;
	}

};