const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

mongoose
  .connect(
    'mongodb+srv://josh:7cAkx8sTKUG3Mhrt@cluster0-3ej3y.mongodb.net/node-angular?retryWrites=true&w=majority',
    { useCreateIndex: true, useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to Database!');
  })
  .catch(() => {
    console.log('Connection Failed!');
  });

app.use(bodyParser.json());

app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
