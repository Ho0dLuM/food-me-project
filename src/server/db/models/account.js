const util = require('./util')
const table = 'accounts'

module.exports = {
  create: util.create(table),
  get: util.get(table),
  findOne: util.findOne(table),
  validate: util.validate((errors, { account }) => {
    if (!account) errors.push('Missing account information.')
  })
}
