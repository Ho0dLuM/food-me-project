const util = require('./util')

module.exports = {
  create: util.create('users'),
  get: util.get('users'),
  update: util.update('users'),
  validate: util.validate((errors, body) => {
    if (!body.user) {
      errors.push('Missing user information.')
    } else {
      if (!body.user.preferred_name) errors.push('Preferred Name is required.')
      if (!body.user.last_name) errors.push('Last Name is required.')
    }
  })
}
