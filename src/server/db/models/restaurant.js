const Promise = require('bluebird')
const util = require('./util')
const table = 'restaurants'
const { CUISINES } = require('../../config/constants')

module.exports = {
  get: util.get(table),
  create: util.create(table),
  update: util.update(table),
  del: util.del(table),
  addAddresses: util.addResource({
    table: 'addresses',
    primary: { resource: 'restaurant', key: 'address_id' },
    foreign: { resource: 'address', key: 'id' }
  }),
  addReviews: util.addResource({
    table: 'reviews',
    primary: { resource: 'restaurant', key: 'id' },
    foreign: { resource: 'review', key: 'restaurant_id' }
  }),
  addEmployees: util.addResource({
    table: 'employees',
    primary: { resource: 'restaurant', key: 'id' },
    foreign: { resource: 'employee', key: 'restaurant_id' }
  }),
  addUsersThroughReviews: util.addRelated({
    through: { table: 'reviews', key: 'user_id' },
    related: { table: 'users', key: 'id' }
  }),
  addUsersThroughEmployees: util.addRelated({
    through: { table: 'employees', key: 'user_id' },
    related: { table: 'users', key: 'id' }
  }),
  addCuisineName: (restaurants) => {
    let updated = restaurants.map(restaurant => {
      restaurant.cuisine = CUISINES[restaurant.cuisine_type]
      return restaurant
    })

    return Promise.resolve(updated)
  },
  calculateRating: (restaurants) => {
    let updated = restaurants.map(restaurant => {
      let round = 100
      let { reviews } = restaurant
      let total = reviews.reduce((acc, curr) => acc + (curr.rating || 0), 0)

      if (!total) return restaurant

      let average = total / reviews.length
      let formatted = Math.round(average * round) / round

      restaurant.rating = {
        average: formatted,
        numOfReviews: reviews.length
      }

      return restaurant
    })

    return Promise.resolve(updated)
  },
  validate: util.validate((errors, { restaurant }) => {
    if (!restaurant) {
      errors.push('Missing restaurant information.')
    } else {
      if (!restaurant.name) errors.push('Restaurant name field is required.')
      if (!restaurant.cuisine_type) {
        errors.push('Restaurant name field is required.')
      }
    }
  })
}
