var exports = module.exports = {}

const {FIREBASE_KEY, FIREBASE_URL} = require('../config/config');

var admin = require('firebase-admin');
var path = require('path');
var geolib = require('geolib');
var pathToKey = path.resolve('./config', FIREBASE_KEY);
var serviceAccount = require(pathToKey);

//Login into firebase as the admin
admin.initializeApp({
    credential : admin.credential.cert(serviceAccount),
    databaseURL : FIREBASE_URL
});

//Move to the "defibrillatori" tree
var db = admin.database();
var ref = db.ref('server/');
var defiRef = ref.child('defibrillatori');

exports.get = function(req, res, next){
    var lat = req.query.latitude;
    var lon = req.query.longitude;
    var reqCoords = [lon, lat];
    var closest = {"address" : "ERROR",
                    "place" : "ERROR",
                    "coords" : [0,0],
                    "distance" : Number.POSITIVE_INFINITY};

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
        res.status(200).json({status : "Success", message : closest})
    },
    (error) => {
        console.log(error);
        res.status(500).json({status : "Error", message : "Error"})
    })
}

