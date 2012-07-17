module.exports = function (filename) {
    var fs = require('fs'),
        miloPath = process.env.NODE_PATH + 'milo/',
        path = miloPath + 'assets/fresh.txt',
        code = fs.readFileSync(path, 'utf-8');
        
	if (!fs.existsSync(filename)) {
		fs.writeFileSync(filename, code);
	    console.log("Generated " + filename);
	}
	else {
		console.log("Error: File already exists");
	}
}