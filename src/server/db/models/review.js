const util = require('./util')

module.exports = {
  get: util.get('reviews'),
  del: util.del('reviews'),
  getUsers: util.getResource({
    table: 'users',
    primary: { resource: 'review', key: 'user_id' },
    foreign: { resource: 'user', key: 'id' }
  })
}
