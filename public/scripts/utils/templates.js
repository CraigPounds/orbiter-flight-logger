'use strict';

import { DATA } from '../data/mock-data.js';

const GUEST_NAVIGATION = `  
  <nav role="NAVIGATION">      
    <ul>
      <li id="nav-login">Log In</li>
      <li id="nav-gallery">Gallery</li>
      <li id="nav-signup">Sign Up</li>
    </ul>
  </nav>
  `;

const USER_NAVIGATION = `
  <nav role="NAVIGATION">      
    <ul>
      <li id="nav-home">Home</li>
      <li id="nav-search">Search</li>
      <li id="nav-gallery">Gallery</li>
      <li id="nav-profile">Profile</li>
      <li id="nav-logout">Log Out</li>
    </ul>
  </nav>
  `;

function decorateNavigation() {
  return DATA.loggedIn ? USER_NAVIGATION : GUEST_NAVIGATION;
}

function decorateLogin() {
  
  return `
  ${decorateNavigation()}
  <main aria-live="polite">
    <div id="page-login">
      <h2>User Log In</h2>
      <form action="#" class='form-login'>
        
        <input type="submit" id="btn-login" value="LOG IN">
      </form>
    </div>
  </main>
  `;
}

function decorateHome() {
  return `
  ${decorateNavigation()}
  <main aria-live="polite">
    <div id="page-home">
      <h2>Home</h2>
      <form action="#" class="form-home">

        <input type="submit" id="btn-new-mission" value="NEW MISSION">
      </form>
      <ul id="logs">       
      </ul>
    </div>
  </main>
  `;
}

function decorateSearch() {
  return `
  ${decorateNavigation()}
  <main aria-live="polite">
    <div id="page-search">
      <h2>Search Flight Logs</h2>
      <form action="#" class='form-search'>
        
        <input type="submit" id="btn-search" value="SEARCH">
      </form>
    </div>
  </main>
  `;
}

function decorateGallery() {
  return `
  ${decorateNavigation()}
  <main aria-live="polite">
    <div id="page-gallery">
      <h2>Gallery</h2>

    </div>
  </main>
  `;
}

function decorateSignup() {
  return `
  ${decorateNavigation()}
  <main aria-live="polite">
    <div id="page-signup">
      <h2>Create Account</h2>
      <form action="#" class='form-signup'>
        
        <input type="submit" id="btn-signup" value="SIGN UP">
      </form>
    </div>
  </main>
  `;
}

function decorateProfile() {
  return `
  ${decorateNavigation()}
  <main aria-live="polite">
    <div id="page-profile">
      <h2>Edit Profile</h2>
      <form action="#" class='form-profile'>
        
        <input type="submit" id="btn-profile" value="SUBMIT">
      </form>
    </div>
  </main>
  `;
}

export { decorateLogin, decorateHome, decorateSearch, decorateGallery, decorateSignup, decorateProfile };