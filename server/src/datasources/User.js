const { DataSource } = require('apollo-datasource');
const knex = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');

class User extends DataSource {

    initialize(_config) {
        this.context = _config.context;
    }

    async findByUsername(username) {
        const [user] = await knex
            .select('*')
            .from('users')
            .where('username', username);
        return user;
    }

    async login(username, password) {

        let user;
        try {
            user = await this.findByUsername(username);
            if (!user) throw new Error('Invalid username.')
        } catch(e) {
            throw new Error(e.message);
        }
    
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            user.token = jwt.sign(user.id, config.JWT_SECRET);
            return user;
        } else {
            throw new Error('Incorrect password')
        }
    }

    async signup(username, password, name) {
        if (await this.findByUsername(username)) {
            throw new Error('This username already exists!');
        }

        try {
            const [ id ] = await knex('users')
                .insert({
                    'username': username,
                    'name': name,
                    'password': await bcrypt.hash(password, 10),
                });
            const [ user ] = await knex('users')
              .where('id', id);
              user.token = jwt.sign(id, config.JWT_SECRET);
              return user;
        } catch(err) {
            throw new Error(`There was an error creating ${username} user: ${err}`);
        }
    }

    async getMyCars() {
        return await knex
            .select('*')
            .from('cars')
            .where('userId', this.context.user.id);
    }

    // async findOrCreateUser({ username } = {}) {

    //     const users = await this.store.users.findOrCreate({ where: { username } });
    //     return users && users[0] ? users[0] : null;
    // }

    //   async bookTrips({ launchIds }) {
    //     const userId = this.context.user.id;
    //     if (!userId) return;

    //     let results = [];

    //     for (const launchId of launchIds) {
    //       const res = await this.bookTrip({ launchId });
    //       if (res) results.push(res);
    //     }

    //     return results;
    //   }

    //   async bookTrip({ launchId }) {
    //     const userId = this.context.user.id;
    //     const res = await this.store.trips.findOrCreate({
    //       where: { userId, launchId },
    //     });
    //     return res && res.length ? res[0].get() : false;
    //   }

    //   async cancelTrip({ launchId }) {
    //     const userId = this.context.user.id;
    //     return !!this.store.trips.destroy({ where: { userId, launchId } });
    //   }

    //   async getLaunchIdsByUser() {
    //     const userId = this.context.user.id;
    //     const found = await this.store.trips.findAll({
    //       where: { userId },
    //     });
    //     return found && found.length
    //       ? found.map(l => l.dataValues.launchId).filter(l => !!l)
    //       : [];
    //   }

    //   async isBookedOnLaunch({ launchId }) {
    //     if (!this.context || !this.context.user) return false;
    //     const userId = this.context.user.id;
    //     const found = await this.store.trips.findAll({
    //       where: { userId, launchId },
    //     });
    //     return found && found.length > 0;
    //   }
}

module.exports = User;