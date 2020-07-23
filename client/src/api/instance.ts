import axios from 'axios';
import CONFIG from '../config';

const instance = axios.create({
  withCredentials: true,
  baseURL: CONFIG.API_HOST,
});
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers.patch['Content-Type'] = 'application/json';

instance.defaults.headers.common['x-access-token'] = 'all';

export default instance;
