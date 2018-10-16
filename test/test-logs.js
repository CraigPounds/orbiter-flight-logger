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
const { seedUserData, seedMissionData, seedLogData, tearDownDb, gernerateUserName, generateUserPassword } = require('./test-flight-logger');

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
  beforeEach(function() {
    return seedLogData();
  });
  afterEach(function() {
    return tearDownDb();
  });
  after(function() {
    return closeServer();
  });

  describe('GET logs endpoint', function() {
    it('should return all logs', function() {
      let res;
      return chai.request(app)
        .get('/logs')
        .then(function(_res) {
          res = _res;
          console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrres.body', res.body);
          expect(res).to.have.status(200);
          expect(res.body.logs).to.have.lengthOf.at.least(1);
          return Log.count();
        })
        .then(function(count) {
          expect(res.body.logs).to.have.lengthOf(count);
        });
    });
    it('should return logs with correct fields', function() {
      let resLog;
      return chai.request(app)
        .get('/logs')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.logs).to.be.a('array');
          expect(res.body.logs).to.have.lengthOf.at.least(1);

          res.body.logs.forEach(function(log) {
            expect(log).to.be.a('object');
            expect(log).to.include.keys('_id', 'mission_id', 'title', 'vessel', 'date', 'log');
          });
          resLog = res.body.logs[0];
          return Log.findById(resLog._id);
        })
        .then(function(log) {
          expect(resLog._id).to.equal(log._id.toString());
          expect(resLog.mission_id).to.equal(log.mission_id.toString());
          expect(resLog.title).to.equal(log.title);
          expect(resLog.vessel).to.equal(log.vessel);
          expect(resLog.date).to.equal(log.date);
          expect(resLog.log).to.equal(log.log);
        });
    });
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
