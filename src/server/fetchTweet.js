module.exports = function fetchTweet(tweetId) {
const url = `https://api.twitter.com/2/tweets?ids=${tweetId}&tweet.fields=attachments,author_id,created_at,public_metrics,source&expansions=attachments.media_keys,referenced_tweets.id,author_id`;
const token = `AAAAAAAAAAAAAAAAAAAAADu6fQEAAAAAaZTBNdrsddoi2xqNFHyhD40vQvM%3DDt5WhkdIKKdv8X6ehJDS9ZCVU4cZORgBkAi3EekhUCoCcrHRRL`
return fetch(url, {
        method: 'GET',
        headers: {
            "User-Agent": "v2TweetLookupJS",
            "authorization": `Bearer ${token}`
        }
    })
    .then(response => {        
        return response.json();
    })
    .then((data => {
        return data;
    } ))
    .catch(error => console.log(error));
};