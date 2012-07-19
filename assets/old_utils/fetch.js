module.exports = function (id, dir) {
    var gister = require('milo/utils').getGister(),
        config = require('milo/utils').getConfig(),
        fs = require('fs'),
        miloPath = process.env.NODE_PATH + "milo/",
        exec = require('child_process').exec,
        dir = dir || id.toString(),
        newb = id === "utils";

    if (newb) {
        id = config.gists[id];
        dir = miloPath + "utilities/";
    }

    if (!fs.existsSync(dir)) {
        console.log('');
        console.log('Cloning...');

	    gister.on('gist', function(gist) {
			fs.mkdirSync(dir);
            exec('git clone ' + gist.git_pull_url + ' ' + dir).on('exit', function (code) {
                console.log('Done');
                console.log('');
                console.log(dir);
                fs.readdirSync(dir).forEach(function(file){
                    console.log('\t' + file);
                });

                if (newb) {
                    console.log("\nWe're good to go!  View the readme for information about each util.")
                }
                console.log('');
		    });
	    }).get(id);
    }
    else {
        console.log("Error: Directory already exists (" + dir + ")");
    }
};