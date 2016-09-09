const util = require('./util')

module.exports = {
  create: util.create('addresses'),
  get: util.get('addresses'),
  update: util.update('addresses'),
  validate: function (req, res, next) {
    let errors = []
    if (!req.body.address) {
      errors.push('Missing address information.')
    } else {
      if (!req.body.address.state) {
        errors.push('State field is required.')
      } else if (req.body.address.state.length > 2) {
        errors.push('State info malformed.')
      }
      if (!req.body.address.city) errors.push('City field is required.')
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
