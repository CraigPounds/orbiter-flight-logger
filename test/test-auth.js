'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const faker = require('faker');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { User } = require('../users');
const { Mission } = require('../missions');
const { Log } = require('../logs');
const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL, JWT_SECRET } = require('../config');
const { seedUserData, seedMissionData, seedLogData, tearDownDb, gernerateUserName } = require('./test-flight-logger');

chai.use(chaiHttp);

describe('Auth endpoints', function() {
  
  let firstName = 'James';
  let lastName = 'Kirk';
  let email = 'kirk@gmail.com';
  let username = 'koik';
  let password = 'passwordkoik';
  
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });
  
  beforeEach(function() {
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

  describe('/auth/login', function () {
    it('Should reject requests with no credentials', function () {
      return chai
        .request(app)
        .post('/auth/login')
        // .then(() =>
        //   expect.fail(null, null, 'Request should not succeed')
        // )
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }
          const res = err.response;
          expect(res).to.have.status(400);
        });
    });
    it('Should reject requests with incorrect usernames', function () {
      return chai
        .request(app)
        .post('/auth/login')
        .send({ username: 'wrongUsername', password })
        // .then(() =>
        //   expect.fail(null, null, 'Request should not succeed')
        // )
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }
          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    it('Should reject requests with incorrect passwords', function () {
      return chai
        .request(app)
        .post('/auth/login')
        .send({ username, password: 'wrongPassword' })
        // .then(() =>
        //   expect.fail(null, null, 'Request should not succeed')
        // )
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }
          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    // it('Should return a valid auth token', function () {
    //   return chai
    //     .request(app)
    //     .post('/auth/login')
    //     .send({ username, password })
    //     .then(res => {
    //       expect(res).to.have.status(200);
    //       expect(res.body).to.be.an('object');
    //       const token = res.body.authToken;
    //       expect(token).to.be.a('string');
    //       const payload = jwt.verify(token, JWT_SECRET, {
    //         algorithm: ['HS256']
    //       });
    //       expect(payload.user.username).to.equal(username);
    //       expect(payload.user.firstName).to.equal(firstName);
    //       expect(payload.user.lastName).to.equal(lastName);
    //     });
    // });
  });

  describe('/auth/refresh', function () {
    it('Should reject requests with no credentials', function () {
      return chai
        .request(app)
        .post('/auth/refresh')
        // .then(() =>
        //   expect.fail(null, null, 'Request should not succeed')
        // )
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }
          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    it('Should reject requests with an invalid token', function () {
      const token = jwt.sign(
        {
          username,
          firstName,
          lastName
        },
        'wrongSecret',
        {
          algorithm: 'HS256',
          expiresIn: '7d'
        }
      );

      return chai
        .request(app)
        .post('/auth/refresh')
        .set('Authorization', `Bearer ${token}`)
        // .then(() =>
        //   expect.fail(null, null, 'Request should not succeed')
        // )
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }
          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    it('Should reject requests with an expired token', function () {
      const token = jwt.sign(
        {
          user: {
            username,
            firstName,
            lastName
          },
        },
        JWT_SECRET,
        {
          algorithm: 'HS256',
          subject: username,
          expiresIn: Math.floor(Date.now() / 1000) - 10 // Expired ten seconds ago
        }
      );
      return chai
        .request(app)
        .post('/auth/refresh')
        .set('authorization', `Bearer ${token}`)
        // .then(() => {
        //   expect.fail(null, null, 'Request should not succeed');
        // })
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }
          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    it('Should return a valid auth token with a newer expiry date', function () {
      const token = jwt.sign(
        {
          user: {
            username,
            firstName,
            lastName,
            email
          }
        },
        JWT_SECRET,
        {
          algorithm: 'HS256',
          subject: username,
          expiresIn: '7d'
        }
      );
      const decoded = jwt.decode(token);
      return chai
        .request(app)
        .post('/auth/refresh')
        .set('authorization', `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          const token = res.body.authToken;
          expect(token).to.be.a('string');
          const payload = jwt.verify(token, JWT_SECRET, {
            algorithm: ['HS256']
          });
          expect(payload.user).to.deep.equal({
            username,
            firstName,
            lastName,
            email
          });
          expect(payload.exp).to.be.at.least(decoded.exp);
        });
    });
  });    
});
