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

router.post('/', jwtAuth, (req, res) => {
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
            user_id: req.body.user_id,
            mission_id: req.body.mission_id,
            title: req.body.title,
            vessel: req.body.vessel,
            date: req.body.date,
            log: req.body.log
          })
          .then(logPost => res.status(201).json({            
            _id: logPost.id,
            user_id: logPost.user_id,
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

function buildQuery(data) {
  let query = {};
  if(data.user_id) query.user_id = data.user_id;
  if(data.mission_id) query.mission_id = data.mission_id;
  //   query.mission_id: { $in: [
  //     mongoose.Types.ObjectId('5af50ff5c082f1e92f834264'),
  //     mongoose.Types.ObjectId('4ed3f117a844e0471100000d'), 
  //     mongoose.Types.ObjectId('4ed3f18132f50c491100000e')
  //   ]}
  return query;
}

router.get('/', jwtAuth, (req, res) => {
  let data = buildQuery(req.headers);
  Log
    .find(data)
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

router.get('/:id', jwtAuth, (req, res) => {
  Log
    .findById(req.params.id)
    .then(log => res.json(log.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

router.put('/:id', jwtAuth, (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }
  const updated = {};
  const updateableFields = ['title', 'vessel', 'date', 'log'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });
  Log
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedLog => {
      res.status(200).json(
        updatedLog.serialize()
      );
    })
    .catch(err => res.status(500).json({ message: err }));
});

router.delete('/:id', jwtAuth, (req, res) => {
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
