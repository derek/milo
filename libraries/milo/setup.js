var fs = require('fs'),
	miloPath = process.env.NODE_PATH + "milo/",
	milo = require('milo/lib/utils').getAsset('milo.txt'),
    exec = require('child_process').exec;

function intro () {
	var privateConfig = miloPath + 'config.private.json';

	console.log(milo);

	console.log("A newbie? Welcome! \n\nBefore we get to the fun stuff, first thing I need you to do is update your config files.");
	console.log("You can find these in " + miloPath);
	console.log('');
	console.log('Be sure to follow the instructions about obtaining your Github token in config.private.json.')
	console.log('Once you do that, run `milo install` again so we can verify your config settings are correct.');
	console.log('');

	if (!fs.existsSync(privateConfig)) {
		exec('cp ' + privateConfig + '.sample ' + privateConfig);
	}

	if (!fs.existsSync(miloPath + '/utilities')) {
		exec('mkdir ' + miloPath + '/utilities');
	}
}

function install () {

	try {
		require('milo/config.private');
	}
	catch (e) {
		console.log('Ruh roh.  Check config.private.json, looks like there is a problem');
		return;
	}

    console.log(milo);

	console.log("Nice job!  Next up is to download some milo utilities. \n\nYou already have one to get started, called 'update', so we'll use that to fetch them from my buddy the Octocat.");
	console.log('');
	console.log('Run `milo update`');
	console.log('');
}

function update () {
	var config = require('milo/lib/utils').getConfig(),
		gister = require('milo/lib/utils').getGister(),
		utilityPath = miloPath + 'utilities/',
		libraries = config.libraries;

	for(id in libraries) {
    	var dir = utilityPath + libraries[id].title + '/',
	    	pull_url = 'git://gist.github.com/' + id + '.git';

	    if (fs.existsSync(dir)) {
	    	console.log('I would pull ' + id + ', but it isn\'t supported yet.  Manually do it @ ' + dir);
	    }
	    else {
	        console.log('Cloning ' + id + '...');
			exec('git clone ' + pull_url + ' ' + dir).on('exit', function (code) {
	            console.log('Done');
	            console.log('');
	            console.log(dir);

	            fs.readdirSync(dir).forEach(function(file){
	                console.log('\t' + file);
	            });

	            console.log('');
		    });
	    }
	}
}

module.exports = {
	intro : intro,
	install : install,
	update : update
}