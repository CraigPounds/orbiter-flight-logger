'use strict';

import { decorateLogin, decorateHome, decorateSearch, decorateGallery, decorateSignup, decorateProfile } from './utils/templates.js';
import { DATA } from './data/mock-data.js';

function attachListeners() {
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
  DATA.loggedIn = false;
  $('#page').html(decorateGallery);
}

function submitLogin(event) {
  event.preventDefault();
  login();
}

function submitMission() {
  event.preventDefault();
  console.log('submitMission ran');
}

function submitSearch(event) {
  event.preventDefault();
  console.log('submitSearch ran');
}

function submitSignup(event) {
  event.preventDefault();
  login();
}

function submitProfile(event) {
  event.preventDefault();
  console.log('submitProfile ran');
}

function login() {
  DATA.loggedIn = true;
  pageHome();
}

function setUp() {
  $('#page').html(decorateHome);
}

export { attachListeners, setUp };