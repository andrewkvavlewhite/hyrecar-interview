import { gql } from '@apollo/client';

export const getMyCars = gql`
    query {
        getMyCars {
            id
            make
            model
            year
            vin
        }
    }
`;

export const createCarGQL = gql`
    mutation CreateCar($make: String!, $model: String!, $year: String!, $vin: String!) {
        createCar(make: $make, model: $model, year: $year, vin: $vin) {
            id
            make
            model
            year
            vin
        }
    }
`;

export const updateCarGQL = gql`
    mutation UpdateCar($id: ID!, $make: String, $model: String, $year: String, $vin: String) {
        updateCar(id: $id, make: $make, model: $model, year: $year, vin: $vin) {
            id
            make
            model
            year
            vin
        }
    }
`;

export const deleteCarGQL = gql`
    mutation DeleteCar($id: ID!) {
        deleteCar(id: $id)
    }
`;

export default {

};
