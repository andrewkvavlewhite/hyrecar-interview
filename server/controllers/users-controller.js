const knex = require('./../db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.auth = async (req, res) => {
    console.log('req.user',req.user)
    return res.json({ token: jwt.sign(req.user.id, config.JWT_SECRET), user: req.user });
}

exports.get = async (req, res) => {
    knex
        .select('*')
        .from('users')
        .where('username', req.query.username)
        .then(async ([user]) => {
            const match = await bcrypt.compare(req.query.password, user.password);
            if (match) {
                return res.json({ token: jwt.sign(user.id, config.JWT_SECRET), user })
            } else {
                res.status(401);
                res.json({ message: `Incorrect password.` })
            }
        })
        .catch(err => {
        res.json({ message: `There was an error retrieving users: ${err}` })
        })
}

exports.create = async (req, res) => {
  knex('users')
    .insert({
      'username': req.body.username,
      'name': req.body.name,
      'password': await bcrypt.hash(req.body.password, 10),
    })
    .then(([ id ]) => {
      knex('users')
        .where('id', id)
        .then(([ user ]) => {
          return res.json({ token: jwt.sign(id, config.JWT_SECRET), user })
        });
    })
    .catch(err => {
        res.status(500);
        res.send({ message: `There was an error creating ${req.body.username} user: ${err}` })
    })
}

exports.delete = async (req, res) => {
  knex('users')
    .where('id', req.body.id)
    .del()
    .then(() => {
      res.json({ message: `User ${req.body.id} deleted.` })
    })
    .catch(err => {
      res.json({ message: `There was an error deleting ${req.body.id} user: ${err}` })
    })
}

exports.reset = async (req, res) => {
  knex
    .select('*')
    .from('users')
    .truncate()
    .then(() => {
      res.json({ message: 'Users list cleared.' })
    })
    .catch(err => {
      res.json({ message: `There was an error resetting user list: ${err}.` })
    })
}