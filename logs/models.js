'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
// const { User } = require('../users/models');
// const { Mission, MissionSchema } = require('../missions/models');

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

LogSchema.methods.serialize = function() {
  return {
    _id: this._id,
    title: this.title,
    vessel: this.vessel,
    date: this.date,
    log: this.log
  };
};

LogSchema.pre('find', function(next) {
  this.populate('user');
  next();
});

LogSchema.pre('findOne', function(next) {
  this.populate('user');
  next();
});

LogSchema.pre('find', function(next) {
  this.populate('mission');
  next();
});

LogSchema.pre('findOne', function(next) {
  this.populate('mission');
  next();
});

const Log = mongoose.model('Log', LogSchema);

module.exports = { Log, LogSchema };