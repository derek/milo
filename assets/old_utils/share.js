module.exports = function (path) {
    var Gister = require('gister'),
        gister = require('milo/utils').getGister(),
        fs = require('fs'),
        stat = fs.statSync(path, 'utf-8'),
        isDirectory = stat.isDirectory(),
        data = {},
        file;

    if (isDirectory) {
        fs.readdirSync(path).forEach(function(file){
            var filepath = path + "/" + file;
            if (!fs.statSync(filepath).isDirectory()) {
                data[file] = fs.readFileSync(filepath, 'utf-8');
            }
        });
    }
    else {
        data[path] = fs.readFileSync(path, 'utf-8');
    }
    
    gister.on('created', function(gist) {
        var file;
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