'use strict';

import { decorateLoginPage, decorateHomePage, decorateSearchPage, decorateGalleryPage, decorateSignupPage, decorateProfilePage } from './utils/templates.js';
import { DATA } from './data/data.js';

function postUser(data, callback) {
   
  const settings = {
    url: '/users/',
    type: 'POST',
    data: JSON.stringify(data),
    dataType: 'json',
    contentType: 'application/json',
    success: callback
  };
  $.ajax(settings).fail(function(data) {
    console.error('location', data.responseJSON.location);
    console.error('message', data.responseJSON.message);    
  });  
  login(data);
}

function getUsers(callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(DATA.mockUsers); }, 600); 
}

function getUserById(id, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(id, DATA.mockUsers); }, 600);  
}

function putUser(id, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(id, DATA.mockUsers); }, 600);  
}

function deleteUser(id, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(id, DATA.mockUsers); }, 600);
}

function postMission(callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(DATA.mockMissions); }, 600);
}

function getMissions(query, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(DATA); }, 600);
}

function getMissionById(query, callback) {
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

function getLogs(query, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(DATA.mockMissions); }, 600);
}

function getLogById(query, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(DATA.mockMissions); }, 600);
}

function putLog(id, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(DATA.mockMissions); }, 600);
}

function deleteLog(id, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(DATA.mockMissions); }, 600);
}

function pageSignup() {
  $('#page').html(decorateSignupPage);
}

function pageLogin() {
  $('#page').html(decorateLoginPage);
}

function pageSearch() {
  $('#page').html(decorateSearchPage);  
}

function pageProfile() {
  getUsers(cbRenderProfilePage);
}

function pageHome() {
  console.log('pageHome ran');
  let query = 'someQuery';
  getMissions(query, cbRenderHomePage);
}

function pageGallery() {
  console.log('decorateGalleryPage ran');
  $('#page').html(decorateGalleryPage);
}


function handleSubmitPostUser(event) {
  console.log('handleSubmitPostUser ran');
  event.preventDefault();
  let data = returnFormData();
  postUser(data, pageHome);
}

function handleSubmitLogin(event) {
  event.preventDefault();
  getUsers(cbAuthenticateLogin);
}

function handleSubmitPutUser(event) {
  event.preventDefault();
  if($('#password').val().trim() === $('#retype-password').val().trim()) {
    putUser(DATA.userId, cbEditUserProfile);
    pageHome();
  }
}

function handleBtnDeleteProfile(event) {
  event.preventDefault();
  const deleteProfile = prompt('Are you sure you want to delete your profile?', 'yes');
  if(deleteProfile === 'yes') {
    deleteUser(DATA.userId, cbDeleteUserProfile);
    logout();
  }
}


function handleBtnNewMission(event) {
  event.preventDefault();
  console.log('handleBtnNewMission ran');
}

function handleSubmitPostMission(event) {
  event.preventDefault();
  console.log('handleSubmitPostMission ran');
}

function handleSubmitGetMission(event) {
  event.preventDefault();
  let query = 'someQuery';
  getMissions(query, cbRenderSearchResults);
}

function handleBtnDeleteMission(event) {
  event.preventDefault();
  console.log('handleBtnDeleteMission ran');
}



function handleBtnNewLog(event) {
  event.preventDefault();
  console.log('handleBtnNewLog ran');
}

function handlePostLog(event) {
  event.preventDefault();
  console.log('handleBtnNewLog ran');
}

function handlePutLog(event) {
  event.preventDefault();
  console.log('handleBtnNewLog ran');
}

function handleBtnDeleteLog(event) {
  event.preventDefault();
  console.log('handleBtnDeleteLog ran');
}

function returnFormData() {
  let firstName = $('#first-name').val().trim();
  let lastName = $('#last-name').val().trim();
  let email = $('#email').val().trim();
  let userName = $('#user-name').val().trim();
  let password = $('#password').val().trim();
  let _id = `${userName}${Date.now()}`;    
  let user = {
    _id,
    firstName,
    lastName,
    email,
    userName,
    password
  };
  return user;
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

function cbRenderProfilePage(data) {
  $('#page').html(decorateProfilePage(data.find((user => user._id === DATA.userId))));
}

function cbRenderHomePage(data) {
  $('#page').html(decorateHomePage(data)); 
}

function cbRenderSearchResults(data) {
  $('#page').html(decorateSearchPage(data));
}

function attachListeners() {
  $('#page').on('click', '#nav-signup', pageSignup);
  $('#page').on('click', '#nav-login', pageLogin);
  $('#page').on('click', '#nav-search', pageSearch);
  $('#page').on('click', '#nav-profile', pageProfile);
  $('#page').on('click', '#nav-home', pageHome);
  $('#page').on('click', '#nav-gallery', pageGallery);
  $('#page').on('click', '#nav-logout',  logout);

  $('#page').on('submit', '.form-signup', handleSubmitPostUser);
  $('#page').on('submit', '.form-login', handleSubmitLogin);
  $('#page').on('submit', '.form-logger', handleSubmitPostMission);
  $('#page').on('submit', '.form-search', handleSubmitGetMission);
  $('#page').on('submit', '.form-profile', handleSubmitPutUser);

  $('#page').on('click', '#btn-new-mission', handleBtnNewMission);
  $('#page').on('click', '#btn-delete-mission', handleBtnDeleteMission);
  $('#page').on('click', '#btn-new-log', handleBtnNewLog);
  $('#page').on('click', '#btn-delete-log', handleBtnDeleteLog);
  $('#page').on('click', '#btn-delete-profile', handleBtnDeleteProfile);
}

function login(data) {
  DATA.userId = data._id;
  DATA.userName = data.userName;
  DATA.loggedIn = true;
}

function logout() {
  DATA.loggedIn = false;
  DATA.userId = '';
  DATA.userName = '';
  pageGallery();
}

function setUp() {
  pageGallery();
}

export { attachListeners, setUp };