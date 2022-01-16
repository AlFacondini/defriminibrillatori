//Extracts the relevant data from https://opendata.comune.rimini.it/dataset/defibrillatori-impianti-sportivi .geojson file.
//Changes the constants to match the name and location of your files.

//Input file format:
//{
//   "type" : "...", "name" : "...", "crs" : {...},
//   "features" : [
//      {
//         "type" : "...", 
//         "properties" : {
//         "OBJECTID_1" : "...", "Id" : "...", 
//    ---> "impianto" : "...", <--- 
//         "gestore" : "...", "scad_elett": "...", "ult_contro": "...",  "modello": "...", 
//         }
//         geometry : {
//            "type": "...",
//            "coordinates": [
//           ---> lon, <---
//           ---> lat  <---
//            ]
//         }   
//      },
//      {...}, {...}, ...
//   ]
//}

const INPUTFILE = './input/defibrillatori-impianti-sportivi.geojson';
const OUTPUTFILE = './output/defibrillatori1.json';

var fs = require('fs');

//Read input file
var rawdata = JSON.parse(fs.readFileSync(INPUTFILE)).features;

//Extract data
var newdata = []; 
rawdata.forEach(element => {
    if(element.geometry != null){
        newdata.push({
            place : element.properties.impianto,
            address : "",
            coords : element.geometry.coordinates
        }); 
    }
});

//Write output
fs.writeFileSync(OUTPUTFILE, JSON.stringify(newdata, null, 3));
console.log("Done.");