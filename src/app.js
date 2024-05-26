const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./controllers/authController'));
// Servir archivos estáticos (formulario HTML)
app.use(express.static('public'));
// Configurar body-parser
app.use(bodyParser.urlencoded({ extended: true }));


module.exports = app;