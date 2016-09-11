const util = require('./util')

module.exports = {
  create: util.create('addresses'),
  get: util.get('addresses'),
  update: util.update('addresses'),
  del: util.del('addresses'),
  validate: util.validate((errors, body) => {
    if (!body.address) {
      errors.push('Missing address information.')
    } else {
      if (!body.address.state) {
        errors.push('State field is required.')
      } else if (body.address.state.length > 2) {
        errors.push('State info malformed.')
      }
      if (!body.address.city) errors.push('City field is required.')
    }
  })
}
