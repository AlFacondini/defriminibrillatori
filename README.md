# Defriminibrillatori 

Alberto Facondini - 277526

## Indice
* [Descrizione servizio](#descrizione-servizio)
* [Descrizione architettura](#descrizione-architettura)
* [Dati e servizi esterni](#dati-e-servizi-esterni)
* [Documentazione API](#documentazione-api)
* [Descrizione della messa online del servizio](#descrizione-della-messa-online-del-servizio)
* [Esempi](#esempi)

## Descrizione servizio

Il servizio nasce allo scopo di rendere più immediato trovare la posizione del defibrillatore automatico più vicino fra quelli disponibili pubblicamente nella città di Rimini.

Inviando al servizio le proprie coordinate geografiche, questo risponde con luogo, indirizzo, coordinate e distanza di uno o più dei defibrillatori nella zona.

È anche possibile aggiungere nuovi defibrillatori all'elenco o rimuoverli se non più attivi. 

## Descrizione architettura

Il servizio è stato sviluppato totalmente in JavaScript per il runtime Node.js e, in particolare, fa utilizzo del framework Express. 

I dati relativi ai defibrillatori sono salvati in un database RealtimeDatabase di Google in formato JSON, che è anche il formato delle risposte fornite dalla nostra api.

Viene inoltre fatto utilizzo della libreria geolib per il calcolo delle distanze tramite latitudine e longitudine.

## Dati e servizi esterni

I dati usati per il popolamento iniziale del database sono stati ottenuti dal [progetto open data del comune di Rimini](https://opendata.comune.rimini.it/) distribuiti con licenza [CC-BY](https://opendefinition.org/licenses/cc-by/).

Questi dati iniziali sono stati poi in parte integrati tramite il servizio di *reverse geocoding* di [LocationIQ](https://locationiq.com/?ref=link-back).

Viene fatto utilizzo del servizio RealtimeDatabase di Google tramite la libreria firebase-admin.

## Documentazione API

TODO

## Descrizione della messa online del servizio

Presupponendo di trovarci in ambiente Linux, sarà per prima cosa necessario installare Node.js e il relativo package manager npm. Il procedimento può variare, ma per sistemi operativi basati su debian i comandi sono
```
sudo apt update
sudo apt install nodejs npm
```
A questo punto sarebbe bene controllare l'avvenuta installazione tramite il comando
```
node -v
```
Se l'installazione è avvenuta correttamente, è possibile scaricare questa repository e, una volta che si è al suo interno, usare il seguente comando per installare le librerie e i pacchetti necessari all'esecuzione del servizio
```
npm install
```
Si può quindi copiare la propria chiave Firebase nella cartella config, aprire il file safe-config.js nella stessa e seguire le istruzioni aggiungendo i dati necessari. Fatto ciò, il file safe-config.js va rinominato in config.js.
Se si vuole popolare il proprio database con dei dati iniziali, si possono seguire le istruzioni presenti nel file README.md della cartella utils, altrimenti, se si vuole fare partire immediatamente il servizio, si esegua
```
node index
``` 

## Esempi

TODO
