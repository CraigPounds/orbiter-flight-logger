'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });
const { Mission } = require('./models');
const { User } = require('../users');


router.post('/', (req, res) => {
  const requiredFields = ['user_id', 'title'];
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  });
  User
    .findById(req.body.user_id)
    .then(user => {
      if (user) {
        Mission
          .create({
            user_id: req.body.user_id,
            title: req.body.title,
            orbiterVersion: req.body.orbiterVersion,
            os: req.body.os
          })
          .then(missionPost => res.status(201).json({            
            _id: missionPost.id,
            // user_id: `${user.firstName} ${user.lastName}`,
            user_id: missionPost.user_id,
            title: missionPost.title,
            orbiterVersion: missionPost.orbiterVersion,
            os: missionPost.os
          }))
          .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error'});
          });
      }
      else {
        const message = 'User not in database';
        console.error(message);
        return res.status(400).send(message);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error'});
    });
});

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

router.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});

module.exports = { router };
