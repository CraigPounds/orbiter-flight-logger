'use strict';

import { decorateLoginPage, decorateHomePage, decorateSearchPage, decorateGalleryPage, decorateSignupPage, decorateProfilePage } from './utils/templates.js';
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
  $('#page').on('submit', '.form-home', submitNewMission);
  $('#page').on('submit', '.form-logger', submitSaveMission);
  $('#page').on('submit', '.form-search', submitSearch);
  $('#page').on('submit', '.form-signup', submitSignup);
  $('#page').on('submit', '.form-profile', submitProfile);

  $('#page').on('click', '#btn-new-log', btnNewLog);
  $('#page').on('click', '#btn-delete-profile', btnDelete);
}

function pageLogin() {
  $('#page').html(decorateLoginPage);
}

function pageHome() {
  let query = buildQuery();
  getMissions(query, cbRenderHomePage);
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
  getUsers(cbRenderProfilePage);
}

function submitLogin(event) {
  event.preventDefault();
  getUsers(cbAuthenticateUser);
}

function submitNewMission(event) {
  event.preventDefault();
  console.log('submitNewMission ran');
}

function submitSaveMission(event) {
  event.preventDefault();
  console.log('submitSaveMission ran');
}

function submitSearch(event) {
  event.preventDefault();
  let query = buildQuery();
  getMissions(query, cbRenderSearchResults);
}

function submitSignup(event) {
  event.preventDefault();
  postUser(cbAddUser);
  login();
}

function submitProfile(event) {
  event.preventDefault();
  if($('#password').val().trim() === $('#retype-password').val().trim()) {
    putUser(DATA.userId, cbEditUserProfile);
    pageHome();
  }
}

function btnNewLog(event) {
  event.preventDefault();
  console.log('btnNewLog ran');
}

function btnDelete(event) {
  event.preventDefault();
  const deleteProfile = prompt('Are you sure you want to delete your profile?', 'yes');
  if(deleteProfile === 'yes') {
    deleteUser(DATA.userId, cbDeleteUserProfile);
    logout();
  }
}

function buildQuery() {
}

function getUsers(callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(DATA.mockUsers); }, 600);
}

function postUser(callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(DATA.mockUsers); }, 600);  
}

function putUser(id, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(id, DATA.mockUsers); }, 600);  
}

function deleteUser(id, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(id, DATA.mockUsers); }, 600);
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

function cbAddUser(data) {  
  let password = $('#password').val().trim();
  let firstName = $('#first-name').val().trim();
  let lastName = $('#last-name').val().trim();
  let email = $('#email').val().trim();
  let userName = $('#user-name').val().trim();
  let _id = `${userName}${Date.now()}`;    
  let newUser = {
    _id,
    firstName,
    lastName,
    email,
    userName,
    password
  };
  data.push(newUser);  
  DATA.userId = newUser._id;  
  DATA.userName = newUser.userName;
}

function cbAuthenticateUser(data) { 
  let user = data.find((user) => user.userName === $('#user-name').val().trim());

  if (user !== undefined && user.password === $('#password').val().trim()) {    
    DATA.userId = user._id;
    DATA.userName = user.userName;
    login();
  }
}

function cbDeleteUserProfile(id, data) {
  let index = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i]._id === id) {
      index = i;
      i = data.length;
    }
  }
  data.splice(index, 1);
}

function cbEditUserProfile(id, data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i]._id === id) {
      let firstName = $('#first-name').val().trim();
      let lastName = $('#last-name').val().trim();
      // let email = $('#email').val().trim();
      let userName = $('#user-name').val().trim();
      let password = $('#password').val().trim();
      data[i].firstName = firstName;
      data[i].lastName = lastName;
      data[i].userName = userName;
      // data[i].email = email;
      data[i].password = password;
      DATA.userName = userName;
    }
  }
}

function cbRenderHomePage(data) {
  $('#page').html(decorateHomePage(data)); 
}

function cbRenderProfilePage(data) {
  $('#page').html(decorateProfilePage(data.find((user => user._id === DATA.userId))));
}

function cbRenderSearchResults(data) {
  $('#page').html(decorateSearchPage(data));
}

function login() {  
  DATA.loggedIn = true;
  pageHome(); 
}

function logout() {
  DATA.loggedIn = false;
  DATA.userId = '';
  DATA.userName = '';
  pageGallery();
}

function setUp() {
  // login();
  logout();
}

export { attachListeners, setUp };