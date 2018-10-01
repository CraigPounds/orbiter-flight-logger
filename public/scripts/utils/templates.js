'use strict';

import { DATA } from '../data/mock-data.js';

const GUEST_NAVIGATION = `  
  <nav role="NAVIGATION">      
    <ul>
      <li id="nav-login" class="guest">Log In</li>
      <li>|</li>
      <li id="nav-gallery">Gallery</li>
      <li>|</li>
      <li id="nav-signup" class="guest">Sign Up</li>
    </ul>
  </nav>
  `;

const USER_NAVIGATION = `
  <nav role="NAVIGATION">      
    <ul>
      <li id="nav-home" class="user">Home</li>
      <li class="user">|</li>
      <li id="nav-search" class="user">Search</li>
      <li>|</li>
      <li id="nav-gallery">Gallery</li>
      <li>|</li>
      <li id="nav-profile" class="user">Profile</li>
      <li class="user">|</li>
      <li id="nav-logout" class="user">Log Out</li>
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
      <h2>Log In</h2>
      <form action="#" class='form-login'>
        
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
      <button id="btn-new">NEW MISSION</button>
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
      <h2>Search</h2>
      <form action="#" class='form-search'>
        
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
      <h2>Sign Up</h2>
      <form action="#" class='form-signup'>
        
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
      <h2>Profile</h2>
      <form action="#" class='form-profile'>
        
      </form>
    </div>
  </main>
  `;
}

export { decorateLogin, decorateHome, decorateSearch, decorateGallery, decorateSignup, decorateProfile };