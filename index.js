const http = require("http"); // Use https if your app will not be behind a proxy.
const bodyParser = require("body-parser");
const express = require("express");
const path = require('path');

const app = express();

const frontendPath = __dirname + '/src/frontend';
app.use(express.static(frontendPath));
//app.use(express.static('public'))

app.listen(process.env.PORT || 8080, function () {
    console.log('Example app listening on port 8080!');
});

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,    Content-Type, Accept");
    next();
});

app.get('*', (req, res, next) => {
    res.sendFile(path.join('frontendPath','index.html'));
});