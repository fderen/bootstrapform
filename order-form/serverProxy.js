const express = require('express');
const cors = require('cors');
const request = require('request');

function callAPI(url) {
  return new Promise((resolve, reject) => {
    request(url, { json: true }, (err, res, body) => {
      if (err) reject(err);
      resolve(body);
    });
  });
}

const app = express();

app.use(cors());
app.get('/symbols_details', (req, res) => {
  callAPI('https://api.bitfinex.com/v1/symbols_details')
    .then(response => res.json(response))
    .catch(error => res.send(error));
});
app.listen(1337, () => {
  console.log('Server proxy running on 1337');
});
