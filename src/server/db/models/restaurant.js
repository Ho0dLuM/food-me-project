const util = require('./util')

module.exports = {
  get: util.get('restaurants'),
  create: util.create('restaurants'),
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
  getUsersFromReviews: util.getJoin({
    table: 'reviews',
    paths: [
      ['users', 'users.id', 'reviews.user_id']
    ]
  }),
  validate: function (req, res, next) {
    let errors = []
    if (!req.body.restaurant) {
      errors.push('Missing restaurant information.')
    } else {
      if (!req.body.restaurant.name) {
        errors.push('Restaurant name field is required.')
      }
      if (!req.body.restaurant.cuisine_type) {
        errors.push('Restaurant name field is required.')
      }
    }

    if (errors.length) {
      if (req.body.errors) {
        req.body.errors = req.body.errors.concat(errors)
      } else {
        req.body.errors = errors
      }
    }

    next()
  }
}
