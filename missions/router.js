'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const { Mission } = require('./models');
// const passport = require('passport');
const router = express.Router();
// const jwtAuth = passport.authenticate('jwt', { session: false });

const jsonParser = bodyParser.json();

router.get('/', (req, res) => {
  Mission
    .find()
    .then(missions => {
      res.json({
        missions: missions.map(mission => mission.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error'});
    });
});

module.exports = { router };
