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