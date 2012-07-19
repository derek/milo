#!/usr/bin/env node
/*jslint nomen:true sloppy:true white:true node:true*/

var argv = require('optimist').argv,
    utility = argv._.shift() || false,
    args = argv._,
    setup = require('milo/setup');

this.flags = argv;

switch(utility) {
	case false:
		setup.intro();
		break;

	case "install":
	case "update":
		setup[utility]();
		break;

	default:
		try {
		    var util = require('milo/utilities/' + utility);
		}
		catch (e) {
		    console.log('Invalid command');
		}
		util.apply(this, args)
		break;
}