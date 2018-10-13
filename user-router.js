'use strict';

const express = require('express');
const router = express.Router();
const { User, Mission } = require('./models');

router.get('/', (req, res) => {
  User
    .find()
    .then(users => {
      res.json({
        users: users.map(user => user.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error'});
    });
});

router.post('/', (req, res) => {
  const requiredFields = ['firstName', 'lastName', 'userName', 'email', 'password' ];
  requiredFields.forEach(feild => {
    if(!(field in req.body)) {
      const message = `Missing \'${field}\' in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  });
  User
    .findOne({ userName: req.body.userName })
    .then(user => {
      if (user) {
        const message = 'Username already exists';
        console.error(message);
        return res.status(400).send(message);
      } else {
        User
          .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
          })
          .then(user => res.status(201).json(
            user.serialize()
          ))
          .catch(err => {
            console.error(err);
            res.status(400).json({ error: 'Internal server error' });
          });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

router.put('/:id', (req, res) => {
  if(!(req.params.id && req.body.id && req.params.id === req.body )) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }
  const updated = {};
  const updateableFields = ['firstName', 'lastName', 'userName', 'email', 'password'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });
  User
    .findOne({ userName: updated.userName || '', _id: { $ne: req.params.id } })
    .then(user => {
      if(user) {
        const message = 'Username already exists';
        console.error(message);
        return res.status(400).send(message);
      } else {
        User
          .findByIdAndUpdate(req.params.id, { $set: updated }, {new: true })
          .then(updatedUser => {
            res.status(200).json(
              updatedUser.serialize()
            );
          })
          .catch(err => res.status(500).json({ message: err }));
      }
    });
});

router.delete('/:id', (req, res) => {
  Mission
    .deleteMany({ user: req.params.id })
    .then(() =>{
      User.findByIdAndDelete(req.params.id)
        .then(() => {
          res.status(204).end();
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

router.use('*', function(req, res) {
  res.status(404).json({ message: 'Endpoint not found'});
});

module.exports = router;
