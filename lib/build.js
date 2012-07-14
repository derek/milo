module.exports = function (module, config) {

    // todo: Store the build time from previous builds and do a countdown
    console.log("Building.... (could take a bit)\n");
    var exec = require('child_process').exec,
        fs = require('fs'),
        path = config.yuiPath,
        src = path + 'src',
        modulePath = src + '/' +  module,
        buildSwitch =  (module === undefined) ? '' : '-f ' + path + '/src/' + module + '/build.xml',
        cmd = 'ant all -q -Dlint.skip=true ' + buildSwitch,
        process,
        files;


    files = fs.readdirSync(modulePath + '/js/');

    // files.forEach(function(file) {
    //     if (lint(modulePath + '/js/' + file).errors.length > 0) {
    //         console.log('Errors!');
    //         // return;
    //     }
    // });

    process = exec(cmd, 'utf-8');

    process.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
    });

    process.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });

    process.on('exit', function (code) {
      console.log('child process exited with code ' + code);
    });
}