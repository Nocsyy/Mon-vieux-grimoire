const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/auth');

mongoose
  .connect(
    'mongodb+srv://andy:1YQGF0cXSF0USSBK@cluster0.ycrrl2e.mongodb.net/monVieuxGrimoire?retryWrites=true&w=majority',

    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
