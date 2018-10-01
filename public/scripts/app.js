'use strict';

import { decorateLogin, decorateHome, decorateSearch, decorateGallery, decorateSignup, decorateProfile } from './utils/templates.js';
import { DATA } from './data/mock-data.js';

function attachListeners() {
  console.log('attachListeners ran');
  $('#page').on('click', '#nav-login', pageLogin);
  $('#page').on('click', '#nav-home', pageHome);
  $('#page').on('click', '#nav-search', pageSearch);
  $('#page').on('click', '#nav-gallery', pageGallery);
  $('#page').on('click', '#nav-signup', pageSignup);
  $('#page').on('click', '#nav-profile', pageProfile);
  $('#page').on('click', '#nav-logout',  logout);

  $('#page').on('submit', '.form-login', submitLogin);
  $('#page').on('submit', '.form-home', submitMission);
  $('#page').on('submit', '.form-search', submitSearch);
  $('#page').on('submit', '.form-signup', submitSignup);
  $('#page').on('submit', '.form-profile', submitProfile);
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

function pageSignup() {
  $('#page').html(decorateSignup);
}

function pageProfile() {
  $('#page').html(decorateProfile);
}

function logout() {
  console.log('logout ran');
  DATA.loggedIn = false;
  $('#page').html(decorateGallery);
}

function submitLogin(event) {
  console.log('submitLogin ran');
  event.preventDefault();
  login();
}

function submitMission() {
  console.log('submitMission ran');
  event.preventDefault();
}

function submitSearch(event) {
  console.log('submitSearch ran');
  event.preventDefault();
}

function submitSignup(event) {
  console.log('submitSignup ran');
  event.preventDefault();
  login();
}

function submitProfile(event) {
  console.log('submitProfile ran');
  event.preventDefault();
}

function login() {
  DATA.loggedIn = true;
  pageHome();
}

function setUp() {
  $('#page').html(decorateHome);
}

export { attachListeners, setUp };