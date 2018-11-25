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
  let index = log._id ? log._id : `${$('.log').length}`;
  let date = log.date ? log.date : '';
  let title = log.title ? log.title : '';
  let vessel = log.vessel ? log.vessel : '';
  let logEntry = log.log ? log.log : '';
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
  let deleteButton = DATA.dataSaved && logs.length > 1 ? '<button class="btn-delete-log btn-small">DELETE LOG</button>' : '';
  return logs.map((log, i) => {
    let newLogButton = DATA.dataSaved && i === logs.length - 1 ? '<button id="btn-new-log" class="btn-small">NEW LOG</button>' : '';
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
        ${newLogButton}      
        ${deleteButton}
      </div>
    </div>
    `;
  }).join('');
}

function decorateMission(mission) {
  let resultClass = DATA.dataSaved ? 'result hidden' : 'result';
  let index = mission._id ? mission._id : `${$('.btn-mission-title' ).length}`;
  let title = mission.title ? mission.title : `Mission ${$('.btn-mission-title' ).length + 1}`;
  let version = mission.orbiterVersion ? mission.orbiterVersion : '--Choose Version--';
  let os = mission.os ? mission.os : '--Choose Version--';
  let logs = mission.logs ? decorateLogs(mission.logs) : '';
  let deleteButton = DATA.dataSaved ? '<button id="btn-delete-mission" class="btn-small">DELETE MISSION</button>' : '';
  let formClass = '';
  let saveButton = '';
  
  if (mission._id) {
    formClass = 'form-put-mission';
    saveButton = '<input type="submit" id="btn-put-mission" class="btn-small" value="UPDATE">';
  } else {
    formClass = 'form-post-mission';
    saveButton = '<input type="submit" id="btn-save-mission" class="btn-small" value="SAVE MISSION">';
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
            <input type="text" id="search-text" class="search-text" placeholder="Apollo 18">
          </label>
          <input type="submit" id="btn-search" class="btn end" value="SEARCH">
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
            <input type="text" id="user-name" class="user-input" value="${USER_NAME}" required>
          </label>
          <label for="#password">Password
            <input type="password" id="password" class="user-input" value="${PASSWORD}" required>
          <input type="submit" id="btn-login" class="btn" value="LOG IN">
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
            <input type="password" id="password" class="user-input" required>
          </label>
          <label for="#retype-password">Retype Password
            <input type="password" id="retype-password" class="user-input" required>
          </label>
          <input type="submit" id="btn-signup" class="btn" value="SIGN UP">
        </fieldset>
      </form>
    </div>
  </main>
  `;
}

function decorateProfilePage() {
  return `
  ${decorateNavigation()}
  <main>
    <div id="page-profile">
      <h2>Edit Profile</h2>      
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
            <input type="password" id="password" class="user-input" required value=${DATA.user.password}>
          </label>
          <label for="#retype-password">Retype Password
            <input type="password" id="retype-password" class="user-input" required>
          </label>
          <input type="submit" id="btn-profile" class="btn" value="SUBMIT">
          <button id="btn-delete-profile" class="btn">DELETE PROFILE</button>
        </fieldset>        
      </form>
    </div>
  </main>
  `;
}

function decorateHomePage() {
  const MISSIONS = DATA.missions.length > 0 ? decorateMissions(DATA.missions) : '';
  return `
  ${decorateNavigation()}
  <main>
    <div id="page-home">
      <h2>${DATA.user.username}</h2>
      <div class="results">     
        ${MISSIONS}
      </div>
      <button id="btn-new-mission" class="btn">NEW MISSION</button>
    </div>
  </main>
  `;
}

function decorateGalleryPage() {
  let links = DATA.images.map((image, i) => {
    let thumbnail = i > 0 ? '' : '<img src="./images/challenger-thumb.jpg" title="${image.title}" alt="${image.title}">';
    return `
    <a class="lightboxgallery-gallery-item" target="_blank" href="${image.src}" data-title="${image.title}" data-alt="${image.title}" data-desc="">
      <div>
        <div class="lightboxgallery-gallery-item-content">
          <span class="lightboxgallery-gallery-item-title"></span>
        </div>
        ${thumbnail}
      </div>
    </a>   
    `;
  }).join('');

  return `
  ${decorateNavigation()}
  <main>
    <div id="page-gallery" class="results">
      <h2>Gallery</h2>
      <div class="results">
        <div class="lightboxgallery-gallery clearfix">
          ${links}
        </div>
      </div>
      <h3>Useful Links</h3>
      <button class="btn-mission-title">Orbiter / Add-ons</button>
      <div class="result link hidden" data-index="0">
        <p><a href="http://orbit.medphys.ucl.ac.uk/" title="Orbiter" target="_blank">Orbiter</a></p>
        <p><a href="https://www.orbithangar.com/" title="Orbit Hangar Mods" target="_blank">Orbit Hangar Mods</a></p>
        <p><a href="https://www.alteaaerospace.com/" title="Altea Aerospace" target="_blank">Altea Aerospace</a></p>
        <p><a href="http://orbiter.dansteph.com/" title="Dan's Orbiter Page" target="_blank">Dan's Orbiter Page</a></p>
        <p><a href="http://francophone.dansteph.com/?page=home" title="Pappy's Hangar" target="_blank">Pappy's Hangar</a></p>
        <p><a href="https://www.acsoft.ch/AMSO/amso.html" title="Apollo Mission Sim for Orbiter" target="_blank">ASMO</a></p>
        <p><a href="http://nassp.sourceforge.net/wiki/Main_Page" title="Project Apollo - NASSP" target="_blank">Project Apollo - NASSP</a></p>
      </div>
      <button class="btn-mission-title">Reference</button>
      <div class="result link hidden" data-index="1">
        <p><a href="https://www.orbiter-forum.com/tutorials.php" title="Orbiter Forum Tutorials" target="_blank">Orbiter Forum Tutorials</a></p>
        <p><a href="https://trajbrowser.arc.nasa.gov/index.php" title="NASA Ames Research Center Trajectory Browser" target="_blank">NASA Trajectory Browser</a></p>
        <p><a href="http://www.esa.int/Our_Activities/Human_Spaceflight/International_Space_Station/Where_is_the_International_Space_Station" title="Where is the ISS" target="_blank">Where is the ISS</a></p>
        <p><a href="https://skyvector.com/" title="SkyVector: Flight Planner" target="_blank">SkyVector: Flight Planner</a></p>
        <p><a href="https://in-the-sky.org/skymap.php" title="The In-The-Sky.org Planetarium" target="_blank">Planeterium</a></p>
        <p><a href="http://www.worldwidetelescope.org/webclient/" title="WorldWide Telescope Web Client" target="_blank">WorldWide Telescope Web Client</a></p>
        <p><a href="https://orbitalmechanics.info/" title="Orbital Mechanics" target="_blank">Orbital Mechanics</a></p>
        <p><a href="http://svtsim.com/moonjs/agc.html" title="Moonjs: An Online Apollo Guidance Computer (AGC) Simulator" target="_blank">Online AGC</a></p>
      </div>
    </div>
  </main>
  `;
}

export { decorateLog, decorateMission, decorateLoginPage, decorateHomePage, decorateSearchPage, decorateGalleryPage, decorateSignupPage, decorateProfilePage };