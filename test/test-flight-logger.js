'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const faker = require('faker');
const mongoose = require('mongoose');
const { User } = require('../users');
const { Mission } = require('../missions');
const { Log } = require('../logs');
const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp);

function seedUserData() {
  console.info('Seeding user data');
  const USER_DATA = [];
  for (let i = 0; i < 9; i++) {
    USER_DATA.push(generateUserData());
  }
  return User.insertMany(USER_DATA);
}

function seedMissionData() {
  console.info('Seeding mission data');
  const MISSION_DATA = [];
  return chai.request(app)
    .get('/users')
    .then(function(res) {
      res.body.users.forEach(user => {
        for (let i = 0; i < 9; i++) {
          let newMissionData = generateMissionData(user._id);
          MISSION_DATA.push(newMissionData);
        }
      });
      return Mission.insertMany(MISSION_DATA);
    });
}

function seedLogData() {
  console.info('Seeding log data');
  const LOG_DATA = [];
  return chai.request(app)
    .get('/missions')
    .then(function(res) {
      res.body.missions.forEach(mission => {
        for (let i = 0; i < 9; i++) {
          let newLogData = generateLogData(mission.user_id, mission._id);
          LOG_DATA.push(newLogData);
        }
      });
      return Log.insertMany(LOG_DATA);
    });
}

function gernerateUserName() {
  return `${faker.name.firstName().toLowerCase()}${Math.floor(Math.random() * 1000)}`;
}

function generateUserData() {

  let firstName = faker.name.firstName();
  let lastName = faker.name.lastName();
  let email = faker.internet.email();
  let username = gernerateUserName();
  // let password: faker.internet.password()
  let password = 'testPassword';

  return User.hashPassword(password).then(password => {
    // return User.create({
    //   firstName,
    //   lastName,
    //   email,
    //   username,
    //   password
    // });
    return {
      firstName,
      lastName,
      email,
      username,
      password
    };
  });
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

function generateMissionData(id) {
  return {
    user_id: id,
    title: faker.lorem.sentence(),
    orbiterVersion: generateOrbiterVersion(),
    os: generateOperatingSystem(),
  };
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

function generateLogData(userId, missionId) {
  return {
    user_id: userId,
    mission_id: missionId,
    title: faker.lorem.sentence(),
    vessel: generateVessel(),
    date: generateDate(),
    log: faker.lorem.paragraph()
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

module.exports = { seedUserData, seedMissionData, seedLogData, tearDownDb, generateLogData, generateMissionData, generateUserData, gernerateUserName };