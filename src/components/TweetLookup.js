import React, { Component } from 'react'
import { Button, Col, Divider, Form, Input, Row } from 'antd'

// export this React component from this file so it can be used in index.js
export function TweetLookup() {
    const [tweetInfo, setTweetInfo] = React.useState('');
    const onFinish = (tweetUrl) => {
        const tweetId = tweetUrl.tweetUrl.toString().split('/').pop();  // get the last part of the url
        console.log(`Client: Tweet ID is ${tweetId}`);
        fetch(`/api/tweet/${tweetId}`) // call the function on our server that gets the tweet details
          .then(response => response.json())
          .then((data) => { 
            console.log(data[0]); 
            setTweetInfo(data[0].text); })
    };


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
        <Row justify="center">
            <Col span={8}>
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
                        <Input placeholder="https://twitter.com/elonmusk/status/1555799183067684866" style={{width: 'calc(100% - 200px)',}} />                        
                    </Form.Item>
                    <p>Examples: 
                        https://twitter.com/WillManidis/status/1556412859839614989
                        https://twitter.com/zillowgonewild/status/1557394243894886402

                    
                    </p>
                    <Button type="primary" htmlType="submit">
                        Get Tweet
                    </Button>
                    {/* Check back here to reformat https://github.com/ant-design/ant-design/issues/5790 */}
                </Form>
            </Col>
        </Row>
        <Divider />
        <Row justify="center">
            <Col span={8}>
                <p id='tweetRender'>{tweetInfo}</p>
            </Col>
        </Row>
        </>
    )
}

export default TweetLookup

