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

function decorateLog(log) {
  let title = log.title ? log.title : '';
  let vessel = log.vessel ? log.vessel : '';
  let date = log.date ? log.date : '';
  let logEntry = log.log ? log.log : '';
  let index = log._id ? log._id : `new-log-${$('.log').length}`;
  return `
    <div class="log" data-index="${index}">
      <label for=".log-title">Title
        <input type="text" class="log-title user-input" placeholder="Log Title" required value="${title}">
      </label>
      <label for=".vessel">Vessel
        <input type="text" class="vessel user-input" placeholder="Vessel Name" required value="${vessel}">
      </label> 
      <label for=".date">Date
        <input type="text" class="date user-input" required value="${date}">
      </label>
      <textarea class="txt-log-entry" placeholder="Log entry...">${logEntry}</textarea>
      <div class="buttons-log">    
      </div>
    </div>
    `;
}

function decorateLogs(logs) {
  let deleteButton = DATA.dataSaved && logs.length > 1 ? '<button class="btn-delete-log">DELETE LOG</button>' : '';
  return logs.map((log, i) => {
    let title = log.title ? log.title : '';
    let vessel = log.vessel ? log.vessel : '';
    let date = log.date ? log.date : '';
    let logEntry = log.log ? log.log : '';
    let index = log._id ? log._id : `new-log-${$('.log').length}`;
    return `
    <div class="log" data-index="${index}">
      <label for=".log-title">Title
        <input type="text" class="log-title user-input" placeholder="Log Title" required value="${title}">
      </label>
      <label for=".vessel">Vessel
        <input type="text" class="vessel user-input" placeholder="Vessel Name" required value="${vessel}">
      </label> 
      <label for=".date">Date
        <input type="text" class="date user-input" required value="${date}">
      </label>
      <textarea class="txt-log-entry" placeholder="Log entry...">${logEntry}</textarea>
      <div class="buttons-log">        
        ${deleteButton}
      </div>
    </div>
    `;
  }).join('');
}

function decorateMission(mission) {
  let formClass = '';
  let resultClass = DATA.dataSaved ? 'result hidden' : 'result';
  let title = mission.title ? mission.title : 'New Mission';
  let index = mission._id ? mission._id : `new-mission-${$('.btn-mission-title' ).length}`;
  let version = mission.orbiterVersion ? mission.orbiterVersion : '--Choose Version--';
  let os = mission.os ? mission.os : '--Choose Version--';
  let logs = mission.logs ? decorateLogs(mission.logs) : '';
  let newButton = DATA.dataSaved ? '<button id="btn-new-log">NEW LOG</button>' : '';
  let saveButton = '';
  let deleteButton = DATA.dataSaved ? '<button id="btn-delete-mission">DELETE MISSION</button>' : '';
  
  if (mission._id) {
    formClass = 'form-put-mission';
    saveButton = '<input type="submit" id="btn-put-mission" value="UPDATE MISSION">';
  } else {
    formClass = 'form-post-mission';
    saveButton = '<input type="submit" id="btn-save-mission" value="SAVE MISSION">';
  }
  return `
    <button class="btn-mission-title">${title}</button>
    <div class="${resultClass}" data-index="${index}">
      <form action="#" class="${formClass}">
        <div class="mission">
          <fieldset role="group">            
            <label for=".select-version">Orbiter Version</label>
            <select class="select-version">
              <option value="${version}">${version}</option>
              <option value="Orbiter 2016">Orbiter 2016</option>
              <option value="Orbiter 2010">Orbiter 2010</option>
              <option value="Orbiter 2006">Orbiter 2006</option>
              <option value="Orbiter 2005">Orbiter 2005</option>
            </select>
            <label for=".select-os">Operating System</label>
            <select class="select-os">
              <option value="${os}">${os}</option>
              <option value="Windows 10">Windows 10</option>
              <option value="Windows 8.1">Windows 8.1</option>
              <option value="Windows 7">Windows 7</option>
              <option value="Windows Vista">Windows Vista</option>
              <option value="Windows XP">Windows XP</option>
              <option value="Windows 2000">Windows 2000</option>
              <option value="Other">Other</option>
            </select>
            <label for=".title">Flight
              <input type="text" class="title" value="${title}" placeholder="Untitled Mission" required>
            </label>   
            <div class="flight-logs">
              ${logs}
            </div>
            <div class="buttons-mission">
              ${newButton}
              ${saveButton}
              ${deleteButton}
            </div>
          </fieldset>
        </div>
      </form>
    </div>
    `;
}

function decorateMissions(missions) {
  return missions.map((mission) => {     
    return decorateMission(mission);
  }).join('');
}

function decorateSearchLogs(logs) {
  return logs.map((log) => {
    let index = log._id ? log._id : `new-log-${$('.log').length}`;
    return `    
    <div class="search-log" data-index="${index}">
      <p>Title: ${log.title}</p>
      <p>Vessel: ${log.vessel}</p>
      <p>Data: ${log.date}</p>
      <p>Log: ${log.log}</p>
    </div>
    `;
  }).join('');
}

