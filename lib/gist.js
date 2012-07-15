module.exports = function (file) {
    /*
    To get a token:
    curl https://api.github.com/authorizations -d '{"scopes": ["gist"],"note": "admin script"}' --user username:password
    */
    var Gister = require('gister'),
        fs = require('fs'),
        path = require('path'),
        config = require('milo/utils').getConfig(),
        body = fs.readFileSync(file, 'utf-8'),
        filename = path.basename(file),
        data = {},
        gister = new Gister({
            token: config.github.token
        });

    gister.on('created', function(response) {
        console.log('URL: ' + response.files[filename].raw_url);
    });

    data[filename] = body;

    gister.create(data);
}