module.exports = function () {
    var child_process = require('child_process'),
        spawn = require('child_process').spawn,
        process = spawn('yui-coverage');
        
    process.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });

    process.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });

    process.on('exit', function (code) {
        console.log('child process exited with code ' + code);
    });
};