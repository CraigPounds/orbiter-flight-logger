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
const { seedUserData, seedMissionData, seedLogData, tearDownDb, gernerateUserName, generateUserPassword } = require('./test-flight-logger');

chai.use(chaiHttp);

describe('Missions endpoints', function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });
  beforeEach(function() {
    return seedUserData();
  });
  beforeEach(function() {
    return seedMissionData();
  });
  beforeEach(function() {
    return seedLogData();
  });
  afterEach(function() {
    return tearDownDb();
  });
  after(function() {
    return closeServer();
  });

  describe('POST missions endpoint', function() {
    it('should add a mission by user', function() {
      let newMission;
      return User
        .findOne()
        .then(function(user) {          
          newMission = {
            user_id: user._id,
            title: faker.lorem.sentence(),
            orbiterVersion: faker.lorem.sentence(),
            os: faker.lorem.word()
          };
          return chai.request(app)
            .post('/missions')
            .send(newMission)
            .then(function(res) {
              expect(res).to.have.status(201);
              expect(res).to.be.json;
              expect(res.body).to.be.a('object');
              expect(res.body).to.include.keys('_id', 'user_id', 'title', 'orbiterVersion', 'os');
              expect(res.body._id).to.not.be.null;
              return Mission.findById(res.body._id);
            })
            .then(function(mission) {
              expect(mission.user_id.toString()).to.equal(newMission.user_id.toString());
              expect(mission.title).to.equal(newMission.title);
              expect(mission.orbiterVersion).to.equal(newMission.orbiterVersion);
              expect(mission.os).to.equal(newMission.os);
            });
        });     
    });
  });

  describe('GET missions endpoint', function() {
    it('should return all missions', function() {
      let res;
      return chai.request(app)
        .get('/missions')
        .then(function(_res) {
          res = _res;
          expect(res).to.have.status(200);
          expect(res.body.missions).to.have.lengthOf.at.least(1);
          return Mission.count();
        })
        .then(function(count) {
          expect(res.body.missions).to.have.lengthOf(count);
        });
    });
    it('should return missions with correct fields', function() {
      let resMission;
      return chai.request(app)
        .get('/missions')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.missions).to.be.a('array');
          expect(res.body.missions).to.have.lengthOf.at.least(1);

          res.body.missions.forEach(function(mission) {
            expect(mission).to.be.a('object');
            expect(mission).to.include.keys('_id', 'user_id', 'title', 'orbiterVersion', 'os');
          });
          resMission = res.body.missions[0];
          return Mission.findById(resMission._id);
        })
        .then(function(mission) {
          expect(resMission._id).to.equal(mission._id.toString());
          expect(resMission.user_id).to.equal(mission.user_id.toString());
          expect(resMission.title).to.equal(mission.title);
          expect(resMission.orbiterVersion).to.equal(mission.orbiterVersion);
          expect(resMission.os).to.equal(mission.os);
        });
    });
  });
  


  describe('DELETE missions endpoint', function() {
    it('should delete mission and all associated logs by log id', function() {
      let mission;
      return Mission
        .findOne()
        .then(function(_mission) {
          mission = _mission;
          return chai.request(app).delete(`/missions/${mission._id}`);
        })
        .then(function(res) {
          expect(res).to.have.status(204);
          return Mission.findById(mission._id);
        })
        .then(function(_mission) {
          expect(_mission).to.be.null;
        });
    });
  });
});
