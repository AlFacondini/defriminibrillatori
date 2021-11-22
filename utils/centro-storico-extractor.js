//Extracts the relevant data from https://opendata.comune.rimini.it/dataset/defibrillatori-centro-storico .geojson file.
//Change the constants to match the name and location of your files.

//Input file format:
//{
//   "type" : "...", "name" : "...", "crs" : {...},
//   "features" : [
//      {
//         "type" : "...", 
//         "properties" : {
//         "OBJECTID_1" : "...", "OBJECTID" : "...", "Nome_assoc" : "...",
//    ---> "Luogo_defi" : "...", <--- 
//    ---> "Indirizzo": : "..."  <---
//         "Data_di_cr": "...", "Accesso_Pu": "...", "Tipo": "...", "Marca": "...", "Numero_di_": "...", 
//         "Proprietà": "...", "Manutenzio": "...", "Referente_": "..."
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

const INPUTFILE = './input/defibrillatori-centro-storico.geojson';
const OUTPUTFILE = './output/defibrillatori2.json';

var fs = require('fs');

//Read input file
var rawdata = JSON.parse(fs.readFileSync(INPUTFILE)).features;

//Extract data
var newdata = []; 
rawdata.forEach(element => {
    if(element.geometry != null){
        newdata.push({
            place : element.properties.Luogo_defi,
            address : element.properties.Indirizzo,
            coords : element.geometry.coordinates
        }); 
    }
});

//Write output
fs.writeFileSync(OUTPUTFILE, JSON.stringify(newdata, null, 3));
console.log("Done.");