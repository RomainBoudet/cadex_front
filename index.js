require('dotenv').config();

const express = require('express');
const router = require('./app/router');
const helmet = require('helmet');
const crypto = require("crypto");
//const cors = require('cors');

const app = express();

const port = process.env.PORT || 5000;

const expressSwagger = require('express-swagger-generator')(app);
let optionSwagger = require('./swagger-config.json');
optionSwagger.basedir = __dirname;
optionSwagger.swaggerDefinition.host = `cadex-front.thedev.fr`;
expressSwagger(optionSwagger);

// Config for sub-resources integrity 
  app.use((_, res, next) => {
    res.locals.nonce = crypto.randomBytes(16).toString("hex");
    next();
  });

//app.use(cors());

//https://connect.ed-diamond.com/MISC/misc-101/vos-entetes-https-avec-helmet

app.use(helmet()); 

// CSP configuration and headers security
app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [`'self'`,], 
      "script-src": [(_, res) => `'nonce-${res.locals.nonce}'`],
      "img-src": [`'self'`,`https://filedn.eu/lD5jpSv048KLfgLMlwC2cLz/ForkMe.png`],
      
      "style-src": [ `'self'`,"'unsafe-inline'", "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"], //
      "base-uri": ["'none'"],
      "object-src":["'none'"],
    
      upgradeInsecureRequests: [] 
    }
  }))

app.use((req, res, next) => {
  res.setHeader(
    "Permissions-Policy",
    "geolocation=(), fullscreen=(), autoplay=(), camera=(), display-capture=(), document-domain=(), fullscreen=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), sync-xhr=(), usb=(), screen-wake-lock=(), xr-spatial-tracking=()"
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
  console.log(`APIS Running on http://localhost:${port}/v1/cadex/particles`);
});
