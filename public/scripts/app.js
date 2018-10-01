'use strict';

import { decorateLogin, decorateHome, decorateSearch, decorateGallery, decorateSignup, decorateProfile } from './utils/templates.js';
import { DATA } from './data/mock-data.js';

function attachListeners() {
  console.log('attachListeners ran');
  $('#page').on('click', '#nav-login', pageLogin);
  $('#page').on('click', '#nav-home', pageHome);
  $('#page').on('click', '#nav-search', pageSearch);
  $('#page').on('click', '#nav-gallery', pageGallery);
  $('#page').on('click', '#nav-signup', pageSignUp);
  $('#page').on('click', '#nav-profile', pageProfile);
  $('#page').on('click', '#nav-logout',  logOut);
  $('#page').on('click', '#btn-new', newMission);  
}

function pageLogin() {
  $('#page').html(decorateLogin);
}

function pageHome() {
  $('#page').html(decorateHome);
}

function pageSearch() {
  $('#page').html(decorateSearch);
}

function pageGallery() {
  $('#page').html(decorateGallery);
}

function pageSignUp() {
  $('#page').html(decorateSignup);
}

function pageProfile() {
  $('#page').html(decorateProfile);
}

function logOut() {
  console.log('logOut ran');
  DATA.loggedIn = false;
  $('#page').html(decorateGallery);
}

function newMission() {
  console.log('newMission ran');
}

function setUp() {
  $('#page').html(decorateHome);
}

export { attachListeners, setUp };