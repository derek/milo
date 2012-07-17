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
		    if (jsFiles) {
		    	console.log('JS Files\n--------')
		    	console.log(modulePath + '/js')
		    	console.dir(jsFiles);
		    }

		    if (cssFiles) {
		    	console.log('CSS Files\n---------')
		    	console.log(modulePath + '/css')
		    	console.dir(cssFiles);
		    }
		    console.log();
    		break;

    	case "history":
		    console.log();
			console.log(history);
    		break;

    	case "meta":
			console.log('\nMeta\n--------')
		    console.log(meta);
		    console.log();
    		break;

    	default: 
		    console.log();
			console.log(readme);
    		break;
    }
}