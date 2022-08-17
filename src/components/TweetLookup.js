import React, { Component } from 'react'
import { Button, Card, Col, Divider, Form, Input, Row } from 'antd';
import tshirt from '../assets/t-shirt.svg';


// export this React component from this file so it can be used in index.js
export function TweetLookup() {
    const [tweetInfo, setTweetInfo] = React.useState('');
    // const [quoteTweetInfo, setQuoteTweetInfo] = React.useState('');
    const onFinish = (tweetUrl) => {

        function getDate(date) {
            date = new Date(date);
            return `${date.toLocaleTimeString()} · ${date.toDateString()}`;
        }

        function styleTweetText (text) {
           // style the words in text in blue if the word starts with '@' or '#'
              return text.split(' ').map(word => {
                    if (word.startsWith('@') || word.startsWith('#')) { 
                        return <span key={word} style={{color: 'blue'}}>{word}</span>
                    } else {
                        return word;
                    }
                }).join(' ');
        }


        const tweetId = tweetUrl.tweetUrl.toString().split('/').pop();  // get the last part of the url
        console.log(`Client: Tweet ID is ${tweetId}`);
        fetch(`/api/tweet/${tweetId}`) // call the function on our server that gets the tweet details
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                data.errors ? setTweetInfo({ tweetError: "Tweet not found: please check the URL and try again." }) :
                    data.data && setTweetInfo({
                        tweetAvatar: data.includes.users[0].profile_image_url || null,
                        tweetAuthorName: data.includes.users[0].name || null,
                        tweetUserName: data.includes.users[0].username || null,
                        tweetText: styleTweetText(data.data[0].text) || null,
                        tweetDate: getDate(data.data[0].created_at) || null,
                        tweetSource: data.data[0].source || null,
                        tweetLikes: data.data[0].public_metrics.like_count || 0,
                        tweetRetweets: data.data[0].public_metrics.retweet_count || 0,
                        tweetReplies: data.data[0].public_metrics.reply_count || 0,
                        tweetQuoteTweets: data.data[0].public_metrics.quote_count || 0,
                        tweetImage: data.includes.media ? data.includes.media[0].url : '',
                        isQuoteTweet: data.includes.tweets ? true : false,
                        quoteTweetAvatar: data.includes.tweets ? data.includes.users[1].profile_image_url : '',
                        quoteTweetAuthorName: data.includes.tweets ? data.includes.users[1].name : null,
                        quoteTweetUserName: data.includes.tweets ? data.includes.users[1].username : null,
                        quoteTweetText: data.includes.tweets ? data.includes.tweets[0].text : '',
                        quoteTweetDate: data.includes.tweets ? data.includes.tweets[0].created_at : null,
                        quoteTweetImage: data.includes?.tweets && data.includes.tweets[0].attachments ? data.includes.tweets[0].attachments.media_keys[0] : '',
                    })
            });
    }




    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Row justify="center">
                <Col sm={20} md={16} lg={16} xl={12}>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Enter Tweet URL"
                            name="tweetUrl"
                            rules={[{
                                required: true,
                                message: 'Please enter a Tweet URL!',
                            }, {
                                type: 'url',
                                message: 'Please enter a valid URL!',
                            }, {
                                pattern: /^https:\/\/twitter.com\/.*\/status\/.*$/,
                                message: 'Please paste the tweet URL from Twitter!',
                            }
                            ]}
                        >
                            <Input placeholder="https://twitter.com/elonmusk/status/1555799183067684866" />
                        </Form.Item>
                        {/* <p>Examples:
                            https://twitter.com/allegedlymiri/status/1349185276543971330
                            https://twitter.com/franchisewolf/status/1558797849269129216
                            https://twitter.com/WillManidis/status/1556412859839614989
                            https://twitter.com/zillowgonewild/status/1557394243894886402
                        </p> */}
                        <Button type="primary" htmlType="submit">
                            Get Tweet
                        </Button>
                        {/* Check back here to reformat https://github.com/ant-design/ant-design/issues/5790 */}
                    </Form>
                </Col>
            </Row>
            <Divider />
        { tweetInfo.tweetText && 
        <div style={{minWidth:'600px', height:'100vh', backgroundImage: `url(${tshirt})`, backgroundPosition: 'top center', backgroundSize: '1000px', backgroundRepeat: 'no-repeat'}}> 
            <Row justify="center" align="middle" style={{minHeight:'800px'}} >
                <Col span={8} height="100vh" style={{maxWidth:'500px',minWidth:'500px'}}>
                    <Card style={{backgroundColor: '#ffffff7a', borderRadius: '16px', border: '2px solid #03a9f4'}}>
                        {tweetInfo.tweetError ? <p>{tweetInfo.tweetError}</p> : null}
                        <Row gutter={[8, 16]}>
                            <Col flex="50px">
                                <img alt={tweetInfo.tweetAuthorName} src={tweetInfo.tweetAvatar} className="tweetAvatar" />

                            </Col>
                            <Col flex="auto">
                                <li className="tweetAuthorName">{tweetInfo.tweetAuthorName}</li>
                                {tweetInfo.tweetUserName && <li className="tweetUserName">{"@" + tweetInfo.tweetUserName}</li>}
                            </Col>
                            <li className="tweetText">{tweetInfo.tweetText}</li>
                            {tweetInfo.tweetImage && <img alt={"tweet"} src={tweetInfo.tweetImage} className="tweetImage" />}
                            <li className="tweetDate">{tweetInfo.tweetDate ? tweetInfo.tweetDate + ' · ' + tweetInfo.tweetSource : ''}</li>

                            {/* 8:49 AM · Aug 14, 2022·Typefully */}
                            {/* <li>{tweetInfo.data[0].source}</li>
                        <li>{tweetInfo.data[0].public_metrics}</li>
                        <li>{tweetInfo.data[0].author_id}</li>  */}
                            {tweetInfo.isQuoteTweet &&
                                <Card size="small">                                    
                                    <Row gutter={[8, 16]}>
                                        <Col flex="20px">
                                            <img alt={tweetInfo.quoteTweetAuthorName} src={tweetInfo.quoteTweetAvatar} className="quoteTweetAvatar" />
                                        </Col>
                                        <Col flex="auto">
                                            <li className="tweetAuthorName">{tweetInfo.quoteTweetAuthorName}  <span className="tweetUserName">{"@" + tweetInfo.quoteTweetUserName} · {tweetInfo.quoteTweetDate}</span></li>                                            
                                        </Col>
                                        <li className="quoteTweetText">{tweetInfo.quoteTweetText}</li>
                                        {tweetInfo.quoteTweetImage && <img alt={"tweet"} src={tweetInfo.quoteTweetImage} className="quoteTweetImage" />}
                                    </Row>
                                </Card>}
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>}
        </>
    )
}

export default TweetLookup

