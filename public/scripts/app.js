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
  getUsers(authenticateCredentials);
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
  addUser();
}

function submitProfile(event) {
  event.preventDefault();
  console.log('submitProfile ran');
}

function addUser() {
  let firstName = $('#first-name').val().trim();
  let lastName = $('#last-name').val().trim();
  let userName = $('#user-name').val().trim();
  let password = $('#password').val().trim();
  let _id = userName + '0001';
  
  let newUser = {
    _id,
    firstName,
    lastName,
    userName,
    password
  };

  DATA.mockUsers.push(newUser);
  login();
}

function getMissions(callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(DATA.mockMissions); }, 600);
}

function renderSearchResults(data) {
  $('#search-results').html(decorateResults(data));
}

function authenticateCredentials(data) { 
  // find user
  const USER = data.find((user) => user.userName === $('#user-name').val().trim());
  // authenticate
  if (USER !== undefined && USER.password === $('#password').val().trim()) {    
    login();   
  }  
}

function getUsers(callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(DATA.mockUsers); }, 600);
}

function login() {  
  DATA.loggedIn = true;
  pageHome(); 
}

function logout() {
  DATA.loggedIn = false;
  pageGallery();
}

function setUp() {
  // login();
  logout();
}

export { attachListeners, setUp };