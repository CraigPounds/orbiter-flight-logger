'use strict';

import { decorateLog, decorateMission, decorateLoginPage, decorateHomePage, decorateSearchPage, decorateGalleryPage, decorateSignupPage, decorateProfilePage } from './utils/templates.js';
import { DATA } from './data/data.js';

function postApiUser(data, callback) {   
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
    alert(`${data.responseJSON.location.charAt(0).toUpperCase() + data.responseJSON.location.substr(1)} ${ data.responseJSON.message}.`);
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
    alert('Incorrect username or password.');
  });
}

function postApiUserRefresh(data, callback) {
  const settings = {
    headers: {
      authorization: `Bearer ${DATA.authToken}`
    },
    url: '/auth/refresh',
    type: 'POST',
    data: JSON.stringify(data),
    dataType: 'json',
    contentType: 'application/json',
    success: callback,	
  };
  $.ajax(settings).fail(function() {
    console.error('Incorrect password length');
  });
}

function getApiUsers(data, callback) {
  const settings = {
    headers: buildHeaders(data),
    url: '/users',
    type: 'GET',
    dataType: 'json',
    success: callback
  };
  $.ajax(settings);
}

function getApiUserById(data, callback) {
  const settings = {
    headers: {
      authorization: `Bearer ${DATA.authToken}`,
    },
    url: `/users/${data.id}`,
    type: 'GET',
    dataType: 'json',
    success: callback
  };
  $.ajax(settings).fail(function(data) {
    console.error('Location:', data.responseJSON.location);
    console.error('Message:', data.responseJSON.message);
  });
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
  $.ajax(settings).fail(function(data) {
    console.error('Location:', data.responseJSON.location);
    console.error('Message:', data.responseJSON.message);
    alert(`${data.responseJSON.location.charAt(0).toUpperCase() + data.responseJSON.location.substr(1)} ${ data.responseJSON.message}.`);
  });
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
  $.ajax(settings);
}

function buildHeaders(data) {
  let headers = { authorization: `Bearer ${DATA.authToken}` };
  if (data._id) headers._id = data._id;
  if (data.user_id) headers.user_id = data.user_id;
  if (data.mission_id) headers.mission_id = data.mission_id;
  if (data.orbiterVersion) headers.version = data.orbiterVersion;
  if (data.os) headers.os = data.os;
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
  const settings = {
    headers: {
      authorization: `Bearer ${DATA.authToken}`,
    },
    url: `/missions/${data.id}`,
    type: 'GET',
    dataType: 'json',
    success: callback
  };
  $.ajax(settings);
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
  const settings = {
    headers: buildHeaders(data),
    url: '/logs',
    type: 'GET',
    dataType: 'json',
    success: callback    
  };
  $.ajax(settings);
}

function getApiLogById(data, callback) {
  const settings = {
    headers: {
      authorizaton: `Bearer ${DATA.authToken}`,
    },
    url: `/logs/${data.id}`,
    type: 'GET',
    dataType: 'json',
    success: callback
  };
  $.ajax(settings);
}

function postApiLog(data, callback) {
  const settings = {
    headers: {
      authorization: `Bearer ${DATA.authToken}`
    },
    url: '/logs',
    type: 'POST',
    data: JSON.stringify(data),
    dataType: 'json',
    contentType: 'application/json',
    success: callback,
  };
  $.ajax(settings);
}

function putApiLog(data, callback) {
  const settings = {
    headers: {
      authorization: `Bearer ${DATA.authToken}`
    },
    url:`/logs/${data.id}`,
    type: 'PUT',
    data: JSON.stringify(data),
    dataType: 'json',
    contentType: 'application/json',
    success: callback
  };
  $.ajax(settings);
}

function deleteApiLog(data, callback) {
  const settings = {
    headers: buildHeaders(data),
    url:`/logs/${data.user_id}`,
    type: 'DELETE',
    dataType: 'json',
    success: callback
  };
  $.ajax(settings);
}

function handleSubmitPostUser(event) {
  event.preventDefault();
  if ($('#password').val().trim() === $('#retype-password').val().trim()) {
    DATA.user = getUserFormData();
    postApiUser(DATA.user, renderPageLogin);
  } else {
    alert('Passwords must match.');
  }
}

function handleSubmitLogin(event) {
  event.preventDefault();
  let data = {
    username: $('#user-name').val().trim(),
    password: $('#password').val().trim()
  };
  DATA.user = data;
  postApiUserLogin(data, loginUser);
}

function handleSubmitPutApiUser(event) {
  event.preventDefault();

  if ($('#password').val().trim() === $('#retype-password').val().trim()) {
    let data = getUserFormData();
    data.id = DATA.user._id;
    DATA.user = data;
    postApiUserRefresh(data, refreshCb);
    putApiUser(data, renderPageLogin);
  } else {
    alert('Passwords must match.');
  }
}

