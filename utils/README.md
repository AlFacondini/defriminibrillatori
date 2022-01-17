# Defriminibrillatori 

Alberto Facondini - 277526

## Istruzioni

Per aggiungere gli open data della città di Rimini al database, si deve procedere alla normale installazione fino alla parte in cui si rinomina safe-config.js in config.js.

Fatto ciò, creare due cartelle chiamate "input" e "output" all'interno questa cartella, scaricare gli open data in formato GeoJSON da [qui](https://opendata.comune.rimini.it/dataset/defibrillatori-impianti-sportivi) e [qui](https://opendata.comune.rimini.it/dataset/defibrillatori-centro-storico) e copiarli nella cartella "input".

Eseguire i comandi
```
node impianti-sportivi-extractor
node centro-storico-extractor
node reverse-geocoding
node firebase-init
```
in questo ordine e seguire le istruzioni che compaiono a schermo. L'esecuzione di `node reverse-geocoding` richiede qualche minuto.

Proseguire con la normale installazione.

