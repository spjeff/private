// Cookies https://www.w3schools.com/js/js_cookies.asp

function setCookie(cname, cvalue, exmin) {
  var d = new Date();
  d.setTime(d.getTime() + (exmin * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function csglogin() {

  // inputs
  var csguser = document.getElementById('csguser').value;
  var csgpass = document.getElementById('csgpass').value;

  // remove domain prefix
  if (csguser.indexOf("\\") > 0) {
    csguser = csguser.split("\\")[1];
  }

  // HTTP post
  var data = {
    User: csguser,
    Password: csgpass,
    Domain: 'longeveron'
  };
  var request = new XMLHttpRequest();
  request.open('POST', '/VerifyAD/api/Hello', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {

      if (request.responseText == "true") {
        // Success!
        // hide display and set cookie
        var obj = document.getElementById('csglogin');
        obj.style.display = 'none';

        // 30 minutes
        setCookie('csg-security-popup', 'ok', 30);
      } else {
        // Fail
        alert('Invalid credentials');
      }
    } else {
      // We reached our target server, but it returned an error
      alert(request.responseText);
    }
  };
  request.send(JSON.stringify(data));
}

function displayPrompt() {
  var c = getCookie('csg-security-popup');
  if (c != 'ok') {
    // display prompt
    var node = document.createElement('div');
    node.innerHTML = "<div id='csglogin' style='z-index:99;position:absolute;top:0px;left:0px;background-color:white;width:100%;height:100%'><center><table border='0' style='text-align:center'><tr><td><img src='/SiteAssets/long.png' style='padding-right: 60px;'></td><td><form onsubmit='csglogin(); return false;'><table border='0' style='text-align:center'><tr><td colspan='2'><h1>Login Required</h1></td></tr><tr><td>User:</td><td><input type='text' id='csguser' autofocus></td></tr><tr><td>Password:</td><td><input type='password' id='csgpass'></td></tr><tr><td colspan='2' style='text-align:center'><input type='submit' value='Login'></td></tr></table></form></td></tr></table></center></div>";
    document.body.appendChild(node);


    // REST api current user
    var request = new XMLHttpRequest();
    request.open('GET', '/_api/web/currentuser', true);
    request.setRequestHeader('Accept', 'application/json; odata=verbose')
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        var login = data.d.LoginName.split('\\')[1];
        console.log(login);
        document.getElementById('csguser').value = login;
      } else {
        // We reached our target server, but it returned an error
      }
    };
    request.onerror = function () {
      // There was a connection error of some sort
    };
    request.send();

  }
}
_spBodyOnLoadFunctionNames.push("displayPrompt");