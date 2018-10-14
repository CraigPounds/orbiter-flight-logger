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

// router.get('/', (req, res) => {
//   return res.sendFile(__dirname + '/public/index.html');
// });

// router.get('/',jwtAuth, (req, res) => {
//   return Mission.find()
//     .then(missions => res.json(missions.map(user => user.serialize())))
//     .catch(err => res.status(500).json({message: 'Internal server error'}));
// });


// router.get('/:id', jwtAuth, (req, res) => {
//   return Mission.findById(req.params.id)
//     .then(mission => res.json(mission.serialize()))
//     .catch(err => res.status(500).json({message: 'Internal server error'}));
// });

router.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});

module.exports = { router };
