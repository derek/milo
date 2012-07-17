module.exports = function (module, action) {
	var fs = require('fs'),
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
			console.log(modulePath);
			if (jsFiles) {
				console.log('\t/js');
				jsFiles.forEach(function(file) { console.log('\t\t' + file); });
			}

			if (cssFiles) {
				console.log('\t/css');
				cssFiles.forEach(function(file) { console.log('\t\t' + file); });
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