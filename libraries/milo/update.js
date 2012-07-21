var miloPath = require('../../utils').getMiloPath();

module.exports = function () {

	var fs = require('fs'),
		exec = require('child_process').exec,
		libraries = require(miloPath + 'config').libraries,
		config, id, dir, git_url

	for(id in libraries) {
		config = require('../../utils').getConfig.apply({library:id});
		dir = miloPath + 'libraries/' + id + '/';
		git_url = libraries[id].git_url;
		
		if (git_url) {
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