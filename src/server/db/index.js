const knex = require('./connection')

module.exports = {
  Address: require('./models/address'),
  Employee: require('./models/employee'),
  Restaurant: require('./models/restaurant'),
  Review: require('./models/review'),
  User: require('./models/user'),
  db: knex
}
