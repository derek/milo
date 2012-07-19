module.exports = function (module, action) {
	var fs = require('fs'),
		path = require('path'),
		config = require('milo/utils').getConfig(),
        modulePath = config.yuiPath + 'src/' +  module,
        history = fs.readFileSync(modulePath + '/HISTORY.md', 'utf-8'),
        readme = fs.readFileSync(modulePath + '/README.md', 'utf-8'),
        jsFiles = fs.existsSync(modulePath + '/js') && fs.readdirSync(modulePath + '/js'),
        cssFiles = fs.existsSync(modulePath + '/css') && fs.readdirSync(modulePath + '/css'),
        meta = require(modulePath + '/meta/' + module);

	switch(action) {
		case "files":
			console.log();
			console.log('modulePath: ' + modulePath);
			if (jsFiles) {
				console.log();
				console.log('JS');
				jsFiles.forEach(function(file) { console.log(path.normalize(modulePath + '/js/' + file)); });
			}

			if (cssFiles) {
				console.log();
				console.log('CSS');
				cssFiles.forEach(function(file) { console.log(path.normalize(modulePath + '/css/' + file)); });
			}
			console.log();
			break;

		case "history":
			console.log();
			console.log(history);
			break;

		case "meta":
			console.log('\nMeta\n--------');
			console.log(meta);
			console.log();
			break;

		default: 
		    console.log();
			console.log(readme);
			break;
    }
};