import API from './instance';

export default {
  all: async (query?) => (await API.get(`/appointments`, {params: {query}})).data,

  create: async ({ title, startDate, endDate, color = undefined }) => 
    (await API.post(`/appointments`, { title, startDate, endDate, color })).data,

  delete: async id => (await API.delete(`/appointments?id=${id}`)),

};