function decorateSearchMissions(missions) {
  let searchedMissions = [];
  missions.forEach((mission) => {
    let returnMission = false;
    mission.logs.forEach((log) => {

      if (DATA.searchText === '' || DATA.searchText.toLowerCase() === log.vessel.toLowerCase()) returnMission = true;
    });
    if (returnMission) searchedMissions.push(mission);
  });
  return searchedMissions.map((mission) => {
    let version = mission ? mission.orbiterVersion : '--Choose Version--';
    let os = mission ? mission.os : '--Choose Version--';
    let title = mission ? mission.title : 'Untitled Mission';
    let index = mission._id ? mission._id : `new-mission-${$('.btn-mission-title' ).length}`;
    let logs = mission.logs ? decorateSearchLogs(mission.logs) : '';    
    return `
    <button class="btn-mission-title">${title}</button>
    <div class="result hidden" data-index="${index}">
      <div class="mission">        
        <p>${version}</p>
        <p>${os}</p>
        <p>${title}</p>
        <div class="flight-logs">
          ${logs}
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
          <label for="#select-version">Orbiter Version</label>
          <select id="select-version">
            <option value="">--Choose Version--</option>
            <option value="Orbiter 2016">Orbiter 2016</option>
            <option value="Orbiter 2010">Orbiter 2010</option>
            <option value="Orbiter 2006">Orbiter 2006</option>
            <option value="Orbiter 2005">Orbiter 2005</option>
          </select>
          <label for="#select-os">Operating System</label>
          <select id="select-os">
            <option value="">--Choose Version--</option>
            <option value="Windows 10">Windows 10</option>
            <option value="Windows 8.1">Windows 8.1</option>
            <option value="Windows 7">Windows 7</option>
            <option value="Windows Vista">Windows Vista</option>
            <option value="Windows XP">Windows XP</option>
            <option value="Windows 2000">Windows 2000</option>
            <option value="Other">Other</option>
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

function decorateLoginPage(data) {
  const USER_NAME = data.username !== undefined ? data.username : '';
  const PASSWORD = DATA.user.password ? DATA.user.password : '';
  return `
  ${decorateNavigation()}
  <main>
    <div id="page-login">
      <h2>User Log In</h2>
      <form action="#" class="form-login">
        <fieldset role="group">
          <label for="#user-name">User Name
            <input type="text" id="user-name" class="user-input" value="${USER_NAME}" required placeholder="username">
          </label>
          <label for="#password">Password
            <input type="password" id="password" class="user-input" value="passwordkoik" required placeholder="password">
          <input type="submit" id="btn-login" value="LOG IN">
        </fieldset>
      </form>
    </div>
  </main>
  `;
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
            <input type="text" id="first-name" class="user-input" required placeholder="First Name">
          </label>
          <label for="#last-name">Last Name
            <input type="text" id="last-name" class="user-input" required placeholder="Last Name">
          </label>
          <label for="#email">Email
            <input type="email" id="email" class="user-input" required placeholder="you@email.com">
          </label>
          <label for="#user-name">User Name
            <input type="text" id="user-name" class="user-input" required placeholder="user name">
          </label>
          <label for="#password">Password
            <input type="password" id="password" class="user-input" required placeholder="password">
          </label>
          <label for="#retype-password">Retype Password
            <input type="password" id="retype-password" class="user-input" required placeholder="password">
          </label>
          <input type="submit" id="btn-signup" value="SIGN UP">
        </fieldset>
      </form>
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
            <input type="text" id="first-name" class="user-input" required value=${DATA.user.firstName}>
          </label>
          <label for="#last-name">Last Name
            <input type="text" id="last-name" class="user-input" required value=${DATA.user.lastName}>
          </label>
          <label for="#email">Email
            <input type="text" id="email" class="user-input" required value=${DATA.user.email}>
          </label>
          <label for="#user-name">User Name
            <input type="text" id="user-name" class="user-input" required value=${DATA.user.username}>
          </label>
          <label for="#password">Password
            <input type="password" id="password" class="user-input" required value=${DATA.user.password} placeholder="password">
          </label>
          <label for="#retype-password">Retype Password
            <input type="password" id="retype-password" class="user-input" required placeholder="password">
          </label>
          <input type="submit" id="btn-profile" value="SUBMIT">
        </fieldset>        
      </form>
    </div>
  </main>
  `;
}

function decorateHomePage(data) {
  const MISSIONS = DATA.missions.length > 0 ? decorateMissions(DATA.missions) : '';
  return `
  ${decorateNavigation()}
  <main>
    <div id="page-home">
      <h2>${DATA.user.username}</h2>
      <div class="results">     
        ${MISSIONS}
      </div>
      <button id="btn-new-mission">NEW MISSION</button>
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

export { decorateLog, decorateMission, decorateLoginPage, decorateHomePage, decorateSearchPage, decorateGalleryPage, decorateSignupPage, decorateProfilePage };