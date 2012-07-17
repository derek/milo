// todo: support gallery modules as well

module.exports = function (foo) {
    var fs = require('fs'),
	    config = require('milo/utils').getConfig(),
        modules = fs.readdirSync(config.yuiPath + '/build');

    modules.forEach(function (module) {
        console.log(module);
    });
};