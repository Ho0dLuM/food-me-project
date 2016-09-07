const Promise = require('bluebird')
const knex = require('../connection')

function get (id) {
  let promise = knex('restaurants')

  if (id) { promise = promise.where('id', id) }

  return promise
}

function getAddresses (restaurants) {
  var promises = restaurants.map(createAddressPromise)
  return Promise.all(promises)
}

module.exports = {
  get, getAddresses
}

// *** helper functions *** //

function createAddressPromise (restaurant) {
  return knex('addresses')
    .where('id', restaurant.address_id)
    .then((address) => {
      restaurant.address = address[0]
      return Promise.resolve(restaurant)
    })
}