function refreshCb(data) {
  DATA.authToken = data.authToken;
  Object.assign(DATA.user, data.user);
}

function handleBtnDeleteProfile(event) {
  event.preventDefault();
  const DELETE_PROFILE = prompt('Are you sure you want to delete your profile?', 'yes');
  if (DELETE_PROFILE === 'yes' && $('#password').val().trim() === $('#retype-password').val().trim() && $('#password').val().trim() === DATA.user.password) {
    deleteApiUser(DATA.user._id);
    deleteApiLog({ user_id: DATA.user._id }, logout);
  } else {
    alert('Correct password required.');
  }
}

function handleBtnNewMission(event) {
  event.preventDefault();
  $('.result').hide();
  $('#btn-new-mission').hide();
  DATA.dataSaved = false;
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
  DATA.dataSaved = false;
  $(event.currentTarget).hide();
  $(event.currentTarget).closest('.form-put-mission').attr('class','form-put-post-log');
  $(event.currentTarget).parent().siblings('.flight-logs')
    .append(decorateLog({
      title: '',
      vessel: '',
      date: getDate(),
      log: ''
    }, 1));  
}

function handleSubmitPostApiMission(event) {
  event.preventDefault();
  getMissionFormData(event);
  DATA.formData.user_id = DATA.user._id;
  postApiMission(DATA.formData, handlePostApiLog);
}

function handleSubmitPutApiMission(event) {
  event.preventDefault();
  getMissionFormData(event);
  DATA.formData.id = DATA.missionIndex;
  putApiMission(DATA.formData, handlePutApiLog);
  pageHome();
}

function buildLogData(data, i) {
  return {
    id: DATA.formData.logs[i].id,
    user_id: data.user_id,
    mission_id: data._id,
    title: DATA.formData.logs[i].title,
    vessel: DATA.formData.logs[i].vessel,
    date:  DATA.formData.logs[i].date,
    log: DATA.formData.logs[i].log
  };
}

function handlePostApiLog(data) {
  postApiLog(buildLogData(data, 0), pageHome);
}

function handlePutApiLog(data) {
  for (let i = 0; i < DATA.formData.logs.length; i++)  {
    let logVal = buildLogData({      
      user_id: DATA.user._id,
      _id: data._id
    }, i);
    putApiLog(logVal);
  }
}

function handleBtnPutPostLog(event) {
  event.preventDefault();
  getMissionFormData(event);
  DATA.formData.id = DATA.missionIndex;
  let log =  DATA.formData.logs.pop();
  log.user_id = DATA.user._id;
  log.mission_id = DATA.missionIndex;
  putApiMission(DATA.formData, handlePutApiLog);
  postApiLog(log, pageHome);
}

function handleSubmitSearchMission(event) {
  event.preventDefault();
  let data = getSearchData();
  getApiMissions(data, renderSearchResults);
}

function handleBtnDeleteApiMission(event) {
  event.preventDefault();
  const DELETE_MISSION = prompt('Are you sure you want to delete this mission?', 'yes');
  if(DELETE_MISSION === 'yes') {
    deleteApiMission(DATA.missionIndex, pageHome);
  }
}

function handleBtnDeleteApiLog(event) {
  event.preventDefault();
  let dataIndex = $(event.currentTarget).closest('.log').attr('data-index');
  const DELETE_LOG = prompt('Are you sure you want to delete this log?', 'yes');

  if (DELETE_LOG === 'yes') {
    deleteApiLog({ _id: dataIndex }, pageHome);
  }
}

function handleToggleMission(event) {
  event.preventDefault();
  event.stopPropagation();
  let index = getSearchItemIndex($(event.target).next());
  if (index !== DATA.missionIndex) {

    $('.result').hide();
  }
  DATA.missionIndex = getSearchItemIndex($(event.target).next());
  $(event.target).next().slideToggle();
}

function getSearchItemIndex(item) {
  let itemIndex = $(item)
    .closest('.result')
    .attr('data-index');
  return itemIndex;
}

function renderPageLogin(data) {
  $('#page').html(decorateLoginPage(data));
}

function renderPageSignUp() {
  $('#page').html(decorateSignupPage);
}

function renderProfilePage(data) {
  $('#page').html(decorateProfilePage(data));
}

function renderHomePage(data) {
  DATA.missions = data.missions;
  DATA.missions.forEach(mission => mission.logs = []);  
  getApiLogs({ user_id: DATA.user._id }, decorateUserMissionsResponse);
}

function decorateUserMissionsResponse(data) {
  data.logs.forEach((log) => {
    DATA.missions.forEach((mission) => {
      if(mission._id === log.mission_id) {
        mission.logs.push(log);
      }
    });
  });
  $('#page').html(decorateHomePage());
}

function renderPageSearch() {
  $('#page').html(decorateSearchPage);
}

