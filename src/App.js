import React from "react";
import { TweetLookup } from "./components/TweetLookup";
import 'antd/dist/antd.css';
import './index.css';
import { Card } from 'antd';



function App() {

  return (
    <Card>      
      <TweetLookup />      
    </Card>
  );
}

export default App;