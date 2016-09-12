const util = require('./util')

module.exports = {
  create: util.create('accounts'),
  get: util.get('accounts'),
  findOne: util.findOne('accounts'),
  validate: util.validate((errors, body) => {
    if (!body.account) {
      errors.push('Missing account information.')
    }
  })
}
