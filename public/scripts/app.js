'use strict';

import {  decorateLogin, decorateHome, decorateSearch, decorateGallery, decorateSignup, decorateProfile } from './utils/templates.js';

function attachListeners() {
  console.log('attachListeners ran');
  $('#nav-login').on('click', pageLogin);
  $('#nav-home').on('click', pageHome);
  $('#nav-search').on('click', pageSearch);
  $('#nav-gallery').on('click', pageGallery);
  $('#nav-signup').on('click',pageSignUp);
  $('#nav-profile').on('click', pageProfile);
  $('#nav-logout').on('click', logOut);
  $('main').on('click', '#btn-new', newMission);  
}

function pageLogin() {
  $('main').html(decorateLogin);
}

function pageHome() {
  $('main').html(decorateHome);
}

function pageSearch() {
  $('main').html(decorateSearch);
}

function pageGallery() {
  $('main').html(decorateGallery);
}

function pageSignUp() {
  $('main').html(decorateSignup);
}

function pageProfile() {
  $('main').html(decorateProfile);
}

function logOut() {
  console.log('logOut ran');  
  $('.user').hide();
  $('.guest').show();
  $('main').html(decorateGallery);
}

function newMission() {
  console.log('newMission ran');
}

function setUp() {
  $('.guest').hide();
  $('main').html(decorateHome);
}

function renderMenu() {

}

function renderPage() {

}

function renderHtml() {
  renderMenu();
  renderPage();
}

export { attachListeners, setUp };