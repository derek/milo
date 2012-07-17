module.exports = function (dirname) {
    var fs = require('fs'),
	    exec = require('child_process').exec,
        config = require('milo/utils').getConfig(),
	    getAsset = require('milo/utils').getAsset,
	    get = require('milo/lib/get'),
	    gistID = config.gists.basic;
        
	get(gistID, dirname);
};