const Promise = require('bluebird')
const knex = require('../connection')

function get (options) {
  let { id, address } = options
  let promise = knex('restaurants')

  if (id) { promise = promise.where('id', id) }
  if (address) { promise = withAddress(promise) }

  return promise
}

function withAddress (restaurantsPromise) {
  return restaurantsPromise
    .then((restaurants) => {
      let promises = restaurants.map(createAddressPromise)
      return Promise.all(promises)
    })
}

module.exports = {
  get, withAddress
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
