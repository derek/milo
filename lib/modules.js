module.exports = function (foo) {
    // todo: support gallery modules as well
    var fs = require('fs'),
	    config = require('milo/utils').getConfig(),
        path = config.yuiPath,
        dir = path + '/build',
        modules = fs.readdirSync(dir);

    modules.forEach(function (module) {
        console.log(module);
    });
}