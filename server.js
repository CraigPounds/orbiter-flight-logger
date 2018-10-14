'use strict';

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();

const passport = require('passport');

const { router: usersRouter } = require('./users');
const { router: missionsRouter } = require('./missions');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');

const { PORT, DATABASE_URL } = require('./config');

mongoose.Promise = global.Promise;

// Logging
app.use(morgan('common'));

app.use(express.static('public'));

app.use(express.json());

// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/users/', usersRouter);
app.use('/missions/', missionsRouter);
app.use('/auth/', authRouter);

let server;

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    // mongoose.connect(databaseUrl, { useCreateIndex: true , useNewUrlParser: true }, err => {
    mongoose.connect(databaseUrl, { useCreateIndex: true }, err => {
    // mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
