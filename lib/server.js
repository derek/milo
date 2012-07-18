var config = require('milo/utils').getConfig();

function runServer () {
	var express = require('express'),
	fs = require('fs'),
	map = require('milo/assets/serverRoutes'),
	renderTemplate = require('milo/utils').renderTemplate,
	server = express.createServer();

	server.get(/([.*])/, routeHandler);

	server.listen(3000);

	function routeHandler (req, res){
		var url = req.url,
		build = config.yuiPath + 'build',
		src = config.yuiPath + 'src',
		output = '';

		console.log('serving: ' + url);

		if (url.match('.js')) {
			map[url].targets.forEach(function (target) {
				output += fs.readFileSync(config.yuiPath + target, 'utf-8');
			});
			
			if (url.match('yui/yui.js')) {
				output = output.replace(/@YUI_CORE@/g, "['get','features','intl-base','yui-log','yui-later','loader-base', 'loader-rollup', 'loader-yui3']")
				output += "\n\nYUI.add('yui', function(Y){}, '3.6.0pr2' ,{use:['yui-base','get','features','intl-base','yui-log','yui-later','loader-base', 'loader-rollup', 'loader-yui3']});";
			}
			else {
				output = wrap(map[url].module, output, map[url].requires);			
			}

			serve(res, output, 'js');
		}
		else {
			// TODO: Actually pull the /src/ CSS
			fs.readFile(build + url, 'utf-8', function (err, data) {
				serve(res, data, 'css');
			});
		}
	}

	function serve(res, output, type) {
		var mime;

		switch (type) {
			case "css":
			mime = "text/css";
			break;

			case "js": 
			mime = "application/javascript";
			break;
		}

		res.header('Content-Length', output.length);
		res.header('Content-Type', mime + '; charset=utf-8');
		res.send(output);
	}

	function wrap(module, code, requires) {
		var config = {};

		if (requires.length > 0) {
			config.requires = requires;
		}

		return renderTemplate('module', {
			name: module,
			body: code,
			config: JSON.stringify(config)
		})
	}
}

function generateMap () {
	var fs = require('fs'),
	src = config.yuiPath + 'src/',
	modules = fs.readdirSync(src),
	output = {};

	// modules = ['attribute']
	modules.forEach(function (module) {
		var stat = fs.statSync(src + module, 'utf-8');
		if (stat.isDirectory()) {
			var buildFiles = fs.readdirSync(src + module);

			buildFiles.forEach(function (file) {
				var requires = [], mod,
					source, targets, props, properties;

				if (file.match('.properties')) {
					var properties = fs.readFileSync(src + module + '/' + file, 'utf-8'),
					props = parseProperties(properties),
					mod = props.component,
					source = '/' + mod + '/' + mod + '.js',
					targets;

					if (props.jsfiles) {
						if (!props.jsfiles.splice) {
							targets = [props.jsfiles];
						}
						else {
							targets = props.jsfiles;
						}

						for(var i=0; i < targets.length; i++) {
							targets[i] = ('/src/' + module + '/js/' + targets[i]).trim();
						}
					}

					if (props.requires) {
						if (!props.requires.splice) {
							props.requires = [props.requires.replace(',', ' ')]
						}

	    				// Cleanup the array. Ridiculous chaining is ridiculous
	    				requires = props.requires.join(' ').replace(',', ' ').replace('  ', ' ').replace('  ', ' ').split(' ');
	    			}

	    			output[source] = {
	    				module: mod,
	    				source: source,
	    				targets: targets,
	    				prependfiles: props.prependfiles || null,
	    				requires: requires
	    			};
	    		}
	    	});
		}
	}); // We made it out alive !

	fs.writeFile(process.env.NODE_PATH + 'milo/assets/serverRoutes.json', JSON.stringify(output, null, 4));


	// This is so gross
	function parseProperties(properties) {
		var lines = properties.split('\n'),
		data = {},
		key;

		for (var i =0; i < lines.length; i++) {
			var line = lines[i];

			if (!line.match('#')) {
				if (line.match('=')) {
					// console.log(line);
					key = line.split('=')[0].replace('component.', '');
					val = line.split('=')[1].replace('\\', '').replace(',', '').trim();
					data[key] = val.replace(/,/g, ' ').replace(/  /g, ' ').split(' ');
				}
				else {
					if (line.trim().length > 0) {
						line = line.trim().replace('\\', '').replace(',', '');
						if (data[key]) {
							if (!data[key].splice) {
								data[key] = [data[key]];
							}

							data[key].push(line);
						}
						else {
							data[key] = line.trim();
						}
					}
				}
			}
		}

		return data;
	}

}


module.exports = function (action) {
	if (action === "generate") {
		generateMap();
	}
	else {
		runServer();
	}
}