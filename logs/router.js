'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
// const passport = require('passport');
// const jwtAuth = passport.authenticate('jwt', { session: false });
const { Log } = require('./models');

router.get('/', (req, res) => {
  Log
    .find()
    .then(logs => {
      res.json({
        logs: logs.map(log => log.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error'});
    });
});

router.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});

module.exports = { router };