require('dotenv').config();

const express = require('express');
//const router = require('./app/router');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.static(`${__dirname}/app/static`));

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/app/views`);

app.use(express.urlencoded({ extended: true }));

//app.use('/v1/cadex', router);

// Test :
app.use('/v1/cadex', (req, res) => {
    res.send('Hello World');
} )

app.listen(port, () => {
  console.log(`APIS Running on https://localhost:${port}/v1/cadex`);
});
