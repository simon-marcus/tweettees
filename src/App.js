
import React from "react";
import { TweetLookup } from "./components/TweetLookup";
import 'antd/dist/antd.css';
import './index.css';
import { Card } from 'antd';



function App() {
  const [data, setData] = React.useState(null);
  
  // React.useEffect(() => {
  //   fetch(`/tweet/${tweetId}`)
  //     .then(response => { const r = response.json(); return r; })
  //     .then((data) => { setData(data.source) })
  // }, []);

  return (
    <Card>      
    <TweetLookup />    
    {/* <TweetRender /> */}
    </Card>
  );
}

export default App;