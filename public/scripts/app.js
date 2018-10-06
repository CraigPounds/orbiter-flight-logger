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

  $('#page').on('click', '#delete-profile', btnDelete);
}

function pageLogin() {
  $('#page').html(decorateLoginPage);
}

function pageHome() {
  // $('#page').html(decorateHomePage);
  getUsers(cbRenderHomePage);
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

function submitMission() {
  event.preventDefault();
  console.log('submitMission ran');
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
    // putUser();
    pageHome();
  }
}

function btnDelete() {
  const deleteProfile = prompt('Are you sure you want to delete your profile?', 'yes');
  if(deleteProfile === 'yes') {
    deleteUser(DATA.userId, cbRemoveUserProfile);
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
  setTimeout(function() { callback(DATA.mockUsers); }, 600);  
}

function deleteUser(id, callback) {
  // using `setTimeout` to simulate asynchronous like AJAX
  setTimeout(function() { callback(id,DATA.mockUsers); }, 600);
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
  let firstName = $('#first-name').val().trim();
  let lastName = $('#last-name').val().trim();
  let email = $('#email').val().trim();
  let userName = $('#user-name').val().trim();
  let password = $('#password').val().trim();
  let retypedPassword = $('#retype-password').val().trim();
  let _id = userName + '0001';
  
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
}

function cbAuthenticateUser(data) { 
  // find user
  let user = data.find((user) => user.userName === $('#user-name').val().trim());
  // authenticate
  if (user !== undefined && user.password === $('#password').val().trim()) {    
    DATA.userId = user._id;
    login();   
  }
}

function cbEditUserIndo(data) {

}

function cbRenderHomePage(data) {
  $('#page').html(decorateHomePage(data.find((user => user._id === DATA.userId)))); 
}

function cbRenderProfilePage(data) {
  $('#page').html(decorateProfilePage(data.find((user => user._id === DATA.userId))));
}

function cbRemoveUserProfile(id, data) {
  let index = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i]._id === id) {
      index = i;
      i = data.length;
    }
  }
  data.splice(index, 1);
}

function cbRenderSearchResults(data) {
  $('#search-results').html(decorateResults(data));
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