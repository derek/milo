#!/usr/bin/env node
/*jslint nomen:true sloppy:true white:true node:true*/

var argv = require('optimist').argv,
    plugin = argv._.shift() || 'help',
    args = argv._,
    files = require('fs').readdirSync(process.env.NODE_PATH + 'milo/lib/');

this.flags = argv;

if (files.indexOf(plugin + '.js') >= 0) {
    require('milo/lib/' + plugin).apply(this, args);
}
else {
    console.log('Invalid command');
}