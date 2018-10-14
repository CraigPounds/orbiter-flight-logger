'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { User } = require('../users/models');
const { Log, LogSchema } = require('../logs/models');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

const MissionSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: 'string',
  orbiterVersion: 'string',
  os: 'string',
  logs: [LogSchema]
});

MissionSchema.methods.serialize = function() {
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

module.exports = { Mission };
