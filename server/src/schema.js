const { gql } = require('apollo-server');

const typeDefs = gql`

    type User {
        id: ID!
        name: String!
        username: String!
        password: String!
        token: String
    }

    type Car {
        id: ID!
        make: String!
        model: String!
        year: String!
        vin: String!
        userId: ID!
    }

    type Query {
        auth: User
        login(username: String!, password: String!): User!
        getMyCars: [Car]!
    }

    type Mutation {
        signup(username: String!, password: String!, name: String!): User!
        createCar(make: String!, model: String!, year: String!, vin: String!): Car!
        updateCar(id: ID!, make: String, model: String, year: String, vin: String): Car!
        deleteCar(id: ID!): String!
    }
`;

module.exports = typeDefs;