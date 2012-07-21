module.exports = function () {
	console.log(this.config);
	var fs = require('fs'),
	exec = require('child_process').exec,
	miloPath = this.miloPath,
	libraries = this.config.libraries,
	libraries = require(miloPath + 'config').libraries,
	miloPath = this.miloPath,
	config, id, dir, git_url

	for(id in libraries) {
		dir = miloPath + 'libraries/' + id + '/';
		url = libraries[id].url;

		if (url) {
			if (fs.existsSync(dir)) {
				console.log('Updating ' + id + ' ...');
				exec('git pull ', {cwd: dir});
			}
			else {
				console.log('git clone ' + git_url + ' ' + id);
				console.log('Cloning ' + id + ' ...');
				exec('git clone ' + git_url + ' ' + id, {cwd: miloPath + 'libraries/'});
			}
		}
	}
};