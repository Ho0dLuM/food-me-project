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
  })
}
