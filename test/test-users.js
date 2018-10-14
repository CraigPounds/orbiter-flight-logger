'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const faker = require('faker');
const mongoose = require('mongoose');
const { User } = require('../users');
const { Mission } = require('../missions');
const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp);

// const firstName = faker.name.firstName();
// const lastName = faker.name.lastName();
// const email = faker.internet.email();
// const userName = gernerateUserName();
// const password = generateUserPassword();

function seedUserData() {
  console.info('seeding user data');
  const USER_DATA = [];
  for (let i = 1; i <= 10; i++) {
    USER_DATA.push(generateUserData());
  }
  // console.log('USER_DATA', USER_DATA);
  return User.insertMany(USER_DATA);
}

function seedMissionData() {
  console.info('seeding mission data');
  const MISSION_DATA = [];
  return chai.request(app)
    .get('/users')
    .then(function(res) {
      // console.log('res.body', res.body);
      res.body.users.forEach(user => {
        let newMissionData = generateMissionData(user._id);
        // console.log('newMissionData', newMissionData);
        MISSION_DATA.push(newMissionData);
      });
      // console.log('MISSION_DATA', MISSION_DATA);
      return Mission.insertMany(MISSION_DATA);
    });
}

function gernerateUserName() {
  return `${faker.name.firstName().toLowerCase()}${Math.floor(Math.random() * 1000)}`;
}

function generateUserPassword() {
  let password = faker.lorem.word() + Math.floor(Math.random() * 1000) + faker.lorem.word() + faker.lorem.word();
  return password;
}

function generateUserData() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    userName: gernerateUserName(),
    password: generateUserPassword()
  };
}

function generateOrbiterVersion() {
  const VERSION = ['2005', '2006', '2010', '2016'];
  let i = Math.floor(Math.random() * VERSION.length);
  return `Orbiter ${VERSION[i]}`;
}

function generateOperatingSystem() {
  const OPERATING_SYSTEMS = ['Windows 10', 'Windows 8.1', 'Windows 7', 'Windows XP', 'Windows 2000', 'other'];
  let i = Math.floor(Math.random() * OPERATING_SYSTEMS.length);
  return OPERATING_SYSTEMS[i];
}

function generateVessel() {
  const VESSELS = [ `USS ${faker.name.firstName()}`, 'Apollo 18', 'Atlantis', 'DG-III', 'DG-IV', 'XR-1', 'XR-2', 'XR-5', 'Millennium Falcon'];
  let i = Math.floor(Math.random() * VESSELS.length);
  return VESSELS[i];
}

function generateDate() {
  let i = Math.floor(Math.random() * 100) + 1;
  let newDate = faker.date.past(i).toString();
  return newDate.slice(3, 15);
}

function generatelogs() {
  const LOG_DATA = [];
  let index = Math.floor(Math.random() * 5) + 1;
  
  for (let i = 0; i < index; i++) {
    let newLogData = {
      title: faker.lorem.sentence(),
      vessel: generateVessel(),
      date: generateDate(),
      log: faker.lorem.paragraph()
    };
    LOG_DATA.push(newLogData);
  }
  // console.log('LOG_DATA', LOG_DATA);
  return LOG_DATA;
}

function generateMissionData(id) {
  // console.log('id', id);
  return {
    user: id,
    title: faker.lorem.sentence(),
    orbiterVersion: generateOrbiterVersion(),
    os: generateOperatingSystem(),
    logs: generatelogs()
  };
}

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

