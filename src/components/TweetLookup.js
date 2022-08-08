import React, { Component } from 'react'
import { Button, Col, Divider, Form, Input, Row } from 'antd'
let result;
export function TweetLookup() {
    const onFinish = (tweetUrl) => {
        const tweetId = tweetUrl.tweetUrl.toString().split('/').pop();
        console.log(`Client: Tweet ID is ${tweetId}`);
        fetch(`/tweet/${tweetId}`)
          .then(response => { const r = response.json(); return r;  })
          .then((data) => { 
            console.log(data[0]); 
            document.getElementById('tweetRender').innerHTML = data[0].text;
            return result = data[0].text; })
    };

    const [list, setList] = React.useState([]);

  React.useEffect(() => {
    let mounted = true;
    getList()
      .then(items => {
        if(mounted) {
          setList(items)
        }
      })
    return () => mounted = false;
  }, [])
    

    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };
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
                    <p>Example: https://twitter.com/WillManidis/status/1556412859839614989</p>
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
                <p id='tweetRender'>{result}</p>
            </Col>
        </Row>
        </>
    )
}

export default TweetLookup

