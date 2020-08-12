const { DataSource } = require('apollo-datasource');
const knex = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');

class Car extends DataSource {

    initialize({ context }) {
        this.context = context;
    }

    async getById(id) {
        const [car] = await knex
            .select('*')
            .from('cars')
            .where('id', id);
        return car;
    }

    async create(make, model, year, vin) {
        try {
            const [ id ] = await knex('cars').insert({
                make,
                model,
                year,
                vin,
                userId: this.context.user.id,
            });

            const [ car ] = await knex('cars').where('id', id);

            return car;

        } catch(err) {
            throw new Error(`There was an error creating car: ${err}`)
        }
    }

    async update(id, make, model, year, vin) {
        const car = await this.getById(id);
        if (!car) {
            throw new Error(`Car with id(${id}) does not exist!`);
        }
        const updateObj = {};
        if (make) updateObj.make = make;
        if (model) updateObj.model = model;
        if (year) updateObj.year = year;
        if (vin) updateObj.vin = vin;

        await knex('cars')
            .update(updateObj)
            .where('id', id);

        return await this.getById(id);
    }

    async delete(id) {
        const car = await this.getById(id);
        if (!car) {
            throw new Error(`Car with id(${id}) does not exist!`);
        }
        await knex('cars')
            .where('id', id)
            .delete();
        return 'success!';
    }
}

module.exports = Car;