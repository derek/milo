module.exports = function () {
	var exec = require('child_process').exec;

	exec('npm install', {cwd: this.libPath});
};