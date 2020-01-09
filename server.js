'use strict';

//const dotenv = require('dotenv');
//dotenv.config();
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
// Block Header from containing info about server
app.disable('x-powered-by');
const passport = require('passport');

const { router: usersRouter } = require('./users');
const { router: missionsRouter } = require('./missions');
const { router: logsRouter } = require('./logs');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');

const { PORT, DATABASE_URL } = require('./config');

mongoose.Promise = global.Promise;

// Logging
app.use(morgan('common'));

// Set static folder
app.use(express.static('public'));

// Body Parser Middleware
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

// Routing
app.use('/users/', usersRouter);
app.use('/missions/', missionsRouter);
app.use('/logs/', logsRouter);
app.use('/auth/', authRouter);

let server;

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, { useCreateIndex: true , useNewUrlParser: true }, err => {
    
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
