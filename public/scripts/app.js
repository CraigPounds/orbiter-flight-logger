'use strict';

import { decorateLoginPage, decorateHomePage, decorateSearchPage, decorateGalleryPage, decorateSignupPage, decorateProfilePage } from './utils/templates.js';
import { DATA } from './data/data.js';

function attachListeners() {
  $('#page').on('click', '#nav-login', pageLogin);
  $('#page').on('click', '#nav-home', pageHome);
  $('#page').on('click', '#nav-search', pageSearch);
  $('#page').on('click', '#nav-gallery', pageGallery);
  $('#page').on('click', '#nav-signup', pageSignup);
  $('#page').on('click', '#nav-profile', pageProfile);
  $('#page').on('click', '#nav-logout',  logout);

  $('#page').on('submit', '.form-signup', handleSubmitSignUp);
  $('#page').on('submit', '.form-login', handleSubmitLogin);
  $('#page').on('submit', '.form-logger', handleSubmitSaveMission);
  $('#page').on('submit', '.form-search', handleSubmitSearch);
  $('#page').on('submit', '.form-profile', handleSubmitProfile);

  $('#page').on('click', '#btn-new-mission', handleBtnNewMission);
  $('#page').on('click', '#btn-delete-mission', handleBtnDeleteMission);
  $('#page').on('click', '#btn-new-log', handleBtnNewLog);
  $('#page').on('click', '#btn-delete-log', handleBtnDeleteLog);
  $('#page').on('click', '#btn-delete-profile', handleBtnDeleteProfile);
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

function handleSubmitLogin(event) {
  event.preventDefault();
  getUsers(cbAuthenticateLogin);
}

function handleSubmitSaveMission(event) {
  event.preventDefault();
  console.log('handleSubmitSaveMission ran');
}

function handleSubmitSearch(event) {
  event.preventDefault();
  let query = buildQuery();
  getMissions(query, cbRenderSearchResults);
}

function handleSubmitSignUp(event) {
  event.preventDefault();
  // getUsers(cbAuthenticateNewUser);  
}

function handleSubmitProfile(event) {
  event.preventDefault();
  if($('#password').val().trim() === $('#retype-password').val().trim()) {
    putUser(DATA.userId, cbEditUserProfile);
    pageHome();
  }
}

function handleBtnNewMission(event) {
  event.preventDefault();
  console.log('handleBtnNewMission ran');
}

function handleBtnDeleteMission(event) {
  event.preventDefault();
  console.log('handleBtnDeleteMission ran');
}

function handleBtnNewLog(event) {
  event.preventDefault();
  console.log('handleBtnNewLog ran');
}


function handleBtnDeleteLog(event) {
  event.preventDefault();
  console.log('handleBtnDeleteLog ran');
}

function handleBtnDeleteProfile(event) {
  event.preventDefault();
  const deleteProfile = prompt('Are you sure you want to delete your profile?', 'yes');
  if(deleteProfile === 'yes') {
    deleteUser(DATA.userId, cbDeleteUserProfile);
    logout();
  }
}

function buildQuery() {
}

function postUser(callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(DATA.mockUsers); }, 600);  
}

function getUsers(callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(DATA.mockUsers); }, 600);
  // const settings = {
  //   url: '/users',
  //   // data: {
  //   //   q: searchTerm,
  //   //   part: 'snippet',
  //   //   key: DATA.API_KEY,
  //   // },
  //   dataType: 'json',
  //   type: 'GET',
  //   success: callback,
  // };
  // $.ajax(settings);
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
  setTimeout(function() { callback(DATA.mockMissions); }, 600);
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

function cbAddUser(data) {
  let firstName = $('#first-name').val().trim();
  let lastName = $('#last-name').val().trim();
  let email = $('#email').val().trim();
  let userName = $('#user-name').val().trim();
  let password = $('#password').val().trim();
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
  login();
  // console.log('DATA', data);
}

function cbAuthenticateNewUser(data) {  
  let notTaken = true;
  let userName = $('#user-name').val().trim();
  
  for (let d in data) {
    if (data[d].userName === userName) {
      notTaken = false;
    }       
  }
  if (notTaken) {
    postUser(cbAddUser);
  }
}

function cbAuthenticateLogin(data) { 
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
  // DATA.userId = '5af50c84c082f1e92f83420d';
  // DATA.userName = 'napes';
  // login();
  // logout();
  pageGallery();
  console.log(DATA);
}

export { attachListeners, setUp };