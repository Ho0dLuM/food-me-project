const util = require('./util')
const table = 'employees'

module.exports = {
  create: util.create(table),
  get: util.get(table),
  update: util.update(table),
  del: util.del(table),
  getUsers: util.getResource({
    table: 'users',
    primary: { resource: 'employee', key: 'user_id' },
    foreign: { resource: 'user', key: 'id' }
  }),
  validate: util.validate((errors, { employee }) => {
    if (!employee) {
      errors.push('Missing employee information.')
    } else {
      if (!employee.role) errors.push('Role field is required.')
    }
  })
}
