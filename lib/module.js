module.exports = function (foo, config) {
    // todo: support gallery modules as well
    var fs = require('fs'),
        path = config.yuiPath,
        dir = path + '/build';

    fs.readdir(dir, function(err, list) {
        list.forEach(function (module) {
            console.log(module);
        });
    });
}