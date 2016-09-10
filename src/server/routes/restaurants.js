const express = require('express')
const router = express.Router()
const { Address, Employee, Restaurant } = require('../db')
const { cuisines } = require('../config/constants')
const util = require('./util')
const segment = util.segmentBody('restaurant')

router.get('/', getAllRestaurantsRoute)
router.get('/new', newRestaurantRoute)
router.get('/:id', getOneRestaurantRoute)
router.get('/:id/edit', editRestaurantRoute)
router.post('/',
  segment,
  Restaurant.validate,
  Address.validate,
  createRestaurantRoute)
router.put('/:id',
  segment,
  Restaurant.validate,
  Address.validate,
  updateRestaurantRoute)

// ------------------------------------- //

function getAllRestaurantsRoute (req, res, next) {
  Restaurant.get()
  .then(Restaurant.addCuisineName)
  .then(Restaurant.getAddresses)
  .then((restaurants) => res.render('restaurants/index', { restaurants }))
  .catch(util.catchError)
}

function newRestaurantRoute (req, res, next) {
  res.render('restaurants/new', { restaurant: {}, address: {}, cuisines })
}

function getOneRestaurantRoute (req, res, next) {
  Restaurant.get(req.params.id)
  .then(Restaurant.addCuisineName)
  .then(Restaurant.getAddresses)
  .then(Restaurant.getReviews)
  .then(Restaurant.getEmployees)
  .then(Restaurant.getUsersFromReviews)
  .then((restaurants) => {
    let promises = restaurants[0].employees.map(employee => {
      return Employee.get(employee.id)
        .then(Employee.getUsers)
        .then(employee => employee[0])
    })

    return Promise.all(promises).then(employees => {
      restaurants[0].employees = employees
      return restaurants
    })
  })
  .then((restaurants) => {
    let restaurant = restaurants[0]
    res.render('restaurants/show', { restaurant })
  })
  .catch(util.catchError)
}

function editRestaurantRoute (req, res, next) {
  Restaurant.get(req.params.id)
  .then(Restaurant.getAddresses)
  .then((restaurants) => {
    let restaurant = restaurants[0]
    let address = restaurant.addresses[0]
    res.render('restaurants/edit', { restaurant, address, cuisines })
  })
}

function createRestaurantRoute (req, res, next) {
  if (req.body.errors) {
    let { address, errors, restaurant } = req.body
    res.render('restaurants/new', { errors, restaurant, address, cuisines })
  } else {
    Address.create(req.body.address)
    .then(address => {
      req.body.restaurant.address_id = address[0].id
      return Restaurant.create(req.body.restaurant)
    })
    .then(restaurant => res.redirect('/restaurants'))
    .catch(util.catchError(next))
  }
}

function updateRestaurantRoute (req, res, next) {
  if (req.body.errors) {
    let { address, errors, restaurant } = req.body
    res.render('restaurants/edit', { errors, restaurant, address, cuisines })
  } else {
    Address.update(req.body.address)
    .then(address => Restaurant.update(req.body.restaurant))
    .then(restaurant => res.redirect('/restaurants'))
    .catch(util.catchError(next))
  }
}

module.exports = router
