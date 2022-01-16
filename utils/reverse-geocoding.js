//Makes use of LocationIQ reverse geocoding API to find the missing addresses in defibrillatori1.json
//Needs an account and the relative key to be added to config.js to work

const { LOCATIONIQ_KEY } = require('../config/config');
const BASEURL = 'https://us1.locationiq.com/v1/reverse.php?';
const INPUTFILE = './output/defibrillatori1.json';

var fs = require('fs');
var fetch = require('node-fetch');
var limiter = require('limiter');

//Prepare the API interrogation and return the answer  
async function reverseGeocoding(lat, lon, callback) {
    let url = BASEURL + 'key=' + LOCATIONIQ_KEY + '&lat=' + lat + "&lon=" + lon + '&accept-language=it&format=json';
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

//Read input, use the rate limiter to comply with LocationIQ restrictions, extract query data and write output to file
async function main() {
    var data = JSON.parse(fs.readFileSync(INPUTFILE));
    let newdata = [];
    for (const element of data) {
        const remainingMessages = await rLimiter.removeTokens(1);
        var data_lon = element.coords[0];
        var data_lat = element.coords[1];
        console.log('lat: ' + data_lat + ', lon: ' + data_lon);
        let result = await reverseGeocoding(data_lat, data_lon);
        console.log(result.display_name);
        newdata.push({
            place: element.place,
            address: result.display_name,
            coords: element.coords
        });
    }
    fs.writeFileSync(INPUTFILE, JSON.stringify(newdata, null, 3));
    console.log("Done.");
}

//Set the rate limiter to 1 request every 1.5 seconds
const rLimiter = new limiter.RateLimiter({ tokensPerInterval: 1, interval: 1500 });

main();