const util = require('./util')
const table = 'addresses'

module.exports = {
  create: util.create(table),
  get: util.get(table),
  update: util.update(table),
  del: util.del(table),
  validate: util.validate((errors, { address }) => {
    if (!address) {
      errors.push('Missing address information.')
    } else {
      if (!address.state) {
        errors.push('State field is required.')
      } else if (address.state.length > 2) {
        errors.push('State info malformed.')
      }
      if (!address.city) errors.push('City field is required.')
    }
  })
}
