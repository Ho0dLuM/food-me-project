const util = require('./util')
const table = 'users'

module.exports = {
  create: util.create(table),
  get: util.get(table),
  update: util.update(table),
  del: util.del(table),
  findOne: util.findOne(table),
  validate: util.validate((errors, body) => {
    if (!body.user) {
      errors.push('Missing user information.')
    } else {
      if (!body.user.preferred_name) errors.push('Preferred Name is required.')
      if (!body.user.last_name) errors.push('Last Name is required.')
    }
  })
}
