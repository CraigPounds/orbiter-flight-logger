'use strict';

const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

const LogSchema = mongoose.Schema({ 
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mission_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Mission' },
  title: 'string',
  vessel: 'string',
  date: 'string',
  log: 'string'
});

LogSchema.methods.serialize = function() {
  return {
    _id: this._id,
    user_id: this.user_id,
    mission_id: this.mission_id,
    title: this.title,
    vessel: this.vessel,
    date: this.date,
    log: this.log
  };
};

LogSchema.pre('find', function(next) {
  this.populate('mission');
  next();
});

LogSchema.pre('findOne', function(next) {
  this.populate('mission');
  next();
});

const Log = mongoose.model('Log', LogSchema);

module.exports = { Log };