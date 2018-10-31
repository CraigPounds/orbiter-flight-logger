'use strict';

import { decorateLog, decorateMission, decorateLoginPage, decorateHomePage, decorateSearchPage, decorateGalleryPage, decorateSignupPage, decorateProfilePage } from './utils/templates.js';
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
}

function getApiUserById(data, callback) {
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
  const settings = {
    headers: {
      authorization: `Bearer ${DATA.authToken}`
    },
    url: '/missions',
    type: 'POST',
    data: JSON.stringify(data),
    dataType: 'json',
    contentType: 'application/json',
    success: callback,
  };
  $.ajax(settings).fail(function() {
    console.error('Location:', data.responseJSON.location);
    console.error('Message:', data.responseJSON.message);
  });
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
  const settings = {
    headers: {
      authorization: `Bearer ${DATA.authToken}`
    },
    url:`/missions/${data.id}`,
    type: 'PUT',
    data: JSON.stringify(data),
    dataType: 'json',
    contentType: 'application/json',
    success: callback
  };
  $.ajax(settings);
}

function deleteApiMission(data, callback) {
  const settings = {
    headers: {
      authorization: `Bearer ${DATA.authToken}`
    },
    url:`/missions/${data}`,
    type: 'DELETE',
    dataType: 'json',
    success: callback
  };
  $.ajax(settings);
}

function getApiLogs(data, callback) {
}

function getApiLogById(data, callback) {
}

function putApiLog(data, callback) {
}

function deleteApiLog(data, callback) {
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
  $('.result').hide();
  $('.results').append(decorateMission({
    logs: [{
      title: '',
      vessel: '',
      date: getDate(),
      log: ''
    }]
  }));
}

function handleBtnNewLog(event) {
  event.preventDefault();
  $(event.currentTarget).parent().siblings('.flight-logs')
    .append(decorateLog({}, 1));
}

function handleSubmitPostApiMission(event) {
  event.preventDefault();
  let data = getMissionFormData(event);
  data.user_id = DATA.user._id;
  postApiMission(data, pageHome);
}

function handleSubmitPutApiMission(event) {
  event.preventDefault();
  let data = getMissionFormData(event);
  data.id = DATA.missionIndex;  
  putApiMission(data, pageHome);
}

function handleSubmitSearchMission(event) {
  event.preventDefault();
  let data = getSearchData();
  getApiMissions(data, renderSearchResults);
}

function handleBtnDeleteApiMission(event) {
  event.preventDefault();
  const deleteMission = prompt('Are you sure you want to delete this mission?', 'yes');
  if(deleteMission === 'yes') {
    deleteApiMission(DATA.missionIndex, pageHome);
  }  
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

function handleToggleMission(event) {
  event.preventDefault();
  event.stopPropagation();
  let index = getSearchItemIndex($(event.target).next());
  if(index !== DATA.missionIndex) {
    $('.result').hide();
  }
  DATA.missionIndex = getSearchItemIndex($(event.target).next());
  $(event.target).next().slideToggle();
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

function getMissionFormData(event) {  
  let orbiterVersion = $(event.currentTarget).find('.select-version').val();
  let os = $(event.currentTarget).find('.select-os').val();
  let title = $(event.currentTarget).find('.title').val().trim();
  let logs = $(event.currentTarget).find('.log')
    .map(function() { 
      let title = $(this).find('.log-title').val();
      let vessel = $(this).find('.vessel').val();
      let date = $(this).find('.date').val();
      let log = $(this).find('.txt-log-entry').val();
      return {
        title,
        vessel,
        date,
        log
      };
    }).get();

  return {
    orbiterVersion,
    os,
    title,
    logs
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

function getDate() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;  
  let year = date.getFullYear();

  if(day < 10) {
    day = '0' + day;
  } 
  if(month < 10) {
    month ='0'+ month;
  } 
  return `${month}/${day}/${year}`;
}

function getSearchItemIndex(item) {
  let itemIndex = $(item)
    .closest('.result')
    .attr('data-index');
  return itemIndex;
}

function logout() {
  DATA.loggedIn = false;
  DATA.authToken = '';
  DATA.user = {};
  DATA.missionIndex = 0;
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
  $('#page').on('submit', '.form-profile', handleSubmitPutApiUser);
  
  $('#page').on('click', '#btn-delete-profile', handleBtnDeleteProfile);
  $('#page').on('click', '#btn-new-mission', handleBtnNewMission);
  
  $('#page').on('submit', '.form-put-mission', function(event) {
    handleSubmitPutApiMission(event);
  });

  $('#page').on('submit', '.form-post-mission', function(event) {
    handleSubmitPostApiMission(event);
  });
  $('#page').on('click', '#btn-delete-mission', function(event) {
    handleBtnDeleteApiMission(event);
  });
  $('#page').on('click', '.btn-new-log', function(event) {
    handleBtnNewLog(event);
  });
  $('#page').on('click', '.btn-delete-log', function(event) {
    handleBtnDeleteLog(event);
  });
  $('#page').on('click', '.mission-title', function(event) {
    handleToggleMission(event);
  });
}

function setUp() {
  logout();
}

export { attachListeners, setUp, getDate };