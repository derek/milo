module.exports = function () {
    var fs = require('fs'),
	    miloPath = process.env.NODE_PATH + 'milo/',
        file = miloPath + 'assets/milo.txt';

    fs.readFile(file, 'ascii', function(err,data){
      if(err) {
        console.error("Could not open file: %s", err);
        process.exit(1);
      }

      console.log(data);
    });
}