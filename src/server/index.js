const express = require("express");
const fetchTweet = require('./fetchTweet')
const PORT = process.env.PORT || 3001;
const app = express();

app.get("/", (req, res) => {
  console.log("Hello World!");
});

app.get("/api/tweet/:id", (req, res) => {
  console.log(`Id is ${req.params.id}`);
  fetchTweet(req.params.id)
    .then((data) => {
      const result = data.data;
      console.log(result);
      res.json(result);})
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});