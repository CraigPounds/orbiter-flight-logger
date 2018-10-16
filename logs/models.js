'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { Mission } = require('../users/models');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

const LogSchema = mongoose.Schema({ 
  mission_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Mission' },
  title: 'string',
  vessel: 'string',
  date: 'string',
  log: 'string'
});

LogSchema.methods.serialize = function() {
  return {
    _id: this._id,
    mission_id: this.mission_id,
    title: this.title,
    vessel: this.vessel,
    date: this.date,
    log: this.log
  };
};

LogSchema.pre('find', function(next) {
  // Mission.populate('user');
  this.populate('mission');
  next();
});

LogSchema.pre('findOne', function(next) {
  // Mission.populate('user');
  this.populate('mission');
  next();
});

const Log = mongoose.model('Log', LogSchema);

module.exports = { Log };