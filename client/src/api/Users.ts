import API from './instance';

export default {
    auth: async () => (await API.get(`/users/auth`)).data,

    login: async ({ username, password }) => (await API.get(`/users?username=${username}&password=${password}`)).data,

    create: async ({ name, username, password }) => 
        (await API.post(`/users`, { name, username, password })).data,

};
