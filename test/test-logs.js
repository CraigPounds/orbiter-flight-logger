'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const { Mission } = require('../missions');
const { Log } = require('../logs');
const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL } = require('../config');
const { seedUserData, seedMissionData, seedLogData, tearDownDb, generateLogData } = require('./test-flight-logger');

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

  describe('POST logs endpoint', function() {
    it('should add a log by mission id', function() {
      let newLog;
      return Mission
        .findOne()
        .then(function(mission) {          
          newLog = generateLogData(mission._id);
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
    
  describe('GET logs endpoint', function() {
    it('should return all logs', function() {
      let res;
      return chai.request(app)
        .get('/logs')
        .then(function(_res) {
          res = _res;
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

  describe('GET log by ID endpoint', function() {
    it('should GET a log by log id', function() {
      let testLog = {};
      return Log
        .findOne()
        .then(function(log) {
          testLog = log;
          return chai.request(app)
            .get(`/logs/${log._id}`);
        })
        .then(function(res) {
          expect(res).to.have.status(200);
          return Log.findById(testLog._id);
        })
        .then(function(log) {
          expect(log._id.toString()).to.equal(testLog._id.toString());
          expect(log.title).to.equal(testLog.title);
          expect(log.vessel).to.equal(testLog.vessel);
          expect(log.date).to.equal(testLog.date);
          expect(log.log).to.equal(testLog.log);
        });
    });
  });

  describe('PUT logs endpoint', function() {
    it('should update valid fields for a log by log id', function() {
      let updateData = generateLogData();
      return Log
        .findOne()
        .then(function(log) {      
          updateData.id = log._id;
          return chai.request(app)
            .put(`/logs/${log._id}`)
            .send(updateData);
        })
        .then(function(res) {
          expect(res).to.have.status(200);
          return Log.findById(updateData.id);
        })
        .then(function(log) {
          expect(log.title).to.equal(updateData.title);
          expect(log.vessel).to.equal(updateData.vessel);
          expect(log.date).to.equal(updateData.date);
          expect(log.log).to.equal(updateData.log);
        });
    });
  });
  
  describe('DELETE logs endpoint', function() {
    it('should delete a single log by blog id', function() {
      let log;
      return Log
        .findOne()
        .then(function(_log) {
          log = _log;
          return chai.request(app).delete(`/logs/${log._id}`);
        })
        .then(function(res) {
          expect(res).to.have.status(204);
          return Log.findById(log._id);
        })
        .then(function(_log) {
          expect(_log).to.be.null;
        });
    });
  });  
});
