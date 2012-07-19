var yql = require('yql');

function getTweets (user) {
    var tweets;

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

    }, {id:user});
}

function getVideos () {
    var videos;

    yql.exec("select * from youtube.user.videos where id='yuilibrary'", function(results) {
        videos = results.query.results.video;

        videos.reverse();
        videos.forEach(function(video){
            console.log(video.title.toUpperCase());
            // console.log(video.content);
            console.log(video.url + '\n\n--');
        });
    });
}

function getHeadlines () {
    var posts;

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

        case 'videos':
            getVideos();
            break;

        default: 
            console.log('milo media tweets');
            console.log('milo media headlines');
            console.log('milo media relay');
            console.log('milo media videos');
            break;
    }
};