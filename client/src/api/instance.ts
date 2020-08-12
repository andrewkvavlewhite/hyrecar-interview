// import axios from 'axios';
// import CONFIG from '../config';

// const instance = axios.create({
//   withCredentials: true,
//   baseURL: CONFIG.API_HOST,
// });
// instance.defaults.headers.post['Content-Type'] = 'application/json';
// instance.defaults.headers.patch['Content-Type'] = 'application/json';

// const bearerToken = localStorage.getItem('bearerToken');

// console.log('bearerToken', bearerToken);

// instance.defaults.headers.common['authorization'] = `Bearer ${bearerToken}`;

import {
	ApolloClient,
	InMemoryCache,
} from '@apollo/client';

let client;

export const auth = token => {
  let authorization;
  if (token) {
    authorization = `Bearer ${token}`;
    localStorage.setItem('bearerToken', token);
  } else {
    localStorage.removeItem('bearerToken');
  }
  client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:5000/graphql',
    headers: { authorization },
    resolvers: {},
  });
}

auth(localStorage.getItem('bearerToken'));

export default client;