function renderSearchResults(data) {
  if (data.missions.length < 1) {
    alert('Search yeilds no results.');
    renderPageSearch();
  } else {
    DATA.missions = data.missions;
    DATA.missions.forEach((mission) => {
      mission.logs = [];
      getApiLogs({ mission_id: mission._id }, decorateSearchResponse);
    });
  }
}

function decorateSearchResponse(data) {
  data.logs.forEach((log) => {
    DATA.missions.forEach((mission) => {

      if (mission._id === log.mission_id) mission.logs.push(log);
    });
  });
  $('#page').html(decorateSearchPage(DATA));
}

function renderPageGallery() {
  $('#page').html(decorateGalleryPage);
}

function pageHome() {
  DATA.dataSaved = true;
  getApiMissions({ user_id: DATA.user._id }, renderHomePage);
}

function getUserFormData() {
  let firstName = $('#first-name').val().trim();
  let lastName = $('#last-name').val().trim();
  let email = $('#email').val().trim();
  let username = $('#user-name').val().trim();
  let password = $('#password').val().trim();
  return {
    firstName,
    lastName,
    email,
    username,
    password
  };
}

function getMissionFormData(event) {  
  let orbiterVersion = $(event.currentTarget).find('.select-version').val();
  let os = $(event.currentTarget).find('.select-os').val();
  let title = $(event.currentTarget).find('.title').val().trim();
  let logs = $(event.currentTarget).find('.log')
    .map(function() { 
      let id = $(this).closest('.log').attr('data-index');
      let title = $(this).find('.log-title').val();
      let vessel = $(this).find('.vessel').val();
      let date = $(this).find('.date').val();
      let log = $(this).find('.txt-log-entry').val();
      return {
        id,
        title,
        vessel,
        date,
        log
      };
    }).get();

  DATA.formData = {
    orbiterVersion,
    os,
    title,
    logs
  };
}

function getSearchData() {
  let orbiterVersion = $('#select-version').val().trim();
  let os = $('#select-os').val().trim();
  DATA.searchText = $('#search-text').val().trim();
  return {
    orbiterVersion,
    os
  };
}

function getDate() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;  
  let year = date.getFullYear();

  if (day < 10) {
    day = '0' + day;
  } 
  if (month < 10) {
    month ='0'+ month;
  } 
  return `${month}/${day}/${year}`;
}

function logoutPrompt() {
  const LOG_OUT = prompt('Are you sure you want to log out?', 'yes');
  if (LOG_OUT === 'yes') {
    logout();
  }  
}

function logout() {
  DATA.loggedIn = false;
  DATA.saved = true;
  DATA.authToken = '';
  DATA.user = {};
  DATA.missionIndex = '';
  DATA.missions = [];
  renderPageGallery();
}

function loginUser(data) {
  DATA.loggedIn = true;
  DATA.authToken = data.authToken;
  Object.assign(DATA.user, data.user);
  pageHome();
}

function preloadImages() {
  DATA.preloadImg = [];
  DATA.images.forEach(image => {
    var img = new Image();
    img.src = image.src;
    DATA.preloadImg.push(img);
  });
}

function attachListeners() {
  $('#page').on('click', '#nav-signup', renderPageSignUp);
  $('#page').on('click', '#nav-login', renderPageLogin);
  $('#page').on('click', '#nav-search', renderPageSearch);
  $('#page').on('click', '#nav-profile', renderProfilePage);
  $('#page').on('click', '#nav-gallery', renderPageGallery);
  $('#page').on('click', '#nav-home', pageHome);
  $('#page').on('click', '#nav-logout',  logoutPrompt);

  $('#page').on('submit', '.form-signup', handleSubmitPostUser);
  $('#page').on('submit', '.form-login', handleSubmitLogin);
  $('#page').on('submit', '.form-search', handleSubmitSearchMission);
  $('#page').on('submit', '.form-profile', handleSubmitPutApiUser);
  
  $('#page').on('click', '#btn-delete-profile', handleBtnDeleteProfile);
  $('#page').on('click', '#btn-new-mission', handleBtnNewMission);
  
  $('#page').on('click', '.btn-mission-title', function(event) {
    handleToggleMission(event);
  });
  $('#page').on('submit', '.form-post-mission', function(event) {
    handleSubmitPostApiMission(event);
  });
  $('#page').on('submit', '.form-put-mission', function(event) {
    handleSubmitPutApiMission(event);
  });
  $('#page').on('submit', '.form-put-post-log', function(event) {    
    handleBtnPutPostLog(event);
  });
  $('#page').on('click', '#btn-delete-mission', function(event) {
    handleBtnDeleteApiMission(event);
  });
  $('#page').on('click', '#btn-new-log', function(event) {
    handleBtnNewLog(event);
  });
  $('#page').on('click', '.btn-delete-log', function(event) {
    handleBtnDeleteApiLog(event);
  });  
}

function setUp() {
  logout();
  preloadImages();
}

export { attachListeners, setUp, getSearchData };