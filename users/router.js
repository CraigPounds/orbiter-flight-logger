'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const { User } = require('./models');
const passport = require('passport');
const router = express.Router();
// const jwtAuth = passport.authenticate('jwt', { session: false });

const jsonParser = bodyParser.json();

router.post('/', jsonParser, (req, res) => {
  console.log(req.body);
  const requiredFields = ['email', 'userName', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }

  const stringFields = ['firstName', 'lastName', 'email', 'userName', 'password'];
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

  // If the userName and password aren't trimmed we give an error.  Users might
  // expect that these will work without trimming (i.e. they want the password
  // "foobar ", including the space at the end).  We need to reject such values
  // explicitly so the users know what's happening, rather than silently
  // trimming them and expecting the user to understand.
  // We'll silently trim the other fields, because they aren't credentials used
  // to log in, so it's less of a problem.
  const explicityTrimmedFields = ['userName', 'password'];
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
    userName: {
      min: 1
    },
    password: {
      min: 10,
      // bcrypt truncates after 72 characters, so let's not give the illusion
      // of security by storing extra (unused) info
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

  let { firstName = '', lastName = '', email = '', userName, password } = req.body;
  // userName and password come in pre-trimmed, otherwise we throw an error
  // before this
  firstName = firstName.trim();
  lastName = lastName.trim();
  email = email.trim();

  return User.find({userName})
    .count()
    .then(count => {
      if (count > 0) {
        // There is an existing user with the same userName
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'User name already taken',
          location: 'userName'
        });
      }
      // If there is no existing user, hash the password
      return User.hashPassword(password);
    })
    .then(hash => {
      return User.create({        
        firstName,
        lastName,
        email,
        userName,
        password: hash
      });
    })
    .then(user => {
      return res.status(201).json(user.serialize());
    })
    .catch(err => {
      // Forward validation errors on to the client, otherwise give a 500
      // error because something unexpected has happened
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({code: 500, message: 'Internal server error'});
    });
});

// router.get('/', (req, res) => {
//   return User.find()
//     .then(users => res.json(users.map(user => user.serialize())))
//     .catch(err => res.status(500).json({message: 'Internal server error'}));
// });

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

// router.get('/',jwtAuth, (req, res) => {
//   return User.find()
//     .then(users => res.json(users.map(user => user.serialize())))
//     .catch(err => res.status(500).json({message: 'Internal server error'}));
// });


// router.get('/:id', jwtAuth, (req, res) => {
//   return User.findById(req.params.id)
//     .then(user => res.json(user.serialize()))
//     .catch(err => res.status(500).json({message: 'Internal server error'}));
// });

module.exports = { router };
