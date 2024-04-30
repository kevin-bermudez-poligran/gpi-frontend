import universalCookiesImp from 'universal-cookie';
import jwtDecode from 'jwt-decode';

const nameToken = process.env.REACT_APP_NAME_TOKEN;
const universalCookie = new universalCookiesImp();

export const getExpiredTimeFront = () => {
  let expires = new Date();
  expires.setHours(expires.getHours() + process.env.REACT_APP_HOURS_TOKEN);

  return expires;
};

const getExpiredTimeFromToken = token => {
  const info_token = jwtDecode(token);
  const expires = new Date(1970, 0, 1);

  expires.setTime(info_token.exp * 1000);

  return expires;
};

const saveToken = token => {
  const expires = getExpiredTimeFromToken(token);

  universalCookie.set(nameToken, token, {
    expires,
    path: '/'
  });
};
const deleteToken = () => {
  universalCookie.remove(nameToken, { path: '/' });
};

const getToken = () => {
  return universalCookie.get(nameToken);
};

const getInfoToken = (token = false) => {
  let current_token = token || getToken();
  if (current_token) {
    return jwtDecode(current_token);
  }

  return false;
};

const listenerCookies = callback => {
  return universalCookie.addChangeListener(callback);
};

export { saveToken, getToken, getInfoToken, deleteToken, listenerCookies };
