'use strict';

import { decorateLoginPage, decorateHomePage, decorateSearchPage, decorateGalleryPage, decorateSignupPage, decorateProfilePage } from './utils/templates.js';
import { DATA } from './data/data.js';

function postUser(data, callback) {
   
  const settings = {
    url: '/users',
    type: 'POST',
    data: JSON.stringify(data),
    dataType: 'json',
    contentType: 'application/json',
    success: callback
  };
  $.ajax(settings).fail(function(data) {
    console.error('Location:', data.responseJSON.location);
    console.error('Message:', data.responseJSON.message);    
  });  
  // login(data);
}

function postUserLogin(data, callback) {
  const settings = {
    url: '/auth/login',
    type: 'POST',
    data: JSON.stringify(data),
    dataType: 'json',
    contentType: 'application/json',
    success: callback,	
  };
  $.ajax(settings).fail(function() {
    console.error('Incorrect username or password');
  });
}

function getApiUsers(data, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(data, DATA.mockUsers); }, 600); 
}

function getApiUserById(data, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(data, DATA.mockUsers); }, 600);  
}

function putApiUser(data, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(data, DATA.mockUsers); }, 600);  
}

function deleteApiUser(data, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(data, DATA.mockUsers); }, 600);
}

function postApiMissiion(data, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(data, DATA.mockMissions); }, 600);
}

function getApiMissions(data, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(data, DATA.mockMissions); }, 600);
}

function getApiMissionById(data, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(data, DATA.mockMissions); }, 600);
}

function putApiMission(data, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(data, DATA.mockMissions); }, 600);
}

function deleteApiMission(data, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(data, DATA.mockMissions); }, 600);
}

function getApiLogs(data, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(data, DATA.mockMissions); }, 600);
}

function getApiLogById(data, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(data, DATA.mockMissions); }, 600);
}

function putApiLog(data, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(data, DATA.mockMissions); }, 600);
}

function deleteApiLog(data, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(data, DATA.mockMissions); }, 600);
}

function pageSignup() {
  $('#page').html(decorateSignupPage);
  console.log('decorateSignupPage ran');
}

function pageLogin() {
  $('#page').html(decorateLoginPage);
  console.log('decorateLoginPage ran');
}

function pageSearch() {
  $('#page').html(decorateSearchPage);  
  console.log('decorateSearchPage ran');
}

function pageProfile(data) {
  // console.log('pppppppppppppppppppppppppppppppppppppppageProfile ddata', data);
  getApiUsers(data, cbRenderProfilePage);
  console.log('cbRenderProfilePage ran');
}

function pageHome(data) {
  // console.log('pppppppppppppppppppppppppppppppppageHome data', data);
  // console.log('pppppppppppppppppppppppppppppppppageHome DATA.user', DATA.user);
  getApiMissions(data, cbRenderHomePage);
  console.log('cbRenderHomePage ran');
}

function pageGallery() {
  console.log('decorateGalleryPage ran');
  $('#page').html(decorateGalleryPage);
}

function handleSubmitPostUser(event) {
  event.preventDefault();
  console.log('handleSubmitPostUser ran');
  // DATA.authToken = data.authToken;
  // DATA.user_id = data.user.id;
  // DATA.admin = data.user.admin;
  DATA.user = returnFormData();
  DATA.loggedIn = true;
  postUser(DATA.user, pageHome);
}

function handleSubmitLogin(event) {
  event.preventDefault();
  console.log('handleSubmitLogin ran');
  let data = {
    userName: $('#user-name').val().trim(),
    password: $('#password').val().trim()
  };
  postUserLogin(data, pageHome);
}

function handleSubmitPutApiUser(event) {
  event.preventDefault();
  console.log('handleSubmitPutApiUser ran');
  if($('#password').val().trim() === $('#retype-password').val().trim()) {
    putApiUser(DATA.userId, cbEditUserProfile);
    pageHome();
  }
}

function handleBtnDeleteProfile(event) {
  event.preventDefault();
  console.log('handleBtnDeleteProfile ran');
  const deleteProfile = prompt('Are you sure you want to delete your profile?', 'yes');
  if(deleteProfile === 'yes') {
    logout();
  }
}


function handleBtnNewMission(event) {
  event.preventDefault();
  console.log('handleBtnNewMission ran');
}

function handleSubmitpostApiMissiion(event) {
  event.preventDefault();
  console.log('handleSubmitpostApiMissiion ran');
}

function handleSubmitGetMission(event) {
  event.preventDefault();
  console.log('handleSubmitGetMission ran');
  let query = 'someQuery';
  getApiMissions(query, cbRenderSearchResults);
}

function handleBtndeleteApiMission(event) {
  event.preventDefault();
  console.log('handleBtndeleteApiMission ran');
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
  let user = {
    firstName,
    lastName,
    email,
    userName,
    password
  };
  return user;
}

function cbRenderProfilePage(data) {
  $('#page').html(decorateProfilePage(data));
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
  $('#page').on('submit', '.form-logger', handleSubmitpostApiMissiion);
  $('#page').on('submit', '.form-search', handleSubmitGetMission);
  $('#page').on('submit', '.form-profile', handleSubmitPutApiUser);

  $('#page').on('click', '#btn-new-mission', handleBtnNewMission);
  $('#page').on('click', '#btn-delete-mission', handleBtndeleteApiMission);
  $('#page').on('click', '#btn-new-log', handleBtnNewLog);
  $('#page').on('click', '#btn-delete-log', handleBtnDeleteLog);
  $('#page').on('click', '#btn-delete-profile', handleBtnDeleteProfile);
}

function logout() {
  DATA.loggedIn = false;
  DATA.user_id = '';
  DATA.admin = '';
  DATA.authToken = '';
  DATA.user = {};
  pageGallery();
}

function setUp() {
  logout();
}

export { attachListeners, setUp };