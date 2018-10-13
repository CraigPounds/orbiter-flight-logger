'use strict';

const express = require('express');
const router = express.Router();
const { User, Mission } = require('./models');

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
      res.status(500).json({ message: 'Internal server error' });
    });
});

router.get('/:id', (req, res) => {
  Mission
    .findById(req.params.id)
    .then(mission => res.json(mission.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

router.post('/', (req, res) => {
  const requiredFields = ['title', 'user_id'];
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      const message = `Missing \'${field}\' in request body`;
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
            user: req.body.user_id,
            title: req.body.title,
          })
          .then(mission => res.status(201).json({
            _id: mission.id,
            user: `${user.firstName} ${user.lastName}`,
            title: mission.title,
            orbiterVersion: mission.orbiterVersion,
            os: mission.os,
            logs: mission.logs
          }))
          .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error'});
          });
      } else {
        const message = 'User not in database';
        console.error(message);
        return res.status(400).send(message);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

router.put('/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }
  const updated = {};
  const updateable = ['title', 'orbiterVersion', 'os', 'logs'];
  updateable.forEach(feild => {

    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });
  Mission
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedPost => res.status(200).json({
      _id: updatePost.id,
      title: updatedPost.title,
      orbiterVersion: updatePost.orbiterVersion,
      os: updatedPost.os,
      logs: updatedPost.logs
    }))
    .catch(err => res.status(500).json({ message: err }));
});

router.delete('/:id', (req, res) => {
  Mission.findByIdAndDelete(req.params.id)
    .then(mission => res.status(204).end())
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

router.use('*', function(req, res) {
  res.status(404).json({ message: 'Endpoint not found' });
});

module.exports = router;