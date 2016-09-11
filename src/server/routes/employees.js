const express = require('express')
const router = express.Router({ mergeParams: true })
const { Employee, User } = require('../db')
const util = require('./util')
const segment = util.segmentBody('employee')

router.get('/new', newEmployeeRoute)
router.get('/:id/edit', editEmployeeRoute)
router.post('/',
  segment,
  Employee.validate,
  User.validate,
  createEmployeeRoute)
router.put('/:id',
  segment,
  Employee.validate,
  User.validate,
  updateEmployeeRoute)
router.delete('/:id', deleteEmployeeRoute)

// ------------------------------------- //

function newEmployeeRoute (req, res, next) {
  res.render('employees/new', {
    employee: { restaurant_id: req.params.restaurantId },
    user: {}
  })
}

function createEmployeeRoute (req, res, next) {
  if (req.body.errors) {
    let { employee, errors, user } = req.body
    res.render('employees/new', { employee, errors, user })
  } else {
    User.create(req.body.user)
    .then(user => {
      req.body.employee.user_id = user[0].id
      return Employee.create(req.body.employee)
    })
    .then(employee => res.redirect(`/restaurants/${employee[0].restaurant_id}`))
    .catch(util.catchError(next))
  }
}

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
    let { employee, errors, user } = req.body
    res.render('employees/edit', { errors, employee, user })
  } else {
    User.update(req.body.user)
    .then(user => Employee.update(req.body.employee))
    .then(employee => res.redirect(`/restaurants/${employee[0].restaurant_id}`))
    .catch(util.catchError(next))
  }
}

function deleteEmployeeRoute (req, res, next) {
  Employee.get(req.params.id)
  .then(([employee]) => Employee.del(employee.id))
  .then(() => res.json({ message: `Employee deleted.` }))
  .catch((err) => res.status(500).json({ err }))
}

module.exports = router
