// api-middleware.js
// Defines the middleware functions for the express application
//
// Alberto Facondini

var exports = module.exports = {}

const {FIREBASE_KEY, FIREBASE_URL} = require('../config/config');

var admin = require('firebase-admin');
var path = require('path');
var geolib = require('geolib');
var pathToKey = path.resolve('./config', FIREBASE_KEY);
var serviceAccount = require(pathToKey);

// Login into firebase as the admin
admin.initializeApp({
    credential : admin.credential.cert(serviceAccount),
    databaseURL : FIREBASE_URL
});

// Move to the "defibrillatori" tree
var db = admin.database();
var ref = db.ref('server/');
var defiRef = ref.child('defibrillatori');

// /closest GET middleware, responds with the closest or the n closest defibrillators
exports.get = function(req, res, next){
    var lat = req.query.latitude;
    var lon = req.query.longitude;
    var reqCoords = [lon, lat];

    // If n is not specified, only returns the closest
    if(!"n" in req.query){
        var closest = {"address" : "ERROR",
                        "place" : "ERROR",
                        "coords" : [0,0],
                        "distance" : Number.POSITIVE_INFINITY};

        // Iterate through the db values and find closest defib
        defiRef.once('value', 
        (data) => {
            data.forEach(function(node){
                distance = geolib.getDistance(reqCoords, node.val().coords);
                if(distance < closest.distance){
                    closest.address = node.val().address;
                    closest.coords = node.val().coords;
                    closest.place = node.val().place;
                    closest.distance = distance;
                }
            });
            sendRes(res, 200, "Success", closest);
        },
        (error) => {
            console.log(error);
            sendRes(res, 500, "ERROR", "Database Error");
        })
    }
    // If n is specified, returns the n closest defibs
    else{
        var n = req.query.n;
        var ret = [];

        // Iterate through the db values
        defiRef.once('value', 
        (data) => {
            data.forEach(function(node){
                distance = geolib.getDistance(reqCoords, node.val().coords);
                // If we have less than n defibs saved, just add one more
                if(ret.length < n){
                    ret.push({
                        "address" : node.val().address,
                        "place" : node.val().coords,
                        "coords" : node.val().place,
                        "distance" : distance
                    })
                    ret.sort(function(elem1, elem2){
                        return distanceSort(elem1, elem2);
                    });
                }
                // else, check if the farthest is farther away than this one and eventually exchange them
                else{
                    if(ret[n-1].distance > distance){
                        ret[n-1] = {
                            "address" : node.val().address,
                            "place" : node.val().coords,
                            "coords" : node.val().place,
                            "distance" : distance
                        };
                        ret.sort(function(elem1, elem2){
                            return distanceSort(elem1, elem2);
                        });
                    }
                }
            });
            sendRes(res, 200, "Success", ret);
        },
        (error) => {
            console.log(error);
            sendRes(res, 500, "ERROR", "Database Error");
        })
    }
}

// Log and send the response
function sendRes(res, httpCode, status, message){
    console.log("Sending response.");
    console.log("Status code:" + httpCode + " Status:" + status + " Message: " + message);
    return res.status(httpCode).json({
        status : status,
        message : message
    });
}

// Sorting function from closest to farthest node
function distanceSort(node1, node2){
    return node1.distance - node2.distance;
}