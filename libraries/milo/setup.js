module.exports = function () {

	var fs = require('fs'),
		utils = require('../../utils'),
		config = this.config,
		miloPath = utils.getMiloPath(),
		milo = utils.getAsset(this.library, 'milo.txt'),
		exec = require('child_process').exec,
		configSource = miloPath + 'libraries/milo/assets/config.json.sample',
		configTarget = miloPath + 'config.json',
		noob = false;

	if (!fs.existsSync(configTarget)) {
		exec('mv ' + configSource + ' ' + configTarget);
		noob = true;
	}

	if (noob) {
		console.log(milo);

		console.log("A newbie? Welcome! \n\nBefore we get to the fun stuff, first thing I need you to do is update your config files.");
		console.log("You can find these in " + miloPath);
		console.log('');
		console.log('Be sure to follow the instructions about obtaining your Github token in config.private.json.');
		console.log('Once you do that, run `milo install` again so we can verify your config settings are correct.');
		console.log('');
	}
	else {
		if (config.github.token === "YOUR_TOKEN_GOES_HERE") {
			console.log("Ruh roh.  You haven't configured Github yet.");
			return;
		}

		console.log(milo);

		console.log("Nice job!  Next up is to download some milo libraries. \n\nYou already have one to get started, called 'update', so we'll use that to fetch them from my buddy the Octocat.");
		console.log('');
		console.log('Run `milo update`');
		console.log('');
	}

};