'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });
const { User } = require('../users/models');
const { Log } = require('../logs/models');
const { Mission } = require('./models');

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
    .find({ user_id: req.headers.data })
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

router.get('/:id', jwtAuth, (req, res) => {
  Mission
    .findById(req.params.id)
    .then(mission => res.json(mission.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

router.put('/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }
  const updated = {};
  const updateableFields = ['title', 'orbiterVersion', 'os'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });
  Mission
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedMission => {
      res.status(200).json(
        updatedMission.serialize()
      );
    })
    .catch(err => res.status(500).json({ message: err }));
});

router.delete('/:id', (req, res) => {
  Log
    .deleteMany({ mission_id: req.params.id })
    .then(() => {
      Mission.findByIdAndDelete(req.params.id)
        .then(() => {
          res.status(204).end();       
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
