
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Usa las rutas (igual que professional)
app.use('/professional', require('./routes/professional'));
app.use('/contacts', require('./routes/contact')); // Nueva ruta

// Ruta principal
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Inicializar base de datos y servidor
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

// const express = require('express');
// const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient;
// const mongodb = require('./db/connect');
// const professionalRoutes = require('./routes/professional');

// const port = process.env.PORT || 8080;
// const app = express();

// app
//   .use(bodyParser.json())
//   .use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
//   })
//   .use('/professional', professionalRoutes);

// mongodb.initDb((err, mongodb) => {
//   if (err) {
//     console.log(err);
//   } else {
//     app.listen(port);
//     console.log(`Connected to DB and listening on ${port}`);
//   }
// });