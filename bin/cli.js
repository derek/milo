#!/usr/bin/env node
/*jslint sloppy:true*/

var yql  = require('yql');
//     path = require('path'),
//     Burt = require('../lib/burt'),
//     meta = require('../package.json');


function prompt(callback) {
    var stdin = process.stdin, 
        stdout = process.stdout;

    stdin.resume();
    stdout.write("$ ");

    stdin.once('data', function(data) {
        data = data.toString().trim();
        react(data);
    });
}

function main() {
    prompt(react);
}

function react (val) {
    switch(val) {
        case "a":
            getTweets();
            break;

        default:
            console.log('bad!');
            break;
    }

    prompt(react);
}

main();





function getTweets () {

    new yql.exec("select * from twitter.user.timeline where (id = @id)", function(response) {

        if (response.error) {
            console.log(require('util').inspect(error));
            console.log("Example #2... Error: " + response.error.description);
        } 
        else {
            var tweets = response.query.results;
            console.dir(response.query.results);
            // console.log(tweets[0].text);
            // console.log("Example #2... Latest tweet from @" + tweets[0].user.screen_name + ": " + tweets[0].text);
        }

    }, {id:"yuilibrary"}, {ssl:true});
}


