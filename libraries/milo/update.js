var miloPath = process.env.NODE_PATH + "milo/";

module.exports = function () {

	var fs = require('fs'),
		exec = require('child_process').exec,
		libraries = require(miloPath + 'config.public').libraries,
		config;

	for(id in libraries) {
		config = require('milo/utils').getConfig.apply({library:id});

		var dir = miloPath + 'libraries/' + id + '/',
			git_url;

		if (libraries[id].source) {
			if (config.push) {
				git_url = 'git@gist.github.com:/' + libraries[id].source + '.git';
			}
			else {
				git_url = 'git://gist.github.com/' + libraries[id].source + '.git';
			}

			if (fs.existsSync(dir)) {
				console.log('\nI would pull ' + id + ', but that isn\'t supported yet.  Manually run `git pull` @ ' + dir + '\n');
			}
			else {
				console.log('\nCloning ' + id + ' ...');
				exec('git clone ' + git_url + ' ' + id + '; mkdir ' + dir + 'assets; mv ' + id + ' ' + dir).on('exit', function (code) {

					console.log('Done\n');

					fs.readdirSync(dir).forEach(function(file){
						console.log('\t' + file);
					});

					console.log('');
				});
			}
		}
	}
}