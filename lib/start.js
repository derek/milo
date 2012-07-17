module.exports = function (dirname) {
    var fs = require('fs');
        
	if (!fs.existsSync(dirname)) {
		var getAsset = require('milo/utils').getAsset,
	        codeHTML = getAsset('startHTML.txt'),
	        codeCSS = getAsset('startCSS.txt'),
	        codeJS = getAsset('startJS.txt');

		fs.mkdirSync(dirname);
		fs.writeFileSync(dirname + '/index.html', codeHTML);
		fs.writeFileSync(dirname + '/my-css.css', codeCSS);
		fs.writeFileSync(dirname + '/my-module.js', codeJS);
		
	    console.log("Generated");
	}
	else {
		console.log("Error: File already exists");
	}
}