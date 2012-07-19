var fs = require('fs'),
	miloPath = process.env.NODE_PATH + "milo/",
	milo = require('milo/utils').getAsset('milo.txt'),
    exec = require('child_process').exec;

function intro () {
	var privateConfig = miloPath + 'config.private.json';

	console.log(milo);

	console.log("Alright, first thing I need you to do is update your config files.");
	console.log("You can find these in " + miloPath);
	console.log('');
	console.log('Go do that, and run `milo install` again so we can verify your yuiPath is correct');
	console.log('');

	if (!fs.existsSync(privateConfig)) {
		exec('cp ' + privateConfig + '.sample ' + privateConfig);
	}
}

function install () {
    console.log(milo);

	console.log("Nice job!  Next up is to download some milo utilities. \n\nYou already have one to get started, called 'update', so we'll use that to fetch them from my buddy the Octocat.");
	console.log('');
	console.log('Run `milo update`');
	console.log('');
}

function update () {
	var config = require('milo/utils').getConfig(),
	    gister = require('milo/utils').getGister(),
		dir = miloPath + 'utilities/',
		id = config.gists.utilities;

    if (!fs.existsSync(dir)) {
        console.log('');

        console.log('Fetching info...');
	    gister.on('gist', function(gist) {
	        console.log('Cloning...');
			fs.mkdirSync(dir);
            exec('git clone ' + gist.git_pull_url + ' ' + dir).on('exit', function (code) {
                console.log('Done');
                console.log('');
                console.log(dir);
                fs.readdirSync(dir).forEach(function(file){
                    console.log('\t' + file);
                });

                console.log('');
		    });
	    }).get(id);
    }
    else {
        console.log("Error: Directory already exists (" + dir + ")");
    }
}

module.exports = {
	intro : intro,
	install : install,
	update : update
}