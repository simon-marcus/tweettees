module.exports = function fetchTweet(tweetId) {
const url = `https://api.twitter.com/2/tweets?ids=${tweetId}&tweet.fields=attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,public_metrics,referenced_tweets,reply_settings,source,text,withheld&expansions=attachments.media_keys,author_id,entities.mentions.username,in_reply_to_user_id,referenced_tweets.id,referenced_tweets.id.author_id&media.fields=alt_text,media_key,preview_image_url,type,url&user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld`;
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
    .catch(error => {console.log(error)});
};

//attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,non_public_metrics,organic_metrics,possibly_sensitive,promoted_metrics,public_metrics,referenced_tweets,reply_settings,source,text,withheld