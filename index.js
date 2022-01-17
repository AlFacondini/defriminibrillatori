// index.js
// Starts express on the API entry point and loads the routers.
//
// Alberto Facondini

const PORT = 8081;

var express = require("express");
var bodyParser = require('body-parser');
var apiRouter = require("./api/api-router");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/defriminibrillatori", apiRouter());

var server = app.listen(PORT, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server up, listening at http://%s:%s", host, port)
});