require('dotenv').config();

const express = require('express');
const router = require('./app/router');
const helmet = require('helmet');

const app = express();

const port = process.env.PORT || 5000;

const expressSwagger = require('express-swagger-generator')(app);
let optionSwagger = require('./swagger-config.json');
optionSwagger.basedir = __dirname;
optionSwagger.swaggerDefinition.host = `localhost:${port}`;
expressSwagger(optionSwagger);

//app.use(helmet());

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
