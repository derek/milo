module.exports = function (module) {
    var exec = require('child_process').exec,
        fs = require('fs'),
        config = require('milo/utils').getConfig(),
        process = exec(config.docsCommand, 'utf-8');

    process.stdout.on('data', function (data) {
    	exec(config.browserCommand + ' http://127.0.0.1:3000/' + module, 'utf-8');
        console.log('stdout: ' + data);
    });

    process.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });

    process.on('exit', function (code) {
        console.log('child process exited with code ' + code);
    });
};