describe('API resource', function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });
  beforeEach(function() {
    return seedUserData();
  });
  beforeEach(function() {
    return seedMissionData();
  });
  afterEach(function() {
    return tearDownDb();
  });
  after(function() {
    return closeServer();
  }); 

  // describe('GET users endpoint', function() {
  //   it('should return all users', function() {
  //     let res;
  //     return chai.request(app)
  //       .get('/users')
  //       .then(function(_res) {
  //         res = _res;
  //         expect(res).to.have.status(200);
  //         expect(res.body.users).to.have.lengthOf.at.least(1);
  //         return User.countDocuments();
  //       })
  //       .then(function(count) {
  //         expect(res.body.users).to.have.lengthOf(count);
  //       });
  //   });
  //   it('should return users with correct fields', function() {
  //     let resUser;
  //     return chai.request(app)
  //       .get('/users')
  //       .then(function(res) {
  //         expect(res).to.have.status(200);
  //         expect(res).to.be.json;
  //         expect(res.body.users).to.be.a('array');
  //         expect(res.body.users).to.have.lengthOf.at.least(1);

  //         res.body.users.forEach(function(user) {
  //           expect(user).to.be.a('object');
  //           expect(user).to.include.keys('_id', 'firstName', 'lastName', 'email', 'userName');
  //         });
  //         resUser = res.body.users[0];
  //         return User.findById(resUser._id);
  //       })
  //       .then(function(user) {
  //         expect(resUser.firstName).to.be.equal(user.firstName);
  //         expect(resUser.lastName).to.be.equal(user.lastName);
  //         expect(resUser.userName).to.equal(user.userName);
  //         expect(resUser.email).to.be.equal(user.email);
  //       });
  //   });
  // });

  describe('POST users enpoint', function () {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const userName = gernerateUserName();
    const password = generateUserPassword();

    it('Should reject users with missing userName', function () {
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
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }
          const res = err.response;
          expect(res).to.have.status(422);
          expect(res.body.reason).to.equal('ValidationError');
          expect(res.body.message).to.equal('Missing field');
          expect(res.body.location).to.equal('userName');
        });
    });
    it('Should reject users with missing password', function () {
      return chai
        .request(app)
        .post('/users')
        .send({
          userName,
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
    it('Should reject users with non-string userName', function () {
      return chai
        .request(app)
        .post('/users')
        .send({
          userName: 1234,
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
          expect(res.body.location).to.equal('userName');
        });
    });
    it('Should reject users with non-string password', function () {
      return chai
        .request(app)
        .post('/users')
        .send({
          userName,
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
          userName,
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
          userName,
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
    it('Should reject users with non-trimmed userName', function () {
      return chai
        .request(app)
        .post('/users')
        .send({
          userName: ` ${userName} `,
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
          expect(res.body.location).to.equal('userName');
        });
    });
    it('Should reject users with non-trimmed password', function () {
      return chai
        .request(app)
        .post('/users')
        .send({
          userName,
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
    it('Should reject users with empty userName', function () {
      return chai
        .request(app)
        .post('/users')
        .send({
          userName: '',
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
          expect(res.body.location).to.equal('userName');
        });
    });
    it('Should reject users with password less than ten characters', function () {
      return chai
        .request(app)
        .post('/users')
        .send({
          userName,
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
          userName,
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
    it('Should reject users with duplicate userName', function () {
      // Create an initial user
      return User.create({
        userName,
        password,
        firstName,
        lastName,
        email
      })
        .then(() =>
          // Try to create a second user with the same userName
          chai.request(app).post('/users').send({
            userName,
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
          expect(res.body.location).to.equal('userName');
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
          userName,
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
            'userName'
          );
          expect(res.body.userName).to.equal(userName);
          expect(res.body.firstName).to.equal(firstName);
          expect(res.body.lastName).to.equal(lastName);
          return User.findOne({
            userName
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
          userName,
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
            'userName'
          );
          expect(res.body.userName).to.equal(userName);
          expect(res.body.firstName).to.equal(firstName);
          expect(res.body.lastName).to.equal(lastName);
          return User.findOne({
            userName
          });
        })
        .then(user => {
          expect(user).to.not.be.null;
          expect(user.firstName).to.equal(firstName);
          expect(user.lastName).to.equal(lastName);
        });
    });
  });

});
