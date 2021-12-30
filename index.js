//Load HTTP module
const http = require("http");
const hostname = '127.0.0.1';
const port = 3000;

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
    console.log(__dirname)
  res.sendFile(path.join(__dirname, '/game.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);