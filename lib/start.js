module.exports = function (dirname) {
    var fs = require('fs'),
	    exec = require('child_process').exec,
        config = require('milo/utils').getConfig(),
	    getAsset = require('milo/utils').getAsset;
        
	if (!fs.existsSync(dirname)) {
		fs.mkdirSync(dirname);
		fs.writeFileSync(dirname + '/index.html',   getAsset('startHTML.txt'));
		fs.writeFileSync(dirname + '/my-css.css',   getAsset('startCSS.txt'));
		fs.writeFileSync(dirname + '/my-module.js', getAsset('startJS.txt'));
		
    	exec(config.browserCommand + ' ' + dirname + '/index.html', 'utf-8');
    	exec(config.editorCommand + ' ' + dirname, 'utf-8');
	    console.log("Generated");
	}
	else {
		console.log("Error: Directory already exists");
	}
};