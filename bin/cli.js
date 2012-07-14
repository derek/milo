#!/usr/bin/env node
/*jslint sloppy:true*/

var yql  = require('yql'),
    fs = require('fs'),
    config = require('../config')
    argv = require('optimist').argv,
    log = console.log;

function main() {
    var arg = argv._[0];
    switch(arg) {
        case "tweets":
            getTweets();
            break;

        case "modules":
            listModules();
            break;
        
        case "coverage":
            coverage();                
            break;

        case "gist":
            gist(argv._[1]);
            break;
        
        default:
            print_info();
            break;
    }
}

main();


function print_info () {
    var fs = require('fs'),
        file = process.env.NODE_PATH + 'milo/assets/milo.txt'

    fs.readFile(file, 'ascii', function(err,data){
      if(err) {
        console.error("Could not open file: %s", err);
        process.exit(1);
      }

      console.log(data);
    });

}

function listModules () {
    var path = config.yuiPath,
        dir = path + '/build'

    fs.readdir(dir, function(err, list) {
        if (err) throw err;
        list.forEach(function (module) {
            log(module);
        })
    });
}

function coverage () {
    var child_process = require('child_process'),
        spawn = require('child_process').spawn,
        coverage = spawn('yui-coverage');
        
    coverage.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
    });

    coverage.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });

    coverage.on('exit', function (code) {
      console.log('child process exited with code ' + code);
    });
}

function getTweets () {

    new yql.exec("select * from twitter.user.timeline where (id = @id)", function(response) {

        if (response.error) {
            console.log(require('util').inspect(error));
            console.log("Example #2... Error: " + response.error.description);
        } 
        else {
            var tweets = response.query.results.statuses.status;

            tweets.forEach(function (tweet) {
                console.log(tweet.created_at + ": " + tweet.text);
            })
        }

    }, {id:"yuilibrary"}, {ssl:true});
}

function gist (file) {
    /*
    To get a token:
    curl https://api.github.com/authorizations -d '{"scopes": ["gist"],"note": "admin script"}' --user username:password
    */
    var Gister = require('gister'),
        path = require('path'),
        body = fs.readFileSync(file, 'utf-8'),
        filename = path.basename(file),
        data = {},
        gist = new Gister({
            token: config.github.token
        });

    gist.on('created', function(response) {
        log('URL: ' + response.files[filename].raw_url);
    })

    data[filename] = body;

    gist.create(data);
}
