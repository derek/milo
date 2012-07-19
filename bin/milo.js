#!/usr/bin/env node
/*jslint nomen:true sloppy:true white:true node:true*/
var argv = require('optimist').argv,
	utils = require('../utils'),
	utilityName = argv._.shift() || 'setup',
	args = argv._,
	utilities = utils.getUtilityMap(),
	utility,
	offset;
	
this.flags = argv;

utility = require('../' + utilities[utilityName]);

this.library = utilities[utilityName].split('/')[(utilityName === 'milo' ? 0 : 1)];
this.config = utils.getConfig.apply(this);

utility.apply(this, args);