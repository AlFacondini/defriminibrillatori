//Uploads the starting data to the firebase database
//Needs the config file to be filled to work

const {FIREBASE_KEY, FIREBASE_URL} = require('../config/config');
const INPUTFILE1 = './output/defibrillatori1.json';
const INPUTFILE2 = './output/defibrillatori2.json';

var admin = require('firebase-admin');
var path = require('path');
var pathToKey = path.resolve('../config', FIREBASE_KEY);
var serviceAccount = require(pathToKey);
var fs = require('fs');

//Login into firebase as the admin
admin.initializeApp({
    credential : admin.credential.cert(serviceAccount),
    databaseURL : FIREBASE_URL
});

//Move to the "defibrillatori" tree
var db = admin.database();
var ref = db.ref('server/');
var defiRef = ref.child('defibrillatori');

var data1 = JSON.parse(fs.readFileSync(INPUTFILE1));
var data2 = JSON.parse(fs.readFileSync(INPUTFILE2));

var count = 0;

//Push the data to the database
data1.forEach(obj => {
    defiRef.push().set(obj);
    count++;
});

data2.forEach(obj => {
    defiRef.push().set(obj);
    count++;
});

defiRef.once('value', (data) => {
    console.log(count + ' elements added. The total number of elements is now ' + data.numChildren() + '.');
    console.log("Please press CTRL + C");
})