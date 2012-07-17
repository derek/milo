module.exports = function (path) {
    /*
    To get a token:
    curl https://api.github.com/authorizations -d '{"scopes": ["gist"],"note": "admin script"}' --user username:password
    */
    var Gister = require('gister'),
        fs = require('fs'),
        config = require('milo/utils').getConfig(),
        stat = fs.statSync(path, 'utf-8'),
        isDirectory = stat.isDirectory(),
        data = {},
        gister = new Gister({
            token: config.github.token
        }),
        files;

    if (isDirectory) {
        files = fs.readdirSync(path);
        for (var i = 0; i < files.length; i++) {
            data[files[i]] = fs.readFileSync(path + "/" + files[i], 'utf-8');
        }
    }
    else {
        data[path] = fs.readFileSync(path, 'utf-8');
    }

    gister.on('created', function(response) {
        console.log(response.html_url);
    }).create(data);
}