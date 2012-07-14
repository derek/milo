module.exports = function () {
    var yql = require('yql');

    yql.exec("select * from twitter.user.timeline where (id = @id)", function(response) {

        if (response.error) {
            // console.log(require('util').inspect(error));
            console.log("Example #2... Error: " + response.error.description);
        } 
        else {
            var tweets = response.query.results.statuses.status;

            tweets.forEach(function (tweet) {
                console.log(tweet.created_at + ": " + tweet.text);
            });
        }

    }, {id:"yuilibrary"}, {ssl:true});
}