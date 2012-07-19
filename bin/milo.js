#!/usr/bin/env node
/*jslint nomen:true sloppy:true white:true node:true*/

var argv = require('optimist').argv,
    utilityName = argv._.shift() || false,
    args = argv._,
    setup = require('milo/lib/setup');

this.flags = argv;

switch(utilityName) {
	case false:
		setup.intro();
		break;

	case "install":
	case "update":
		setup[utilityName]();
		break;

	default:
		var utilities = require('milo/lib/utils').getUtilityMap(),
			utility;

		try {
		    utility = require('milo/' + utilities[utilityName]);
		}
		catch (e) {
		    console.log('Invalid command');
		    return;
		}

		this.library = utilities[utilityName].split('/')[1];
		this.config = require('milo/lib/utils').getConfig.apply(this);

		utility.apply(this, args)
		
		break;
}