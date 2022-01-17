// api-router.js
// Defines the routing paths for the express application and the respective callback functions.
//
// Alberto Facondini

var express = require("express");
var middleware = require("./api-middleware");

module.exports = function(){
    var router = express.Router();

    // /closest router
    // GET: answers with the closest or the n closest defibs 
    router.route("/closest")
        .get(middleware.get);

    // /defibrillator router
    // POST: 
    // DELETE:   
    router.route("/defibrillator")
        .post(function(req, res){
            console.log("Connection to /defibrillator with POST from %s", req.ip);
            res.send("Okie-dokie.");
        })
        .delete(function(req, res){
            console.log("Connection to /defibrillator with DELETE from %s", req.ip);
            res.send("Okie-dokie.");
        });

    return router;
}