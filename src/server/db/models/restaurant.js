const Promise = require('bluebird')
const util = require('./util')
const { cuisines } = require('../../config/constants')

module.exports = {
  get: util.get('restaurants'),
  create: util.create('restaurants'),
  update: util.update('restaurants'),
  getAddresses: util.getResource({
    table: 'addresses',
    primary: { resource: 'restaurant', key: 'address_id' },
    foreign: { resource: 'address', key: 'id' }
  }),
  getReviews: util.getResource({
    table: 'reviews',
    primary: { resource: 'restaurant', key: 'id' },
    foreign: { resource: 'review', key: 'restaurant_id' }
  }),
  getEmployees: util.getResource({
    table: 'employees',
    primary: { resource: 'restaurant', key: 'id' },
    foreign: { resource: 'employee', key: 'restaurant_id' }
  }),
  getUsersFromReviews: util.getJoin({
    table: 'reviews',
    paths: [
      ['users', 'users.id', 'reviews.user_id']
    ]
  }),
  addCuisineName: (restaurants) => {
    let updated = restaurants.map(restaurant => {
      restaurant.cuisine = cuisines[restaurant.cuisine_type]
      return restaurant
    })

    return Promise.resolve(updated)
  },
  validate: util.validate((errors, body) => {
    if (!body.restaurant) {
      errors.push('Missing restaurant information.')
    } else {
      if (!body.restaurant.name) {
        errors.push('Restaurant name field is required.')
      }
      if (!body.restaurant.cuisine_type) {
        errors.push('Restaurant name field is required.')
      }
    }
  })
}
