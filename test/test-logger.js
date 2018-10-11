'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

const { app } = require('../server');
chai.use(chaiHttp);

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
