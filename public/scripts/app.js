'use strict';

import { decorateMission, decorateLoginPage, decorateHomePage, decorateSearchPage, decorateGalleryPage, decorateSignupPage, decorateProfilePage } from './utils/templates.js';
import { DATA } from './data/data.js';

function postApiNewUser(data, callback) {   
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

function postApiUserLogin(data, callback) {
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
  const settings = {    
    headers: {
      authorization: `Bearer ${DATA.authToken}`
    },
    url: `/users/${data.id}`,
    type: 'PUT',
    data: JSON.stringify(data),
    dataType: 'json',
    contentType: 'application/json',
    success: callback
  };
  $.ajax(settings);
}

function deleteApiUser(data, callback) {
  const settings = {
    headers: {
      authorization: `Bearer ${DATA.authToken}`
    },
    url: `/users/${data}`,
    type: 'DELETE',
    dataType: 'json',
    success: callback
  };
  $.ajax(settings);
}

function postApiMission(data, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(data, DATA.mockMissions); }, 600);
}

function buildHeaders(data) {
  let headers = { authorization: `Bearer ${DATA.authToken}` };
  if(data.user_id) headers.user_id = data.user_id;
  if(data.orbiterVersion) headers.version = data.orbiterVersion;
  if(data.os) headers.os = data.os;
  return headers;
}

function getApiMissions(data, callback) {
  const settings = {
    headers: buildHeaders(data),
    url: '/missions',
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
    url: `/missions/${data.id}`,
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

function handleSubmitPostUser(event) {
  event.preventDefault();
  DATA.user = getUserFormData();
  postApiNewUser(DATA.user, renderPageLogin);
}

function handleSubmitLogin(event) {
  event.preventDefault();
  let data = {
    username: $('#user-name').val().trim(),
    password: $('#password').val().trim()
  };
  postApiUserLogin(data, loginUser);  
}

function loginUser(data) {
  DATA.authToken = data.authToken;
  DATA.user = data.user;
  DATA.loggedIn = true;
  pageHome();
}

function handleSubmitPutApiUser(event) {
  event.preventDefault();
  if($('#password').val().trim() === $('#retype-password').val().trim()) {
    let data = getUserFormData();
    data.id = DATA.user._id;
    DATA.user = data;
    // putApiUser(data, renderProfilePage);
    putApiUser(data, logout);
  }
}

function handleBtnDeleteProfile(event) {
  event.preventDefault();
  const deleteProfile = prompt('Are you sure you want to delete your profile?', 'yes');
  if(deleteProfile === 'yes') {
    deleteApiUser(DATA.user._id, logout);
  }
}

function handleBtnNewMission(event) {
  event.preventDefault();
  DATA.missionIndex = $('.mission-title' ).length;
  $('.result').hide();
  $('.results').append(decorateMission({}, DATA.missionIndex));
  // $(`[data-index="${DATA.missionIndex}]`).focus();
}

function handleSubmitPostApiMission(event) {
  console.log('handleSubmitPostApiMission');
  event.preventDefault();
  let data = '5bd534f4fa8afb074872251f';
  postApiMission(data, renderHomePage);
}

function handleSubmitSearchMission(event) {
  event.preventDefault();
  let data = getSearchData();
  getApiMissions(data, renderSearchResults);
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
  // console.log(DATA.missionIndex);
}

function renderPageLogin() {
  $('#page').html(decorateLoginPage());
}

function renderPageSignUp() {
  $('#page').html(decorateSignupPage);
}

function renderProfilePage(data) {
  $('#page').html(decorateProfilePage(data));
}
function renderHomePage(data) {
  $('#page').html(decorateHomePage(data)); 
}

function renderPageSearch() {
  $('#page').html(decorateSearchPage);
}

function renderSearchResults(data) {
  $('#page').html(decorateSearchPage(data));
}

function renderPageGallery() {
  $('#page').html(decorateGalleryPage);
}

function pageHome() {
  getApiMissions({ user_id: DATA.user._id }, renderHomePage);
}

function getUserFormData() {
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
  let orbiterVersion = $('#select-version').val().trim();
  let os = $('#select-os').val().trim();
  let searchText = $('#search-text').val().trim();
  return {
    orbiterVersion,
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
  renderPageGallery();
}

function attachListeners() {
  $('#page').on('click', '#nav-signup', renderPageSignUp);
  $('#page').on('click', '#nav-login', renderPageLogin);
  $('#page').on('click', '#nav-search', renderPageSearch);
  $('#page').on('click', '#nav-profile', renderProfilePage);
  $('#page').on('click', '#nav-gallery', renderPageGallery);
  $('#page').on('click', '#nav-home', pageHome);
  $('#page').on('click', '#nav-logout',  logout);

  $('#page').on('submit', '.form-signup', handleSubmitPostUser);
  $('#page').on('submit', '.form-login', handleSubmitLogin);
  $('#page').on('submit', '.form-search', handleSubmitSearchMission);
  $('#page').on('submit', '.form-logger', handleSubmitPostApiMission);
  $('#page').on('submit', '.form-profile', handleSubmitPutApiUser);
  
  $('#page').on('click', '#btn-delete-profile', handleBtnDeleteProfile);
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
  $('#page').on('click', '.mission-title', function(event) {
    handleOpenMission(event);
  });
}

function setUp() {
  logout();
}

export { attachListeners, setUp };