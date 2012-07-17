module.exports = function (dirname) {
    var fs = require('fs'),
        miloPath = process.env.NODE_PATH + 'milo/',
        codeHTML = fs.readFileSync(miloPath + 'assets/startHTML.txt', 'utf-8'),
        codeCSS = fs.readFileSync(miloPath + 'assets/startCSS.txt', 'utf-8'),
        codeJS = fs.readFileSync(miloPath + 'assets/startJS.txt', 'utf-8');
        
	if (!fs.existsSync(dirname)) {
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