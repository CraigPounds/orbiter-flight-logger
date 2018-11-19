'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });
const { Mission } = require('../missions/models');
const { User } = require('./models');

router.post('/', (req, res) => {
  const requiredFields = ['email', 'username', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }
  const stringFields = ['firstName', 'lastName', 'email', 'username', 'password'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );
  if (nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField
    });
  }
  const explicityTrimmedFields = ['username', 'password'];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  );
  if (nonTrimmedField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Cannot start or end with whitespace',
      location: nonTrimmedField
    });
  }
  const sizedFields = {
    username: {
      min: 1
    },
    password: {
      min: 10,
      max: 72
    }
  };
  const tooSmallField = Object.keys(sizedFields).find(
    field =>
      'min' in sizedFields[field] &&
            req.body[field].trim().length < sizedFields[field].min
  );
  const tooLargeField = Object.keys(sizedFields).find(
    field =>
      'max' in sizedFields[field] &&
            req.body[field].trim().length > sizedFields[field].max
  );
  if (tooSmallField || tooLargeField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField
        ? `Must be at least ${sizedFields[tooSmallField]
          .min} characters long`
        : `Must be at most ${sizedFields[tooLargeField]
          .max} characters long`,
      location: tooSmallField || tooLargeField
    });
  }
  let { firstName = '', lastName = '', email = '', username, password } = req.body;
  // username, password are pre-trimmed else we throw error before now
  firstName = firstName.trim();
  lastName = lastName.trim();
  email = email.trim();

  return User.find({username})
    .countDocuments()
    .then(count => {
      if (count > 0) {
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Username already taken',
          location: 'username'
        });
      }
      // If username is not taken hash the password
      return User.hashPassword(password);
    })
    .then(hash => {
      return User.create({        
        firstName,
        lastName,
        email,
        username,
        password: hash
      });
    })
    .then(user => {
      return res.status(201).json(user.serialize());
    })
    .catch(err => {
      // Forward validation errors to the client
      // Otherwise give a 500 error, something unexpected has happened
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({code: 500, message: 'Internal server error'});
    });
});

router.get('/', jwtAuth, (req, res) => {
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

router.get('/:id', jwtAuth, (req, res) => {
  User
    .findById(req.params.id)
    .then(user => res.json(user.serialize()))
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

  // const stringFields = ['firstName', 'lastName', 'email', 'username', 'password'];
  // const nonStringField = stringFields.find(
  //   field => field in req.body && typeof req.body[field] !== 'string'
  // );
  // if (nonStringField) {
  //   return res.status(422).json({
  //     code: 422,
  //     reason: 'ValidationError',
  //     message: 'Incorrect field type: expected string',
  //     location: nonStringField
  //   });
  // }
  // const explicityTrimmedFields = ['username', 'password'];
  // const nonTrimmedField = explicityTrimmedFields.find(
  //   field => req.body[field].trim() !== req.body[field]
  // );
  // if (nonTrimmedField) {
  //   return res.status(422).json({
  //     code: 422,
  //     reason: 'ValidationError',
  //     message: 'Cannot start or end with whitespace',
  //     location: nonTrimmedField
  //   });
  // }
  // const sizedFields = {
  //   username: {
  //     min: 1
  //   },
  //   password: {
  //     min: 10,
  //     max: 72
  //   }
  // };
  // const tooSmallField = Object.keys(sizedFields).find(
  //   field =>
  //     'min' in sizedFields[field] &&
  //           req.body[field].trim().length < sizedFields[field].min
  // );
  // const tooLargeField = Object.keys(sizedFields).find(
  //   field =>
  //     'max' in sizedFields[field] &&
  //           req.body[field].trim().length > sizedFields[field].max
  // );
  // if (tooSmallField || tooLargeField) {
  //   return res.status(422).json({
  //     code: 422,
  //     reason: 'ValidationError',
  //     message: tooSmallField
  //       ? `Must be at least ${sizedFields[tooSmallField]
  //         .min} characters long`
  //       : `Must be at most ${sizedFields[tooLargeField]
  //         .max} characters long`,
  //     location: tooSmallField || tooLargeField
  //   });
  // }
  // let { firstName = '', lastName = '', email = '', username, password } = req.body;
  // // username, password are pre-trimmed else we throw error before now
  // firstName = firstName.trim();
  // lastName = lastName.trim();
  // email = email.trim();

  const updated = {};
  const updateableFields = ['firstName', 'lastName', 'username', 'email', 'password'];  
  updateableFields.forEach(field => {
    if (field in req.body) {
      if (field === 'password') {
        User.hashPassword(req.body[field]).then(function(hashedPassword) {
          updated[field] = hashedPassword;
        });
      } else {
        updated[field] = req.body[field];
      }
    }
  });
  User
    .findOne({ username: updated.username || '', _id: { $ne: req.params.id } })    
    .then(user => {
      if(user) {
        const message = 'Username already exists';
        console.error(message);
        return res.status(400).send({
          code: 422,
          reason: 'ValidationError',
          message: 'Username already taken',
          location: 'username'
        });
      }
      else {
        User
          .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
          .then(updatedUser => {
            res.status(200).json(
              updatedUser.serialize()
            );
          })
          .catch(err => res.status(500).json({ message: err }));
      }
    });
});

router.delete('/:id', jwtAuth, (req, res) => {
  Mission
    .deleteMany({ user_id: req.params.id })
    .then(() => {
      User.findByIdAndDelete(req.params.id)
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
