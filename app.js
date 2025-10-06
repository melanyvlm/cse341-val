const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const contactsRoutes = require('./routes/contacts');
require('dotenv').config();

const port = process.env.PORT || 8080;
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(express.static('public'));  // ← ESTA LÍNEA NUEVA
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Rutas de API
app.use('/professional', require('./routes/professional'));
app.use('/contacts', require('./routes/contacts'));

// Ruta principal sirve el frontend
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use('/contacts', contactsRoutes);

// Inicialización
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Connected to DB and listening on port ${port}`);
        });
    }
});