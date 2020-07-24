import axios from 'axios';
import CONFIG from '../config';

const instance = axios.create({
  withCredentials: true,
  baseURL: CONFIG.API_HOST,
});
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers.patch['Content-Type'] = 'application/json';

export const auth = token => {
  if (token) {
    instance.defaults.headers.common['authorization'] = `Bearer ${token}`;
    localStorage.setItem('bearerToken', token);
  } else {
    delete instance.defaults.headers.common['authorization'];
    localStorage.removeItem('bearerToken');
  }
}


export default instance;
