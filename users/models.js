'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {type: String, default: ''},
  lastName: {type: String, default: ''}
});

UserSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`.trim();
});

UserSchema.methods.serialize = function() {
  return {
    userName: this.userName || '',
    firstName: this.firstName || '',
    lastName: this.lastName || '',
    email: this.email || ''
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const LogSchema = mongoose.Schema({ content: 'string' });

const MissionSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: 'string',
  orbiterVersion: 'string',
  os: 'string',
  logs: [LogSchema]
});

MissionSchema.pre('find', function(next) {
  this.populate('user');
  next();
});

MissionSchema.pre('findOne', function(next) {
  this.populate('user');
  next();
});

MissionSchema.virtual('fullName').get(function() {
  return `${this.user.firstName} ${this.user.lastName}`.trim();
});

const User = mongoose.model('User', UserSchema);
const Mission = mongoose.model('Mission', MissionSchema);

module.exports = { User, Mission };
