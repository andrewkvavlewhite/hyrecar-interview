import API from './instance';
import { gql } from '@apollo/client';

export const auth = gql`
    query {
        auth {
            id
            username
            name
            token
        }
    }
`;

export const login = gql`
    query Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            username
            name
            token
        }
    }
`;

export const signup = gql`
    mutation Signup($username: String!, $password: String!, $name: String!) {
        signup(username: $username, password: $password, name: $name) {
            id
            username
            name
            token
        }
    }
`;

export default {

};
