// Import path module
const path = require('path')
const fs = require('fs');

const dir = './db';

// Create db directory if it doesn't exist
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')
// Create connection to SQLite database
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: dbPath,
    },
    useNullAsDefault: true
})
// Create a table in the database called "appointments"
knex.schema
    // Make sure no "appointments" table exists
    // before trying to create new
    .hasTable('appointments')
        .then((exists) => {
            if (!exists) {
                return knex.schema.createTable('appointments', (table)  => {
                    table.increments('id').primary()
                    table.integer('user')
                    table.string('title')
                    table.dateTime('startDate')
                    table.dateTime('endDate')
                    table.string('color')
                })
                .then(() => {
                    // Log success message
                    console.log('Table \'Appointments\' created')
                })
                .catch((error) => {
                    console.error(`There was an error creating table: ${error}`)
                })
            }
        })
        .then(() => {
            // Log success message
            console.log('done')
        })
        .catch((error) => {
            console.error(`There was an error setting up the database: ${error}`)
        })


knex.schema
    // Make sure no "users" table exists
    // before trying to create new
    .hasTable('users')
        .then((exists) => {
            if (!exists) {
                return knex.schema.createTable('users', (table)  => {
                    table.increments('id').primary()
                    table.string('username').unique()
                    table.string('name')
                    table.string('password')
                })
                .then(() => {
                    // Log success message
                    console.log('Table \'Users\' created')
                })
                .catch((error) => {
                    console.error(`There was an error creating table: ${error}`)
                })
            }
        })
        .then(() => {
            // Log success message
            console.log('done')
        })
        .catch((error) => {
            console.error(`There was an error setting up the database: ${error}`)
        })

module.exports = knex