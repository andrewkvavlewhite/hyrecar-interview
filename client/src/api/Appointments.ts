import API from './instance';

export default {
  all: async query => (await API.get(`/appointments`, {params: {query}})).data,

  create: async ({ title, startDate, endDate, color }) => 
    (await API.post(`/appointments/create`, { title, startDate, endDate, color })).data,

// create: async body => await fetch('/api/appointments/create', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(body),
//   })

//   getUnvoted: async params =>
//     (await API.get(`/api/bills/unvoted`, {params})).data,

//   getById: async (id, params = undefined) =>
//     (await API.get(`/api/bills/${id}`, {params})).data,

//   vote: async ({id, direction, amount, token}) => {
//     store.dispatch(removeCardBillIds([id]));
//     return (
//       await API.post(`/api/bills/${id}/vote`, {
//         direction,
//         amount: convertForStripe(amount),
//         token,
//       })
//     ).data;
//   },

//   votedOn: async (direction: number = undefined) =>
//     (await API.get(`/api/bills/voted`, {params: {direction}})).data,

//   getDonationStats: async () => (await API.get(`/api/donations`)).data,

//   canVote: async (billId: string) =>
//     (await API.get(`/api/bills/${billId}/canVote`)).data.canVote,

//   getSwimLanes: async () => (await API.get(`/api/bills/swimlanes`)).data,

//   filtered: async (params = {}) => (await API.get(`/api/bills/filtered`, { params })).data,
};
