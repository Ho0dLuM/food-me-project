const util = require('./util')

module.exports = {
  create: util.create('employees'),
  get: util.get('employees'),
  update: util.update('employees'),
  getUsers: util.getResource({
    table: 'users',
    primary: { resource: 'employee', key: 'user_id' },
    foreign: { resource: 'user', key: 'id' }
  }),
  validate: util.validate((errors, body) => {
    if (!body.employee) {
      errors.push('Missing employee information.')
    } else {
      if (!body.employee.role) errors.push('Role field is required.')
    }
  })
}
