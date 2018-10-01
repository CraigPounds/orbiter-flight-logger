'use strict';

import { MOCK_USERS, MOCK_MISSIONS } from '../data/mock-data.js';

function decorateLogin() {
  return `
  <div id="page-login">
    <h2>Log In</h2>
    <form action="#" class='form-login'>
      
    </form>
  </div>
  `;
}

function decorateHome() {
  return `
  <div id="page-home">
    <button id="btn-new">NEW MISSION</button>
    <ul id="logs">       
    </ul>
  </div>
  `;
}

function decorateSearch() {
  return `
  <div id="page-search">
    <h2>Search</h2>
    <form action="#" class='form-search'>
      
    </form>
  </div>
  `;
}

function decorateGallery() {
  return `
  <div id="page-gallery">
    <h2>Gallery</h2>
  </div>
  `;
}

function decorateSignup() {
  return `
  <div id="page-signup">
    <h2>Sign Up</h2>
    <form action="#" class='form-signup'>
      
    </form>
  </div>
  `;
}

function decorateProfile() {
  return `
  <div id="page-profile">
    <h2>Profile</h2>
    <form action="#" class='form-profile'>
      
    </form>
  </div>
  `;
}

export { decorateLogin, decorateHome, decorateSearch, decorateGallery, decorateSignup, decorateProfile };