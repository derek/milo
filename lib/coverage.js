module.exports = function () {
    var child_process = require('child_process'),
        config = require('milo/utils').getConfig(),
        spawn = require('child_process').spawn,
        process = spawn('yui-coverage'),
        exec = require('child_process').exec;

    process.stdout.on('data', function (data) {
        if (data.toString().match('Starting server')) {
            exec(config.browserCommand + ' http://127.0.0.1:3000/');
        }
        console.log('stdout: ' + data);
    });

    process.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });

    process.on('exit', function (code) {
        console.log('child process exited with code ' + code);
    });
};