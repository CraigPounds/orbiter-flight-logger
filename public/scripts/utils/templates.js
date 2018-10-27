'use strict';

import { DATA } from '../data/data.js';

const GUEST_NAVIGATION = `  
  <nav role="navigation">      
    <ul>
      <li id="nav-login"><a href="#">Log In</a></li>
      <li id="nav-gallery"><a href="#">Gallery</a></li>
      <li id="nav-signup"><a href="#">Sign Up</a></li>
    </ul>
  </nav>
  `;

const USER_NAVIGATION = `
  <nav role="navigation">      
    <ul>
      <li id="nav-home"><a href="#">Home</a></li>
      <li id="nav-search"><a href="#">Search</a></li>
      <li id="nav-gallery"><a href="#">Gallery</a></li>
      <li id="nav-profile"><a href="#">Profile</a></li>
      <li id="nav-logout"><a href="#">Log Out</a></li>
    </ul>
  </nav>
  `;

function decorateNavigation() {
  return DATA.loggedIn ? USER_NAVIGATION : GUEST_NAVIGATION;
}

function decorateSignupPage() {
  return `
  ${decorateNavigation()}
  <main>
    <div id="page-signup">
      <h2>Create Account</h2>
      <form action="#" class="form-signup">
        <fieldset role="group">
          <label for="#first-name">First Name
            <input type="text" id="first-name" required placeholder="First Name">
          </label>
          <label for="#last-name">Last Name
            <input type="text" id="last-name" required placeholder="Last Name">
          </label>
          <label for="#email">Email
            <input type="email" id="email" required placeholder="you@email.com">
          </label>
          <label for="#user-name">User Name
            <input type="text" id="user-name" required placeholder="user name">
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

function decorateLoginPage() {
  const userName = DATA.user.userName ? DATA.user.userName : '';
  return `
  ${decorateNavigation()}
  <main>
    <div id="page-login">
      <h2>User Log In</h2>
      <form action="#" class="form-login">
        <fieldset role="group">
          <label for="#user-name">User Name
            <input type="text" id="user-name" value="${userName}" required placeholder="username">
          </label>
          <label for="#password">Password
            <input type="password" id="password" value="" required placeholder="password">
          <input type="submit" id="btn-login" value="LOG IN">
        </fieldset>
      </form>
    </div>
  </main>
  `;
}

function decorateHomePage(data) {
  console.log(data);
  console.log(DATA.missionIndex);
  
  const BTN_NEW_MISSION = data.missions.length > 0 ? '<button id="btn-new-mission">NEW MISSION</button>' : '';  
  const MISSIONS = data.missions.length > 1 ? decorateMissions(data.missions) : '';  
  return `
  ${decorateNavigation()}
  <main>
    <div id="page-home">
      <h2>${DATA.user.userName}</h2>      
      ${BTN_NEW_MISSION}
      <div class="results">     
        ${MISSIONS}
      </div>
    </div>
  </main>
  `;
}

function decorateLogs(logs) {
  return logs.map((log, index) => {
    return `
    <div class="log" log-index="${index + 1}">
      <label for=".log-title">Title
        <input type="text" class="log-title" required value="${log.title}">
      </label>
      <label for=".vessel">Vessel
        <input type="text" class="vessel" required value="${log.vessel}">
      </label> 
      <label for=".date">Date
        <input type="text" class="date" required value="${log.date}">
      </label>
      <textarea class="txt-log-entry" placeholder="Log entry...">${log.log}</textarea>
      <div class="buttons-log">
        <button class="btn-new-log">NEW LOG</button>
        <button class="btn-delete-log">DELETE LOG</button>
      </div>
    </div>
    `;
  }).join('');
}

function decorateMissions(missions) {
  return missions.map((mission, index) => {
    let version = mission ? mission.orbiterVersion : '--Choose Version--';
    let versionValue = mission ? version : '';
    let os = mission ? mission.os : '--Choose Version--';
    let osValue = mission ? os : '';
    let title = mission ? mission.title : 'Captain\'s Log';
    let logs = [
      {
        title:'Launch',
        vessel: 'XR-1',
        date: 'April 21, 2012',
        log: 'Blast off!'
      },      
      {
        title: 'Docking',
        vessel: 'XR-1',
        date: 'April 22, 2012',
        log:'Docked to ISS'
      },      
      {
        title: 'Earth Escape',
        vessel: 'AR-18',
        date: 'April 23, 2012',
        log:'Onward to Mars'
      }
    ];    
    return `
    <h3 class="log-title">${title}</h3>
    <div class="result hidden" data-index="${index + 1}">
      <form action="#" class="form-logger">
        <div class="mission">
          <fieldset role="group">            
            <label for=".select-version">Orbiter Version</label>
            <select class="select-version">
              <option value="${versionValue}">${version}</option>
              <option value="orbiter-2016">Orbiter 2016</option>
              <option value="orbiter-2010">Orbiter 2010</option>
              <option value="orbiter-2006">Orbiter 2006</option>
              <option value="orbiter-2005">Orbiter 2005</option>
            </select>
            <label for=".select-os">Operating System</label>
            <select class="select-os">
              <option value="${osValue}">${os}</option>
              <option value="win-10">Windows 10</option>
              <option value="win-8">Windows 8.1</option>
              <option value="win-7">Windows 7</option>
              <option value="win-vista">Windows Vista</option>
              <option value="win-xp">Windows XP</option>
              <option value="win-2k">Windows 2000</option>
              <option value="other">other</option>
            </select>
            <label for=".title">Title
              <input type="text" class="title" value="${title}">
            </label>   
            <div class="flight-logs">
              ${decorateLogs(logs)}
            </div>
            <div class="buttons-mission">
              <input type="submit" class="btn-mission" value="SAVE MISSION">
              <button class="btn-delete-mission">DELETE MISSION</button>
            </div>
          </fieldset>
        </div>
      </form>
    </div>
    `;
  }).join('');
}

function decorateSearchLogs(logs) {
  return logs.map((log, index) => {
    return `    
    <div class="log" log-index="${index + 1}">
      <p>Title: ${log.title}</p>
      <p>Vessel: ${log.vessel}</p>
      <p>Data: ${log.date}</p>
      <p>Log: ${log.log}</p>
    </div>
    `;
  }).join('');
}

function decorateSearchMissions(missions) {
  return missions.map((mission, index) => {
    let version = mission ? mission.orbiterVersion : '--Choose Version--';
    let os = mission ? mission.os : '--Choose Version--';
    let title = mission ? mission.title : 'Captain\'s Log';
    let logs = [
      {
        title:'Launch',
        vessel: 'XR-1',
        date: 'April 21, 2012',
        log: 'Blast off!'
      },      
      {
        title: 'Docking',
        vessel: 'XR-1',
        date: 'April 22, 2012',
        log:'Docked to ISS'
      },      
      {
        title: 'Earth Escape',
        vessel: 'AR-18',
        date: 'April 23, 2012',
        log:'Onward to Mars'
      }
    ];
    return `
    <h3 class="log-title">${title}</h3>
    <div class="result hidden" data-index="${index + 1}">
      <div class="mission">        
        <p>${version}</p>
        <p>${os}</p>
        <p>${title}</p>
        <div class="flight-logs">
          ${decorateSearchLogs(logs)}
        </div>            
      </div>
    </div>
    `;
  }).join('');
}

function decorateSearchPage(data) {
  const SEARCH_RESULTS = data ? decorateSearchMissions(data.missions) : '';
  return `
  ${decorateNavigation()}
  <main>
    <div id="page-search">
      <h2>Search Flight Logs</h2>
      <form action="#" class="form-search">
        <fieldset role="group">
          <label for="select-version">Orbiter Version</label>
          <select id="select-version">
            <option value="">--Choose Version--</option>
            <option value="Orbiter 2016">Orbiter 2016</option>
            <option value="Orbiter 2010">Orbiter 2010</option>
            <option value="Orbiter 2006">Orbiter 2006</option>
            <option value="Orbiter 2005">Orbiter 2005</option>
          </select>
          <label for="select-os">Operating System</label>
          <select id="select-os">
            <option value="">--Choose Version--</option>
            <option value="Windows 10">Windows 10</option>
            <option value="Windows 8.1">Windows 8.1</option>
            <option value="Windows 7">Windows 7</option>
            <option value="Windows Vista">Windows Vista</option>
            <option value="Windows XP">Windows XP</option>
            <option value="Windows 2000">Windows 2000</option>
            <option value="other">Other</option>
          </select>
          <label for="#search-text">Vessel
            <input type="text" id="search-text" placeholder="Apollo 18">
          </label>
          <input type="submit" id="btn-search" value="SEARCH">
        </fieldset>
      </form>
      <div class="results">
        ${SEARCH_RESULTS}
      </div>
    </div>
  </main>
  `;
}

function decorateGalleryPage() {
  return `
  ${decorateNavigation()}
  <main>
    <div id="page-gallery">
      <h2>Gallery</h2>
      <img src="./images/challenger.jpg" alt="Challenger Shuttle">
    </div>
  </main>
  `;
}

function decorateProfilePage(data) {
  return `
  ${decorateNavigation()}
  <main>
    <div id="page-profile">
      <h2>Edit Profile</h2>
      <button id="btn-delete-profile">DELETE PROFILE</button>
      <form action="#" class="form-profile">
        <fieldset role="group">
          <label for="#first-name">First Name
            <input type="text" id="first-name" required value=${DATA.user.firstName}>
          </label>
          <label for="#last-name">Last Name
            <input type="text" id="last-name" required value=${DATA.user.lastName}>
          </label>
          <label for="#email">Email
            <input type="text" id="email" required value=${DATA.user.email}>
          </label>
          <label for="#user-name">User Name
            <input type="text" id="user-name" required value=${DATA.user.userName}>
          </label>
          <label for="#password">Password
            <input type="password" id="password" required value=${DATA.user.password} placeholder="password">
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

export { decorateLoginPage, decorateHomePage, decorateSearchPage, decorateGalleryPage, decorateSignupPage, decorateProfilePage };