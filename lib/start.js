module.exports = function (template, dir) {
    var fs = require('fs'),
	    exec = require('child_process').exec,
        config = require('milo/utils').getConfig(),
	    getAsset = require('milo/utils').getAsset,
	    get = require('milo/lib/get'),
	    gistID, dir, template;

	if (dir === undefined) {
	    dir = template;
	    template = 'basic';
	}

	gistID = config.gists[template]
        
	get(gistID, dir);
};