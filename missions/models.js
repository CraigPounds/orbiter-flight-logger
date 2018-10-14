'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { User } = require('../users/models');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

const LogSchema = mongoose.Schema({ 
  mission: { type: mongoose.Schema.Types.ObjectId, ref: 'Mission' },
  title: 'string',
  vessel: 'string',
  date: 'string',
  log: 'string'
});

LogSchema.serialize = function() {
  return {
    _id: this._id,
    title: this.title,
    vessel: this.vessel,
    date: this.date,
    log: this.log
  };
};

LogSchema.pre('find', function(next) {
  this.populate(Mission);
  next();
});

const MissionSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: 'string',
  orbiterVersion: 'string',
  os: 'string',
  logs: [LogSchema]
});

MissionSchema.serialize = function() {
  return {
    _id: this._id,
    title: this.title,
    orbiterVersion: this.orbiterVersion,
    os: this.os,
    logs: this.logs
  };
};

MissionSchema.pre('find', function(next) {
  this.populate('user');
  next();
});

MissionSchema.pre('findOne', function(next) {
  this.populate('user');
  next();
});

const Mission = mongoose.model('Mission', MissionSchema);
const Log = mongoose.model('Log', LogSchema);

module.exports = { Mission, Log };
