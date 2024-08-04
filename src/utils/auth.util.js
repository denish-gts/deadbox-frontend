const STORAGEKEY = {
  token: "token",
  userData: "userData",
};

export const setCookie = (name, value, days = 1) => {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export const getCookie = (name) => {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
export const getToken = () => getCookie(STORAGEKEY.token);


export const getUserInfo = () => JSON.parse(getCookie(STORAGEKEY.userData));

export const setToken = (token) => setCookie(STORAGEKEY.token, token);

export const setUserInfo = (data) => setCookie(STORAGEKEY.userData, JSON.stringify(data));

export const authenticate = () => {
  const token = getToken();
  return !!token;
};

export const unProtectedRoute = ['/', '/login', '/signup', '/magic-link']
