require('dotenv').config();

const express = require('express');
const router = require('./app/router');
const helmet = require('helmet');
const crypto = require("crypto");
const cors = require('cors');

const app = express();

const port = process.env.PORT || 5000;

const expressSwagger = require('express-swagger-generator')(app);
let optionSwagger = require('./swagger-config.json');
optionSwagger.basedir = __dirname;
optionSwagger.swaggerDefinition.host = `localhost:${port}`;
expressSwagger(optionSwagger);

// Config pour les sub-resources integrity qu'on devra insérer dans les views.
  app.use((_, res, next) => {
    res.locals.nonce = crypto.randomBytes(16).toString("hex");
    next();
  });

//app.use(cors());

//https://connect.ed-diamond.com/MISC/misc-101/vos-entetes-https-avec-helmet

app.use(helmet()); //https://helmetjs.github.io/ 

//je dois configurer la CSP pour autoriser mon serveur a utiliser du CSS et mes images cloud pour le rendu de la validation du mail
app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [`'self'`,], // le fallback, pas présent par défault, 
      "script-src": [(_, res) => `'nonce-${res.locals.nonce}'`],
      "img-src": [`'self'`,`https://filedn.eu/lD5jpSv048KLfgLMlwC2cLz/ForkMe.png`], //je configure helmet pour la CSP : ok pour aller chercher mes images sur mon cloud perso, tout le reste, non!
      styleSrc: [ `'self'`,"'unsafe-inline'"], //
      "base-uri": ["'none'"],
      "object-src":["'none'"],
      //"style-src": [`'self'`, (_, res) => `'nonce-${res.locals.nonce}'`, "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"], // je peux utiliser res ici je suis dans un app.use ! Je convertis dynamiquement le nonce de ma vue avec cette méthode, sans avoir besoin de mettre 'unsafe-inline' pour lire CSS de ma vue, ce qui affaiblirait considérablement ma CSP ! 
     /// styleSrcElem:
      upgradeInsecureRequests: [] // On convertit tout ce qui rentre en HTTP et HTTPS direct !
    }
  }))

app.use((req, res, next) => {
  res.setHeader(
    "Permissions-Policy",
    "geolocation=(), interest-cohort=(), fullscreen=(), accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), display-capture=(), document-domain=(), document-domain=(), execution-while-not-rendered=(), execution-while-out-of-viewport=(), fullscreen=(), gamepad=(), gyroscope=(), layout-animations=(), legacy-image-formats=(), magnetometer=(), microphone=(), midi=(), navigation-override=(), oversized-images=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), speaker-selection=(), sync-xhr=(), usb=(), screen-wake-lock=(), web-share=(), xr-spatial-tracking=()"
  );
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
  });

app.set('x-powered-by', false);


app.use(express.static(`${__dirname}/app/static`));

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/app/views`);

app.use('/v1/cadex', router);

/**
 * Redirection vers une page 404
 */
 app.use((req, res) => {
    res.status(404).redirect('/api-docs');
  });


app.listen(port, () => {
  console.log(`APIS Running on https://localhost:${port}/v1/cadex`);
});
