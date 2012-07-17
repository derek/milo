/*
To get a token:
curl https://api.github.com/authorizations -d '{"scopes": ["gist"],"note": "milo"}' --user yourusername:yourpassword
*/

module.exports = function (path) {
    var Gister = require('gister'),
        gister = require('milo/utils').getGister(),
        fs = require('fs'),
        stat = fs.statSync(path, 'utf-8'),
        isDirectory = stat.isDirectory(),
        data = {};

    if (isDirectory) {
        fs.readdirSync(path).forEach(function(file){
            data[file] = fs.readFileSync(path + "/" + file, 'utf-8');
        });
    }
    else {
        data[path] = fs.readFileSync(path, 'utf-8');
    }

    gister.on('created', function(gist) {
        console.log('');
        console.log("URL: " + gist.html_url);
        console.log("\nRaw URLs")
        for(file in gist.files) {
            console.log("\t" + file + ": " + gist.files[file].raw_url);
        }
        // console.log("Dabblet.com : http://dabblet.com/gist/" + gist.id);
        console.log('');
    }).create(data);
};