'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });
const { User } = require('../users/models');
const { Mission } = require('../missions/models');
const { Log } = require('./models');

router.post('/', (req, res) => {
  const requiredFields = ['mission_id', 'title'];
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  });
  Mission
    .findById(req.body.mission_id)
    .then(mission => {
      if (mission) {
        Log
          .create({
            mission_id: req.body.mission_id,
            title: req.body.title,
            vessel: req.body.vessel,
            date: req.body.date,
            log: req.body.log
          })
          .then(logPost => res.status(201).json({            
            _id: logPost.id,
            mission_id: logPost.mission_id,
            title: logPost.title,
            vessel: logPost.vessel,
            date: logPost.date,
            log: logPost.log
          }))
          .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error'});
          });
      }
      else {
        const message = 'Mission not in database';
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



router.delete('/:id', (req, res) => {
  Log.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();       
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
