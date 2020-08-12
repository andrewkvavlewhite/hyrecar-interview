const resolvers = {
    Query: {
      auth: (_, {}, { user }) => user,
      login: (_, { username, password }, { dataSources }) => dataSources.user.login(username, password),
      getMyCars: (_, { }, { dataSources }) => dataSources.user.getMyCars(),
    },
    Mutation: {
      signup: (_, { username, password, name }, { dataSources }) => dataSources.user.signup(username, password, name),
      createCar: (_, { make, model, year, vin }, { dataSources }) => dataSources.car.create(make, model, year, vin),
      updateCar: (_, { id, make, model, year, vin }, { dataSources }) => dataSources.car.update(id, make, model, year, vin),
      deleteCar: (_, { id }, { dataSources }) => dataSources.car.delete(id),
    }
};

module.exports = resolvers;