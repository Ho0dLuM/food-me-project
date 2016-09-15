const util = require('./util')
const table = 'addresses'

module.exports = {
  create: util.create(table),
  get: util.get(table),
  update: util.update(table),
  del: util.del(table),
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
