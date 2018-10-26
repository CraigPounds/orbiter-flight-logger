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
            <input type="password" id="password" required placeholder="password">
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
  return `
  ${decorateNavigation()}
  <main>
    <div id="page-home">
      <h2>${DATA.user.userName}</h2>      
      <button id="btn-new-mission">NEW MISSION</button>
      <div class="results">
        ${decorateResults(data.missions)}
      </div>
    </div>
  </main>
  `;
}

// function decorateOpenMission(mission) {
//   let version = mission ? mission.orbiterVersion : '--Choose Version--';
//   let versionValue = mission ? version : '';
//   let os = mission ? mission.os : '--Choose Version--';
//   let osValue = mission ? os : '';
//   let title = mission ? mission.title : 'Captain\'s Log';
//   let date = mission ? mission.date : Date.now();
//   return `
//   <form action="#" class="form-logger">
//     <div class="mission">
//       <fieldset role="group">            
//         <label for="select-version">Orbiter Version</label>
//         <select id="select-version">
//           <option value="${versionValue}">${version}</option>
//           <option value="orbiter-2016">Orbiter 2016</option>
//           <option value="orbiter-2010">Orbiter 2010</option>
//           <option value="orbiter-2006">Orbiter 2006</option>
//           <option value="orbiter-2005">Orbiter 2005</option>
//         </select>
//         <label for="select-os">Operating System</label>
//         <select id="select-os">
//           <option value="${osValue}">${os}</option>
//           <option value="win-10">Windows 10</option>
//           <option value="win-8">Windows 8.1</option>
//           <option value="win-7">Windows 7</option>
//           <option value="win-vista">Windows Vista</option>
//           <option value="win-xp">Windows XP</option>
//           <option value="win-2k">Windows 2000</option>
//           <option value="other">other</option>
//         </select>
//         <label for="#title">Title
//           <input type="text" id="#title" value="${title}">
//         </label>   
//         <div id="flight-logs">
//           <div class="log">
//             <label for="#log-title">Title
//               <input type="text" id="log-title" required value="${mission.logs[0].title}">
//             </label>
//             <label for="#vessel">Vessel
//               <input type="text" id="vessel" required value="${mission.logs[0].vessel}">
//             </label> 
//             <label for="#date">Date
//               <input type="text" id="date" required value="${mission.logs[0].date}">
//             </label>
//             <textarea class="txt-log-entry" placeholder="Log entry...">${mission.logs[0].log}</textarea>
//             <div class="buttons-log">
//               <button id="btn-new-log">NEW LOG</button>
//               <button id="btn-delete-log">DELETE LOG</button>
//             </div>
//           </div>
//         </div>
//         <div class="buttons-mission">
//           <input type="submit" id="btn-mission" value="SAVE MISSION">
//           <button id="btn-delete-mission">DELETE MISSION</button>
//         </div>
//       </fieldset>
//     </div>
//   </form>
//   `;
// }

function decorateOpenMission(mission) {
  let version = mission ? mission.orbiterVersion : '--Choose Version--';
  let versionValue = mission ? version : '';
  let os = mission ? mission.os : '--Choose Version--';
  let osValue = mission ? os : '';
  let title = mission ? mission.title : 'Captain\'s Log';
  return `
  <form action="#" class="form-logger">
    <div class="mission">
      <fieldset role="group">            
        <label for="select-version">Orbiter Version</label>
        <select id="select-version">
          <option value="${versionValue}">${version}</option>
          <option value="orbiter-2016">Orbiter 2016</option>
          <option value="orbiter-2010">Orbiter 2010</option>
          <option value="orbiter-2006">Orbiter 2006</option>
          <option value="orbiter-2005">Orbiter 2005</option>
        </select>
        <label for="select-os">Operating System</label>
        <select id="select-os">
          <option value="${osValue}">${os}</option>
          <option value="win-10">Windows 10</option>
          <option value="win-8">Windows 8.1</option>
          <option value="win-7">Windows 7</option>
          <option value="win-vista">Windows Vista</option>
          <option value="win-xp">Windows XP</option>
          <option value="win-2k">Windows 2000</option>
          <option value="other">other</option>
        </select>
        <label for="#title">Title
          <input type="text" id="#title" value="${title}">
        </label>   
        <div id="flight-logs">
          <div class="log">
            <label for="#log-title">Title
              <input type="text" id="log-title" required value="">
            </label>
            <label for="#vessel">Vessel
              <input type="text" id="vessel" required value="">
            </label> 
            <label for="#date">Date
              <input type="text" id="date" required value="">
            </label>
            <textarea class="txt-log-entry" placeholder="Log entry..."></textarea>
            <div class="buttons-log">
              <button id="btn-new-log">NEW LOG</button>
              <button id="btn-delete-log">DELETE LOG</button>
            </div>
          </div>
        </div>
        <div class="buttons-mission">
          <input type="submit" id="btn-mission" value="SAVE MISSION">
          <button id="btn-delete-mission">DELETE MISSION</button>
        </div>
      </fieldset>
    </div>
  </form>
  `;
}

function decorateSearchPage(data) {
  let searchResults = data ? decorateResults(data) : '';
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
            <option value="orbiter-2016">Orbiter 2016</option>
            <option value="orbiter-2010">Orbiter 2010</option>
            <option value="orbiter-2006">Orbiter 2006</option>
            <option value="orbiter-2005">Orbiter 2005</option>
          </select>
          <label for="select-os">Operating System</label>
          <select id="select-os">
            <option value="">--Choose Version--</option>
            <option value="win-10">Windows 10</option>
            <option value="win-8">Windows 8.1</option>
            <option value="win-7">Windows 7</option>
            <option value="win-vista">Windows Vista</option>
            <option value="win-xp">Windows XP</option>
            <option value="win-2k">Windows 2000</option>
            <option value="other">other</option>
          </select>
          <label for="#search-text">User or Keyword
            <input type="text" id="search-text" placeholder="launch">
          </label>
          <input type="submit" id="btn-search" value="SEARCH">
        </fieldset>
      </form>
      <div class="results">
        ${searchResults}
      </div>
    </div>
  </main>
  `;
}

function decorateResults(data) {
  return data.map((mission, index) => {
    
    return `
    <div class="result" data-index="${index + 1}">
      <h3>${mission.title}</h3>
      <p>User Id: ${mission.user_id}</p>
      <p>Mission Id: ${mission._id}</p>
      <p>${mission.orbiterVersion}</p>
      <p>${mission.os}</p>
    </div>
    `;
  }).join('');
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