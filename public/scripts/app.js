'use strict';

import { decorateLoginPage, decorateHomePage, decorateSearchPage, decorateGalleryPage, decorateSignupPage, decorateProfilePage, decorateResults } from './utils/templates.js';
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
  $('#page').html(decorateLoginPage);
}

function pageHome() {
  $('#page').html(decorateHomePage);
}

function pageSearch() {
  $('#page').html(decorateSearchPage);  
}

function pageGallery() {
  $('#page').html(decorateGalleryPage);
}

function pageSignup() {
  $('#page').html(decorateSignupPage);
}

function pageProfile() {
  $('#page').html(decorateProfilePage);
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
  getMissions(renderSearchResults);  ;
}

function submitSignup(event) {
  event.preventDefault();
  login();
}

function submitProfile(event) {
  event.preventDefault();
  console.log('submitProfile ran');
}

function logout() {
  DATA.loggedIn = false;
  pageGallery();
}

function login() {
  DATA.loggedIn = true;
  pageHome();
}

function setUp() {
  // login();
  logout();
}

function getMissions(callbackFn) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callbackFn(DATA); }, 1);
}

function renderSearchResults(data) {
  $('#search-results').html(decorateResults(data));
}

export { attachListeners, setUp };