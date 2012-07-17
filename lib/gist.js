module.exports = function (path) {
    /*
    To get a token:
    curl https://api.github.com/authorizations -d '{"scopes": ["gist"],"note": "milo"}' --user yourusername:yourpassword
    */
    var Gister = require('gister'),
        config = require('milo/utils').getConfig(),
        fs = require('fs'),
        stat = fs.statSync(path, 'utf-8'),
        isDirectory = stat.isDirectory(),
        data = {},
        gister = new Gister({
            token: config.github.token
        }),
        files,
        i;

    if (isDirectory) {
        files = fs.readdirSync(path);
        for (i = 0; i < files.length; i += 1) {
            data[files[i]] = fs.readFileSync(path + "/" + files[i], 'utf-8');
        }
    }
    else {
        data[path] = fs.readFileSync(path, 'utf-8');
    }

    gister.on('created', function(response) {
        console.log(response.html_url);
    }).create(data);
};