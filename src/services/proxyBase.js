import axios from 'axios';
import { getToken } from '../utils/manageToken';

const getConfigAxios = () => {
  const token = getToken() || '';
  return {
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 110000,
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

const instanceProxyBase = () => {
  return axios.create(getConfigAxios());
};

export default instanceProxyBase;
