module.exports = function (id, dir) {
    var gister = require('milo/utils').getGister(),
        fs = require('fs'),
        exec = require('child_process').exec,
        dir = dir || id.toString();

    if (!fs.existsSync(dir)) {
        console.log('');
        console.log('Cloning...');

	    gister.on('gist', function(gist) {
			fs.mkdirSync(dir);
            exec('git clone ' + gist.git_push_url + ' ' + dir).on('exit', function (code) {
                console.log('Done');
                console.log('');
                console.log('./' + dir + '/');
                fs.readdirSync(dir).forEach(function(file){
                    console.log('\t' + file);
                });
		    });
	    }).get(id);
    }
    else {
        console.log("Error: Directory already exists");
    }
};