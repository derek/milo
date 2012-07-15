#!/usr/bin/env node
/*jslint nomen:true sloppy:true white:true node:true*/

var argv = require('optimist').argv,
    plugin = argv._.shift() || 'help',
    args = argv._,
    commands =  ['build',
                 'coverage',
                 'gist',
                 'help',
                 'lint',
                 'module',
                 'media'];

if (commands.indexOf(plugin) >= 0) {
    require('milo/lib/' + plugin).apply(this, args);
}
else {
    console.log('Invalid command');
}