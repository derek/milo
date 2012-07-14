#!/usr/bin/env node
/*jslint nomen:true sloppy:true white:true node:true*/

var yql = require('yql'),
    fs = require('fs'),
    configPublic = require('milo/config.public'),
    configPrivate = require('milo/config.private'),
    argv = require('optimist').argv,
    config = {},
    i;

for (i in configPublic) {
    if (configPublic.hasOwnProperty(i)) {
        config[i] = configPublic[i];   
    }
}

for (i in configPrivate) {
    if (configPrivate.hasOwnProperty(i)) {
        config[i] = configPrivate[i];   
    }
}

(function () {
    var plugin = argv._.shift() || 'help',
        args = argv._;
    
    require('milo/lib/' + plugin).apply(this, args);
})();