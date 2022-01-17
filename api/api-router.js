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
    // POST: adds a new defib to the database
    // DELETE: deletes an existing defib from the database
    router.route("/defibrillator")
        .post(middleware.post)
        .delete(middleware.delete);

    return router;
}