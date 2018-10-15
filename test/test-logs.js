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
const { seedUserData, seedMissionData, tearDownDb, gernerateUserName, generateUserPassword } = require('./test-flight-logger');

chai.use(chaiHttp);

describe('Logs endpoints', function() {
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

  describe('POST logs endpoint', function() {
    it('should add a log by mission', function() {
      let newLog;
      return Mission
        .findOne()
        .then(function(mission) {          
          newLog = {
            mission_id: mission._id,
            title: faker.lorem.sentence(),
            vessel: faker.lorem.word(),
            date: faker.lorem.word(),
            log: faker.lorem.paragraph()
          };
          return chai.request(app)
            .post('/logs')
            .send(newLog)
            .then(function(res) {
              expect(res).to.have.status(201);
              expect(res).to.be.json;
              expect(res.body).to.be.a('object');
              expect(res.body).to.include.keys('_id', 'mission_id', 'title', 'vessel', 'date', 'log');
              expect(res.body._id).to.not.be.null;
              return Log.findById(res.body._id);
            })
            .then(function(log) {
              let logUserId = log.mission_id.toString();
              let newLogUserId = newLog.mission_id.toString();
              expect(logUserId).to.equal(newLogUserId);
              expect(log.title).to.equal(newLog.title);
              expect(log.vessel).to.equal(newLog.vessel);
              expect(log.date).to.equal(newLog.date);
              expect(log.log).to.equal(newLog.log);
            });
        });     
    });
  });
    
});
