const knex = require('./../db')

exports.all = async (req, res) => {
  knex
    .select('*')
    .from('appointments')
    .where('user', req.user.id)
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving appointments: ${err}` })
    })
}

exports.create = async (req, res) => {
  knex('appointments')
    .insert({
      'user': req.user.id,
      'title': req.body.title,
      'startDate': req.body.startDate,
      'endDate': req.body.endDate,
      'color': req.body.color,
    })
    .then(([ id ]) => {
      knex('appointments')
        .where('id', id)
        .then(([ appt ]) => {
          return res.json(appt)
        });
    })
    .catch(err => {
      res.json({ message: `There was an error creating ${req.body.title} appointment: ${err}` })
    })
}

exports.delete = async (req, res) => {
  knex('appointments')
    .where('id', req.query.id)
    .del()
    .then(() => {
      res.json({ message: `Appointment ${req.query.id} deleted.` })
    })
    .catch(err => {
      res.json({ message: `There was an error deleting ${req.body.id} appointment: ${err}` })
    })
}

exports.reset = async (req, res) => {
  knex
    .select('*')
    .from('appointments')
    .truncate()
    .then(() => {
      res.json({ message: 'Appointments list cleared.' })
    })
    .catch(err => {
      res.json({ message: `There was an error resetting appointment list: ${err}.` })
    })
}