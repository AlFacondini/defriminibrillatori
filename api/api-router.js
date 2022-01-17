// api-router.js
// Defines the routing paths for the express application and the respective callback functions.
//
// Alberto Facondini

var express = require("express");
var middleware = require("./api-middleware");

module.exports = function(){
    var router = express.Router();

    // /closest router
    // GET: validates request and answers with the closest or the n closest defibs 
    router.route("/closest")
        .get(middleware.validate('get'),
            middleware.get);

    // /defibrillator router
    // POST: validates request and adds a new defib to the database
    // DELETE: validates request and deletes an existing defib from the database
    router.route("/defibrillator")
        .post(middleware.validate('post'),
            middleware.post)
        .delete(middleware.validate('delete'),
            middleware.delete);

    return router;
}