module.exports = function () {
	var fs = require('fs'),
		exec = require('child_process').exec,
		libraries = require('../../config').libraries,
		miloPath = this.miloPath,
		id, dir, url;

	for(id in libraries) {
		dir = miloPath + 'libraries/' + id + '/';
		url = libraries[id].url;

		if (url) {
			if (fs.existsSync(dir)) {
				console.log('Updating ' + id + ' ...');
				exec('git pull ', {cwd: dir});
			}
			else {
				console.log('Cloning ' + id + ' ...');

				exec('git clone ' + url + ' ' + id, {cwd: miloPath + 'libraries/'}, function (i) {
					return function () {
						// TODO: Figure out a better way to determine the bin path, cause this will certainly break
						console.log('Now run: sudo ln -s `which milo` ' + process.argv[1].replace('milo', '') + i);
					}
				}(id));
			}
		}
	}
};