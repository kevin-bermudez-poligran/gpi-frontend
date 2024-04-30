import React, { createContext, useState } from 'react';
import { getToken, getInfoToken } from './utils/manageToken';

const isLoggedIn = () => {
  return getToken() || null;
};

const AppContextProvider = props => {
  const [state, setState] = useState({
    isLoggedIn,
    currentUser: getInfoToken()?.data
  });

  /* eslint-disable react/prop-types*/
  return <AppContext.Provider value={[state, setState]}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;

export const AppContext = createContext();
