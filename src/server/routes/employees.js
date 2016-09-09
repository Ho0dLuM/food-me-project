const express = require('express')
const router = express.Router()
const { Employee, User } = require('../db')
const util = require('./util')
const segment = util.segmentBody('employee')

router.get('/:id/edit', editEmployeeRoute)
router.put('/:id',
  segment,
  Employee.validate,
  updateEmployeeRoute)

// ------------------------------------- //

function editEmployeeRoute (req, res, next) {
  Employee.get(req.params.id)
  .then(Employee.getUsers)
  .then(employees => {
    let employee = employees[0]
    let user = employee.users[0]
    res.render('employees/edit', { employee, user })
  }).catch(util.catchError)
}

function updateEmployeeRoute (req, res, next) {
  if (req.body.errors) {
    let { employee, errors, restaurant, user } = req.body
    res.render('employees/edit', { errors, employee, restaurant, user })
  } else {
    User.update(req.body.user)
    .then(user => Employee.update(req.body.employee))
    .then(employee => res.redirect(`/restaurants/${employee[0].restaurant_id}`))
    .catch(util.catchError(next))
  }
}

module.exports = router
