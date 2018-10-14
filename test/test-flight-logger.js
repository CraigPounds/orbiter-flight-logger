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
    .then(function(
      res) {
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

  describe('Hit root URL', function() {
    it('should return status code 200 and HTML', function() {
      let res;
      return chai.request(app)
        .get('/')
        .then(function(_res) {
          res = _res;
          expect(res).to.have.status(200);
          expect(res).to.be.html;
        });
    });
  });
});

module.exports = { seedUserData, seedMissionData, tearDownDb, gernerateUserName, generateUserPassword };