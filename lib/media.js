function getTweets (user) {
    var yql = require('yql'),
        tweets;

    yql.exec("select * from twitter.user.timeline where (id = @id)", function(response) {

        if (response.error) {
            // console.log(require('util').inspect(error));
            console.log("Error: " + response.error.description);
        } 
        else {
            tweets = response.query.results.statuses.status;
            tweets.reverse();
            tweets.forEach(function (tweet) {
                console.log(tweet.created_at + ": " + tweet.text);
            });
        }

    }, {id:user}, {ssl:true});
}

function getHeadlines () {
    var yql = require('yql'),
        posts;

    yql.exec("select * from rss where url = 'http://feeds.yuiblog.com/YahooUserInterfaceBlog'", function(results) {
        posts = results.query.results.item;
        posts.reverse();
        posts.forEach(function(post){
            console.log(post.title);
            console.log(post.pubDate);
            console.log(post.description + '\n\n');
        });
    });
}

module.exports = function (type) {
    switch(type) {
        case 'tweets': 
            getTweets('yuilibrary');
            break;

        case 'relay': 
            getTweets('yuirelay');
            break;

        case 'headlines':
            getHeadlines();
            break;

        default: 
            console.log('milo media tweets');
            console.log('milo media headlines');
            console.log('milo media relay');
            break;
    }
};