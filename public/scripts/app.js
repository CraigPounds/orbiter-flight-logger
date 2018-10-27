'use strict';

import { decorateLoginPage, decorateHomePage, decorateSearchPage, decorateGalleryPage, decorateSignupPage, decorateProfilePage } from './utils/templates.js';
import { DATA } from './data/data.js';

function postNewUser(data, callback) {   
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

function postApiMission(data, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(data, DATA.mockMissions); }, 600);
}

function getApiMissions(data, callback) {
  const settings = {
    headers: {
      authorization: `Bearer ${DATA.authToken}`,
      data: data
    },
    url: '/missions/',
    type: 'GET',
    dataType: 'json',
    success: callback
  };
  $.ajax(settings);
}

function getApiMissionById(data, callback) {
  console.log('getApiMissionById');
  const settings = {
    headers: {
      authorization: `Bearer ${DATA.authToken}`,
    },
    url: `/missions/${data._id}`,
    type: 'GET',
    dataType: 'json',
    success: callback
  };
  $.ajax(settings).fail(function(data) {
    console.error('Location:', data.responseJSON.location);
    console.error('Message:', data.responseJSON.message);
  });
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
}

function pageLogin() {
  $('#page').html(decorateLoginPage());
}

function pageSearch() {
  $('#page').html(decorateSearchPage);
}

function pageProfile(data) {
  getApiUsers(data, cbRenderProfilePage);
}

function pageHome() {
  getApiMissions(DATA.user._id, cbRenderHomePage);  
}

function pageGallery() {
  $('#page').html(decorateGalleryPage);
}

function handleSubmitPostUser(event) {
  event.preventDefault();
  DATA.user = getUserData();
  postNewUser(DATA.user, pageLogin);
}

function handleSubmitLogin(event) {
  event.preventDefault();
  let data = {
    username: $('#user-name').val().trim(),
    password: $('#password').val().trim()
  };
  postUserLogin(data, loginUser);  
}

function loginUser(data) {
  DATA.authToken = data.authToken;
  DATA.user = data.user;
  DATA.loggedIn = true;
  pageHome();
}

function handleSubmitPutApiUser(event) {
  console.log('handleSubmitPutApiUser');
  event.preventDefault();
  if($('#password').val().trim() === $('#retype-password').val().trim()) {
    pageHome();
  }
}

function handleBtnDeleteProfile(event) {
  console.log('handleBtnDeleteProfile');
  event.preventDefault();
  const deleteProfile = prompt('Are you sure you want to delete your profile?', 'yes');
  if(deleteProfile === 'yes') {
    logout();
  }
}

function handleBtnNewMission(event) {
  console.log('handleBtnNewMission');
  event.preventDefault();
}

function handleSubmitPostApiMission(event) {
  console.log('handleSubmitPostApiMission');
  event.preventDefault();
}

function handleSubmitSearchMission(event) {
  console.log('handleSubmitSearchMission');
  event.preventDefault();
  let data = getSearchData();
  console.log(data);
  getApiMissions(data, cbRenderSearchResults);
}

function handleBtnDeleteApiMission(event) {
  console.log('handleBtnDeleteApiMission');
  event.preventDefault();
}

function handleBtnNewLog(event) {
  console.log('handleBtnNewLog');
  event.preventDefault();
}

function handlePostLog(event) {
  console.log('handlePostLog');
  event.preventDefault();
}

function handlePutLog(event) {
  console.log('handlePutLog');
  event.preventDefault();
}

function handleBtnDeleteLog(event) {
  console.log('handleBtnDeleteLog');
  event.preventDefault();
}

function handleOpenMission(event) {
  event.preventDefault();
  event.stopPropagation();
  DATA.missionIndex = getSearchItemIndex($(event.target).next()) - 1;
  $(event.target).next().slideToggle();
  console.log(DATA.missionIndex);
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

function getUserData() {
  let firstName = $('#first-name').val().trim();
  let lastName = $('#last-name').val().trim();
  let email = $('#email').val().trim();
  let userName = $('#user-name').val().trim();
  let password = $('#password').val().trim();
  return {
    firstName,
    lastName,
    email,
    userName,
    password
  };
}

function getSearchData() {
  let version = $('#select-version').val().trim();
  let os = $('#select-os').val().trim();
  let searchText = $('#search-text').val().trim();
  return {
    version,
    os,
    searchText
  };
}

function getSearchItemIndex(item) {
  let itemIndex = $(item)
    .closest('.result')
    .attr('data-index');
  return parseInt(itemIndex, 10);
}

function logout() {
  DATA.user = {};
  DATA.loggedIn = false;
  DATA.authToken = '';
  DATA.missionIndex = 0;
  DATA.mission = {};
  pageGallery();
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
  $('#page').on('submit', '.form-logger', handleSubmitPostApiMission);
  $('#page').on('submit', '.form-search', handleSubmitSearchMission);
  $('#page').on('submit', '.form-profile', handleSubmitPutApiUser);

  $('#page').on('click', '#btn-new-mission', handleBtnNewMission);

  $('#page').on('click', '.btn-delete-mission', function(event) {
    handleBtnDeleteApiMission(event);
  });
  $('#page').on('click', '.btn-new-log', function(event) {
    handleBtnNewLog(event);
  });
  $('#page').on('click', '.btn-delete-log', function(event) {
    handleBtnDeleteLog(event);
  });
  $('#page').on('click', '.btn-delete-profile', function(event) {
    handleBtnDeleteProfile(event);
  });
  $('#page').on('click', '.log-title', function(event) {
    handleOpenMission(event);
  });
}

function setUp() {
  logout();
}

export { attachListeners, setUp };