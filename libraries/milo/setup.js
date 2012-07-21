module.exports = function () {

	var fs = require('fs'),
		utils = require('../../utils'),
		config = this.config,
		miloPath = this.miloPath,
		exec = require('child_process').exec,
		configSource = miloPath + 'config.json.sample',
		configTarget = miloPath + 'config.json',
		noob = false;

	if (!fs.existsSync(configTarget)) {
		exec('cp ' + configSource + ' ' + configTarget);
		noob = true;
	}

	if (noob) {
		console.log('');
		console.log("A newbie? Welcome! \n\nBefore we get to the fun stuff, first thing I need you to do is update your config.json file @ " + miloPath + "config.json");
		console.log("One thing you'll need is a Github API token, which can be obtained by executing");
		console.log("   curl https://api.github.com/authorizations -d '{\"scopes\": [\"gist\"],\"note\": \"Milo\"}' --user yourUsername:yourPassword");
		console.log('');
		console.log('Be sure to follow the instructions about obtaining your Github token in config.json.');
		console.log('Once you do that, run `milo install` again so we can verify your config settings are correct.');
		console.log('');
	}
	else {
		if (config.github.token === "YOUR_TOKEN_GOES_HERE") {
			console.log("Ruh roh.  You haven't configured Github yet.  Execute this:");
			console.log("   curl https://api.github.com/authorizations -d '{\"scopes\": [\"gist\"],\"note\": \"Milo\"}' --user yourUsername:yourPassword");
			console.log("Then go stick it in " + miloPath + "config.json and run this command again");
			return;
		}

		console.log("Nice job!  At this point you only have a single library with core functionality, but I want to learn some new tricks, so lets pull in some other libraries");
		console.log('');
		console.log("Run `milo update` and I'll fetch some from my buddy the Octocat.");
		console.log('');
	}

};