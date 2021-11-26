# cadexfront

An API that retrieves data from an cadavre exquis for displaying in 2 dynamic wallpapers.

This API uses data from this **[API](https://cadex-api.thedev.fr/v1/cadex)** : https://github.com/RomainBoudet/cadex

### Stack :

* Back-end JavaScript runtime environment : Node.js
* Framework :Express

### Mains npm packages :

* npm packages for documentation : express-swagger-generator
* npm security package : helmet

## Install :

* 1) Clone this repository
* 2) Make file .env has the same place as the file .env.example.
* 3) Lunch in command line in the cadex folder : npm install.
* 4) Lunch in command line in the cadex folder : npm start.
* 5) In your browser, go to http://localhost:yourPortnumber/v1/cadex/particles or http://localhost:yourPortnumber/v1/cadex/cloud.
* 6) The swagger doc : http://localhost:yourPortnumber/api-docs


##### You can try it online ;) : [particles cadex](https://cadex-front.thedev.fr/v1/cadex/particles) / [cloud cadex](https://cadex-front.thedev.fr/v1/cadex/cloud)
