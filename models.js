'use strict';

const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({  
  firstName: 'string',
  lastName: 'string',
  userName: {
    type: 'string',
    unique: true
  },
  email: 'string',
  password: 'string'
});

const logSchema = mongoose.Schema({ content: 'string' });

const missionSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: 'string',
  orbiterVersion: 'string',
  os: 'string',
  logs: [logSchema]
});

missionSchema.pre('find', function(next) {
  this.populate('user');
  next();
});

missionSchema.pre('findOne', function(next) {
  this.populate('user');
  next();
});

userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`.trim();
});

missionSchema.virtual('fullName').get(function() {
  return `${this.user.firstName} ${this.user.lastName}`.trim();
});

userSchema.methods.serialize = function() {
  return {
    _id: this._id,
    name: this.fullName,
    userName: this.userName
  };
};

const User = mongoose.model('User', userSchema);
const Mission = mongoose.model('Mission', missionSchema);

module.exports = { User, Mission };