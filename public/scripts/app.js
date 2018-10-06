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
  getUsers(getUserProfile);
}

function getUserProfile(data) {
  $('#page').html(decorateProfilePage(data.find((user => user._id === DATA.userId))));
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
  let query = buildQuery();

  getMissions(query, renderSearchResults);
}

function buildQuery() {

}

function submitSignup(event) {
  event.preventDefault();
  postUser();
}

function submitProfile(event) {
  event.preventDefault();
  putUser();
}

function getUsers(callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(DATA.mockUsers); }, 600);
}

function postUser(callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(DATA.mockUsers); }, 600);

  let firstName = $('#first-name').val().trim();
  let lastName = $('#last-name').val().trim();
  let userName = $('#user-name').val().trim();
  let password = $('#password').val().trim();
  let retypedPassword = $('#retype-password').val().trim();
  let _id = userName + '0001';
  
  let newUser = {
    _id,
    firstName,
    lastName,
    userName,
    password
  };

  DATA.mockUsers.push(newUser);  
  DATA.userId = newUser._id;
  login();
}

function putUser(id, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  if($('#password').val.trim() === $('#retype-password').val().trim()) {
    setTimeout(function() { callback(DATA.mockUsers); }, 600);
  }
  pageHome();
}

function deleteUser(callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(DATA.mockUsers); }, 600);
}

function getMissions(query, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(DATA.mockMissions); }, 600);
}

function postMission(callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(DATA.mockMissions); }, 600);
}

function putMission(id, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(DATA.mockMissions); }, 600);
}

function deleteMission(id, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(DATA.mockMissions); }, 600);
}

function authenticateCredentials(data) { 
  // find user
  let user = data.find((user) => user.userName === $('#user-name').val().trim());
  // authenticate
  if (user !== undefined && user.password === $('#password').val().trim()) {    
    DATA.userId = user._id;
    login();   
  }
}

function renderSearchResults(data) {
  $('#search-results').html(decorateResults(data));
}

function login() {  
  DATA.loggedIn = true;
  pageHome(); 
}

function logout() {
  pageGallery();
}

function setUp() {
  // login();
  logout();
}

export { attachListeners, setUp };