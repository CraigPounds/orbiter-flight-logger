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
      // console.log(Mission);
      return Mission.insertMany(MISSION_DATA);
    });
}

function gernerateUserName() {
  return `${faker.name.firstName().toLowerCase()}${Math.floor(Math.random() * 1000)}`;
}

function generateUserPassword() {
  let password = Date.now().toString() + faker.lorem.word();
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
  const I = Math.floor(Math.random() * 3);
  return `Orbiter ${VERSION[I]}`;
}

function generateOperatingSystem() {
  const OS = ['10', '8.1', '7', 'XP', '2000', 'other'];
  const I = Math.floor(Math.random() * 5);
  return `Windows ${OS[I]}`;
}

function generateDate() {
  const I = Math.floor(Math.random() * 100) + 1;
  let newDate = faker.date.past(I).toString();
  return newDate.slice(3, 15);
}

function generatelogs() {
  let seedLogs = [];
  const I = Math.floor(Math.random() * 5);
  
  for (let i = 0; i < I; i++) {
    let newLog = {
      title: faker.lorem.sentence(),
      vessel: faker.lorem.word(),
      date: generateDate(),
      log: faker.lorem.paragraph()
    };
    seedLogs.push(newLog);
  }
  return seedLogs;
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
    // it('should return status code 200 and HTML', function() {
    //   let res;
    //   return chai.request(app)
    //     .get('/')
    //     .then(function(_res) {
    //       res = _res;
    //       expect(res).to.have.status(200);
    //       expect(res).to.be.html;
    //     });
    // });
  });


});

// describe('/api/user', function () {
//   const firstName = 'Example';
//   const firstNameB = 'ExampleB';
//   const lastNameB = 'UserB';
//   const lastName = 'User';
//   const email = 'example@gmail.com';
//   const userName = 'exampleUser';
//   const userNameB = 'exampleUserB';
//   const password = 'examplePass';
//   const passwordB = 'examplePassB';

//   before(function () {
//     return runServer(TEST_DATABASE_URL);
//   });

//   after(function () {
//     return closeServer();
//   });

//   beforeEach(function () { });

//   afterEach(function () {
//     return User.deleteOne({});
//   });

//   describe('/api/users', function () {
//     describe('POST', function () {
//       it('Should reject users with missing userName', function () {
//         return chai
//           .request(app)
//           .post('/api/users')
//           .send({            
//             firstName,
//             lastName,
//             email,
//             password
//           })
//           .then(() =>
//             expect.fail(null, null, 'Request should not succeed')
//           )
//           .catch(err => {
//             if (err instanceof chai.AssertionError) {
//               throw err;
//             }

//             const res = err.response;
//             expect(res).to.have.status(422);
//             expect(res.body.reason).to.equal('ValidationError');
//             expect(res.body.message).to.equal('Missing field');
//             expect(res.body.location).to.equal('userName');
//           });
//       });  
//     });
//   });
// });
