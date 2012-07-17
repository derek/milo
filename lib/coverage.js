module.exports = function () {
    var child_process = require('child_process'),
        spawn = require('child_process').spawn,
        process = spawn('yui-coverage'),
        exec = require('child_process').exec;

    process.stdout.on('data', function (data) {
        if (data.toString().match('Starting server')) {
            exec('open http://127.0.0.1:3000/');
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