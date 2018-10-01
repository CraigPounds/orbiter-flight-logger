'use strict';

import { DATA } from '../data/mock-data.js';

const GUEST_NAVIGATION = `  
  <nav role="navigation">      
    <ul>
      <li id="nav-login">Log In</li>
      <li id="nav-gallery">Gallery</li>
      <li id="nav-signup">Sign Up</li>
    </ul>
  </nav>
  `;

const USER_NAVIGATION = `
  <nav role="navigation">      
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
        <fieldset role="group">
          <label for="#user-name">User Name
            <input type="text" id="user-name" required placeholder="username">
          </label>
          <label for="#password">Password
            <input type="password" id="password" required placeholder="password1">
          <input type="submit" id="btn-login" value="LOG IN">
        </fieldset>
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
      <div id="open-mission" class="mission">
        ${decorateOpenMission()}
      </div>
      <div id="other-missions" class="mission">
        ${decorateOtherMissions()}
      </div>
    </div>
  </main>
  `;
}

function decorateOpenMission() {
  return `
    
  `;
}

function decorateOtherMissions() {
  return `
  
  `;
}

function decorateSearch() {
  return `
  ${decorateNavigation()}
  <main aria-live="polite">
    <div id="page-search">
      <h2>Search Flight Logs</h2>
      <form action="#" class='form-search'>
        <fieldset role="group">
          <label for="select-os">Operating System:</label>
          <select id="select-os">
              <option value="">--Windows Version--</option>
              <option value="win-10">Windows 10</option>
              <option value="win-8">Windows 8.1</option>
              <option value="win-7">Windows 7</option>
              <option value="win-vista">Windows Vista</option>
              <option value="win-xp">Windows XP</option>
              <option value="win-2k">Windows 2000</option>
              <option value="other">other</option>
          </select>
          <label for="select-version">Orbiter Version:</label>
          <select id="select-version">
              <option value="">--Orbiter Version--</option>
              <option value="orbiter-2016">Orbiter 2016</option>
              <option value="orbiter-2010">Orbiter 2010</option>
              <option value="orbiter-2006">Orbiter 2006</option>
              <option value="orbiter-2005">Orbiter 2005</option>
          </select>
          <label for="#search-text">User or Keyword
            <input type="text" id="search-text" placeholder="launch">
          </label>
          <input type="submit" id="btn-search" value="SEARCH">
        </fieldset>
      </form>
      <div id="open-result" class="mission">
        ${decorateOpenResult()}
      </div>
      <div id="other-results" class="mission">
        ${decorateOtherResults()}
      </div>
    </div>
  </main>
  `;
}

function decorateOpenResult() {
  return `
  
  `;
}

function decorateOtherResults() {
  return `
    
  `;
}

function decorateGallery() {
  return `
  ${decorateNavigation()}
  <main aria-live="polite">
    <div id="page-gallery">
      <h2>Gallery</h2>
      <img src="./images/challenger.jpg" alt="Challenger Shuttle">
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
        <fieldset role="group">
          <label for="#first-name">First Name
            <input type="text" id="first-name" required placeholder="First Name">
          </label>
          <label for="#last-name">Last Name
            <input type="text" id="last-name" required placeholder="Last Name">
          </label>
          <label for="#email">Email
            <input type="text" id="email" required placeholder="you@email.com">
          </label>
          <label for="#user-name">User Name
            <input type="text" id="username" required placeholder="username">
          </label>
          <label for="#password">Password
            <input type="password" id="password" required placeholder="password">
          </label>
          <label for="#retype-password">Retype Password
            <input type="password" id="retype-password" required placeholder="password">
          </label>
          <input type="submit" id="btn-signup" value="SIGN UP">
        </fieldset>
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
        <fieldset role="group">
          <label for="#first-name">First Name
            <input type="text" id="first-name" required placeholder="First Name">
          </label>
          <label for="#last-name">Last Name
            <input type="text" id="last-name" required placeholder="Last Name">
          </label>
          <label for="#email">Email
            <input type="text" id="email" required placeholder="you@email.com">
          </label>
          <label for="#user-name">User Name
            <input type="text" id="username" required placeholder="username">
          </label>
          <label for="#password">Password
            <input type="password" id="password" required placeholder="password">
          </label>
          <label for="#retype-password">Retype Password
            <input type="password" id="retype-password" required placeholder="password">
          </label>
          <input type="submit" id="btn-profile" value="SUBMIT">
        </fieldset>        
      </form>
    </div>
  </main>
  `;
}

export { decorateLogin, decorateHome, decorateSearch, decorateGallery, decorateSignup, decorateProfile };