'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const faker = require('faker');
const { User } = require('../users');
const { Mission } = require('../missions');
const { Log } = require('../logs');
const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL } = require('../config');
const { seedUserData, seedMissionData, seedLogData, tearDownDb, generateUserData, gernerateUserName } = require('./test-flight-logger');

chai.use(chaiHttp);

describe('Users endpoints', function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });
  beforeEach(function() {
    // console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrreturn', seedUserData());
    // return seedUserData();
  });
  beforeEach(function() {
    // return seedMissionData();
  });
  beforeEach(function() {
    // return seedLogData();
  });
  afterEach(function() {
    return tearDownDb();
  });
  after(function() {
    return closeServer();
  }); 

  describe('POST users enpoint', function () {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const username = gernerateUserName();
    const password = faker.internet.password();

    it('Should reject users with missing username', function () {
      return chai
        .request(app)
        .post('/users')
        .send({
          firstName,
          lastName,
          email,
          password
        })
        // .then(() =>
        //   expect.fail(null, null, 'Request should not succeed')
        // )        
        // .catch(err => {
        //   if (err instanceof chai.AssertionError) {
        //     throw err;
        //   }
        //   const res = err.response;
        //   expect(res).to.have.status(422);
        //   expect(res.body.reason).to.equal('ValidationError');
        //   expect(res.body.message).to.equal('Missing field');
        //   expect(res.body.location).to.equal('username');
        // });
        .then(function(res) {
          expect(res).to.have.status(422);
          expect(res.body.reason).to.equal('ValidationError');
          expect(res.body.message).to.equal('Missing field');
          expect(res.body.location).to.equal('username');
        });
    });
    it('Should reject users with missing password', function () {
      return chai
        .request(app)
        .post('/users')
        .send({
          username,
          firstName,
          lastName
        })
        // .then(() =>
        //   expect.fail(null, null, 'Request should not succeed')
        // )
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }
          const res = err.response;
          expect(res).to.have.status(422);
          expect(res.body.reason).to.equal('ValidationError');
          expect(res.body.message).to.equal('Missing field');
          expect(res.body.location).to.equal('password');
        });
    });
    it('Should reject users with non-string username', function () {
      return chai
        .request(app)
        .post('/users')
        .send({
          username: 1234,
          password,
          firstName,
          lastName
        })
        // .then(() =>
        //   expect.fail(null, null, 'Request should not succeed')
        // )
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(422);
          expect(res.body.reason).to.equal('ValidationError');
          expect(res.body.message).to.equal(
            'Incorrect field type: expected string'
          );
          expect(res.body.location).to.equal('username');
        });
    });
    it('Should reject users with non-string password', function () {
      return chai
        .request(app)
        .post('/users')
        .send({
          username,
          password: 1234,
          firstName,
          lastName
        })
        // .then(() =>
        //   expect.fail(null, null, 'Request should not succeed')
        // )
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(422);
          expect(res.body.reason).to.equal('ValidationError');
          expect(res.body.message).to.equal(
            'Incorrect field type: expected string'
          );
          expect(res.body.location).to.equal('password');
        });
    });
    it('Should reject users with non-string first name', function () {
      return chai
        .request(app)
        .post('/users')
        .send({
          username,
          password,
          firstName: 1234,
          lastName
        })
        // .then(() =>
        //   expect.fail(null, null, 'Request should not succeed')
        // )
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(422);
          expect(res.body.reason).to.equal('ValidationError');
          expect(res.body.message).to.equal(
            'Incorrect field type: expected string'
          );
          expect(res.body.location).to.equal('firstName');
        });
    });
    it('Should reject users with non-string last name', function () {
      return chai
        .request(app)
        .post('/users')
        .send({
          username,
          password,
          firstName,
          lastName: 1234
        })
        // .then(() =>
        //   expect.fail(null, null, 'Request should not succeed')
        // )
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(422);
          expect(res.body.reason).to.equal('ValidationError');
          expect(res.body.message).to.equal(
            'Incorrect field type: expected string'
          );
          expect(res.body.location).to.equal('lastName');
        });
    });
    it('Should reject users with non-trimmed username', function () {
      return chai
        .request(app)
        .post('/users')
        .send({
          username: ` ${username} `,
          password,
          firstName,
          lastName
        })
        // .then(() =>
        //   expect.fail(null, null, 'Request should not succeed')
        // )
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(422);
          expect(res.body.reason).to.equal('ValidationError');
          expect(res.body.message).to.equal(
            'Cannot start or end with whitespace'
          );
          expect(res.body.location).to.equal('username');
        });
    });
    it('Should reject users with non-trimmed password', function () {
      return chai
        .request(app)
        .post('/users')
        .send({
          username,
          password: ` ${password} `,
          firstName,
          lastName
        })
        // .then(() =>
        //   expect.fail(null, null, 'Request should not succeed')
        // )
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(422);
          expect(res.body.reason).to.equal('ValidationError');
          expect(res.body.message).to.equal(
            'Cannot start or end with whitespace'
          );
          expect(res.body.location).to.equal('password');
        });
    });
    it('Should reject users with empty username', function () {
      return chai
        .request(app)
        .post('/users')
        .send({
          username: '',
          password,
          firstName,
          lastName
        })
        // .then(() =>
        //   expect.fail(null, null, 'Request should not succeed')
        // )
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(422);
          expect(res.body.reason).to.equal('ValidationError');
          expect(res.body.message).to.equal(
            'Must be at least 1 characters long'
          );
          expect(res.body.location).to.equal('username');
        });
    });
    it('Should reject users with password less than ten characters', function () {
      return chai
        .request(app)
        .post('/users')
        .send({
          username,
          password: '123456789',
          firstName,
          lastName
        })
        // .then(() =>
        //   expect.fail(null, null, 'Request should not succeed')
        // )
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(422);
          expect(res.body.reason).to.equal('ValidationError');
          expect(res.body.message).to.equal(
            'Must be at least 10 characters long'
          );
          expect(res.body.location).to.equal('password');
        });
    });
    it('Should reject users with password greater than 72 characters', function () {
      return chai
        .request(app)
        .post('/users')
        .send({
          username,
          password: new Array(73).fill('a').join(''),
          firstName,
          lastName
        })
        // .then(() =>
        //   expect.fail(null, null, 'Request should not succeed')
        // )
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(422);
          expect(res.body.reason).to.equal('ValidationError');
          expect(res.body.message).to.equal(
            'Must be at most 72 characters long'
          );
          expect(res.body.location).to.equal('password');
        });
    });
    it('Should reject users with duplicate username', function () {
      // Create an initial user
      return User.create({
        username,
        password,
        firstName,
        lastName,
        email
      })
        .then(() =>
          // Try to create a second user with the same username
          chai.request(app).post('/users').send({
            username,
            password,
            firstName,
            lastName,
            email
          })
        )
        // .then(() =>
        //   expect.fail(null, null, 'Request should not succeed')
        // )
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(422);
          expect(res.body.reason).to.equal('ValidationError');
          expect(res.body.message).to.equal(
            'Username already taken'
          );
          expect(res.body.location).to.equal('username');
        });
    });
    it('Should create a new user', function () {
      return chai
        .request(app)
        .post('/users')
        .send({
          firstName,
          lastName,
          email,
          username,
          password
        })
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys(
            '_id',
            'firstName',
            'lastName',
            'email',
            'username'
          );
          expect(res.body.username).to.equal(username);
          expect(res.body.firstName).to.equal(firstName);
          expect(res.body.lastName).to.equal(lastName);
          return User.findOne({
            username
          });
        })
        .then(user => {
          expect(user).to.not.be.null;
          expect(user.firstName).to.equal(firstName);
          expect(user.lastName).to.equal(lastName);
          return user.validatePassword(password);
        })
        .then(passwordIsCorrect => {
          expect(passwordIsCorrect).to.be.true;
        });
    });
    it('Should trim firstName and lastName', function () {
      return chai
        .request(app)
        .post('/users')
        .send({
          firstName: ` ${firstName} `,
          lastName: ` ${lastName} `,
          email,
          username,
          password,
        })
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys(
            '_id',
            'firstName',
            'lastName',
            'email',
            'username'
          );
          expect(res.body.username).to.equal(username);
          expect(res.body.firstName).to.equal(firstName);
          expect(res.body.lastName).to.equal(lastName);
          return User.findOne({
            username
          });
        })
        .then(user => {
          expect(user).to.not.be.null;
          expect(user.firstName).to.equal(firstName);
          expect(user.lastName).to.equal(lastName);
        });
    });
  });

  describe('GET users endpoint', function() {
    it('should return all users', function() {
      let res;
      return chai.request(app)
        .get('/users')
        .then(function(_res) {
          res = _res;
          expect(res).to.have.status(200);
          expect(res.body.users).to.have.lengthOf.at.least(1);
          return User.countDocuments();
        })
        .then(function(count) {
          expect(res.body.users).to.have.lengthOf(count);
        });
    });
    // it('should return users with correct fields', function() {
    //   let resUser;
    //   return chai.request(app)
    //     .get('/users')
    //     .then(function(res) {
    //       expect(res).to.have.status(200);
    //       expect(res).to.be.json;
    //       expect(res.body.users).to.be.a('array');
    //       expect(res.body.users).to.have.lengthOf.at.least(1);

    //       res.body.users.forEach(function(user) {
    //         expect(user).to.be.a('object');
    //         expect(user).to.include.keys('_id', 'firstName', 'lastName', 'email', 'username');
    //       });
    //       resUser = res.body.users[0];
    //       return User.findById(resUser._id);
    //     })
    //     .then(function(user) {
    //       expect(resUser._id).to.be.equal(user._id.toString());
    //       expect(resUser.firstName).to.be.equal(user.firstName);
    //       expect(resUser.lastName).to.be.equal(user.lastName);
    //       expect(resUser.username).to.equal(user.username);
    //       expect(resUser.email).to.be.equal(user.email);
    //     });
    // });
  });

  describe('GET user by ID endpoint', function() {
    // it('should GET a user by user id', function() {
    //   let testUser = {};
    //   return User
    //     .findOne()
    //     .then(function(user) {
    //       testUser = user;
    //       return chai.request(app)
    //         .get(`/users/${user._id}`);
    //     })
    //     .then(function(res) {
    //       expect(res).to.have.status(200);
    //       return User.findById(testUser._id);
    //     })
    //     .then(function(user) {
    //       expect(user._id.toString()).to.equal(testUser._id.toString());
    //       expect(user.firstName).to.equal(testUser.firstName);
    //       expect(user.lastName).to.equal(testUser.lastName);
    //       expect(user.email).to.equal(testUser.email);
    //       expect(user.username).to.equal(testUser.username);
    //       expect(user.password).to.equal(testUser.password);
    //     });
    // });
  });

  describe('PUT users endpoint', function() {
    // it('should update valid fields for an user by user id', function() {
    //   const updateData = generateUserData();
    //   return User
    //     .findOne()
    //     .then(function(user) {
    //       updateData.id = user._id;
    //       return chai.request(app)
    //         .put(`/users/${user._id}`)
    //         .send(updateData);
    //     })
    //     .then(function(res) {          
    //       expect(res).to.have.status(200);
    //       return User.findById(updateData.id);
    //     })
    //     .then(function(user) {
    //       expect(user.firstName).to.equal(updateData.firstName);
    //       expect(user.lastName).to.equal(updateData.lastName);
    //       expect(user.username).to.equal(updateData.username);
    //       expect(user.email).to.equal(updateData.email);
    //       expect(user.password).to.equal(updateData.password);
    //     });
    // });  
  });

  describe('DELETE users endpoint', function() {
    // it('should delete user and all associated missions and logs by user id', function() {
    //   let user;
    //   return User
    //     .findOne()
    //     .then(function(_user) {
    //       user = _user;
    //       return chai.request(app).delete(`/users/${user._id}`);
    //     })
    //     .then(function(res) {
    //       expect(res).to.have.status(204);
    //       return User.findById(user._id);
    //     })
    //     .then(function(_user) {
    //       expect(_user).to.be.null;
    //     });
    // });
  });

});
