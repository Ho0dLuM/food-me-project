const util = require('./util')
const table = 'reviews'

module.exports = {
  get: util.get(table),
  create: util.create(table),
  update: util.update(table),
  del: util.del(table),
  addRestaurants: util.addResource({
    table: 'restaurants',
    primary: { resource: 'review', key: 'restaurant_id' },
    foreign: { resource: 'restaurant', key: 'id' }
  }),
  addUsers: util.addResource({
    table: 'users',
    primary: { resource: 'review', key: 'user_id' },
    foreign: { resource: 'user', key: 'id' }
  }),
  validate: util.validate((errors, { review }) => {
    if (!review) {
      errors.push('Missing review information.')
    } else {
      if (!review.content) errors.push('Content is required.')
      if (!review.rating) errors.push('A rating is required.')
    }
  })
}
