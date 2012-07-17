module.exports = function (dirname) {
    var fs = require('fs'),
	    getAsset = require('milo/utils').getAsset;
        
	if (!fs.existsSync(dirname)) {
		fs.mkdirSync(dirname);
		fs.writeFileSync(dirname + '/index.html',   getAsset('startHTML.txt'));
		fs.writeFileSync(dirname + '/my-css.css',   getAsset('startCSS.txt'));
		fs.writeFileSync(dirname + '/my-module.js', getAsset('startJS.txt'));
		
	    console.log("Generated");
	}
	else {
		console.log("Error: Directory already exists");
	}
}