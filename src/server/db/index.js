const knex = require('./connection')

module.exports = {
  Address: require('./models/address'),
  Restaurant: require('./models/restaurant'),
  Review: require('./models/review'),
  db: knex
}
