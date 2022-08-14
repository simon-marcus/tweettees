
import React from "react";
import { TweetLookup } from "./components/TweetLookup";
import 'antd/dist/antd.css';
import './index.css';
import { Card } from 'antd';



function App() {

  return (
    <Card>
      <TweetLookup />
      {/* <img src='./assets/t-shirt.png' alt="t-shirt" className='t-shirt' /> */}
    </Card>
  );
}

export default App;