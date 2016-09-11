const util = require('./util')

module.exports = {
  get: util.get('reviews'),
  create: util.create('reviews'),
  update: util.update('reviews'),
  del: util.del('reviews'),
  getRestaurants: util.getResource({
    table: 'restaurants',
    primary: { resource: 'review', key: 'restaurant_id' },
    foreign: { resource: 'restaurant', key: 'id' }
  }),
  getUsers: util.getResource({
    table: 'users',
    primary: { resource: 'review', key: 'user_id' },
    foreign: { resource: 'user', key: 'id' }
  }),
  validate: util.validate((errors, body) => {
    if (!body.review) {
      errors.push('Missing review information.')
    } else {
      if (!body.review.content) errors.push('Content is required.')
      if (!body.review.rating) errors.push('A rating is required.')
    }
  })
}
