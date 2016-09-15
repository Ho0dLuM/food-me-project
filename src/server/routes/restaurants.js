const express = require('express')
const router = express.Router()
const { Auth, Address, Employee, Restaurant, Review } = require('../db')
const { CUISINES } = require('../config/constants')
const util = require('./util')
const segment = util.segmentBody('restaurant')

router.get('/', getAllRestaurantsRoute)
router.get('/new', Auth.adminRequired, newRestaurantRoute)
router.get('/:id', getOneRestaurantRoute)
router.get('/:id/edit',
  Auth.adminRequired,
  editRestaurantRoute)
router.post('/',
  Auth.adminRequired,
  segment,
  Restaurant.validate,
  Address.validate,
  createRestaurantRoute)
router.put('/:id',
  Auth.adminRequired,
  segment,
  Restaurant.validate,
  Address.validate,
  updateRestaurantRoute)
router.delete('/:id',
  Auth.adminRequired,
  deleteRestaurantRoute)

// ------------------------------------- //

function getAllRestaurantsRoute (req, res, next) {
  Restaurant.get().orderBy('name', 'ASC')
  .then(Restaurant.addCuisineName)
  .then(Restaurant.getAddresses)
  .then(Restaurant.getReviews)
  .then(Restaurant.calculateRating)
  .then((restaurants) => res.render('restaurants/index', { restaurants }))
  .catch(util.catchError)
}

function newRestaurantRoute (req, res, next) {
  res.render('restaurants/new', { restaurant: {}, address: {}, CUISINES })
}

function getOneRestaurantRoute (req, res, next) {
  Restaurant.get(req.params.id)
  .then(Restaurant.addCuisineName)
  .then(Restaurant.getAddresses)
  .then(Restaurant.getReviews)
  .then(Restaurant.getUsersThroughReviews)
  .then(Restaurant.calculateRating)
  .then(Restaurant.getEmployees)
  .then(Restaurant.getUsersThroughEmployees)
  .then(([restaurant]) => res.render('restaurants/show', { restaurant }))
  .catch(util.catchError)
}

function editRestaurantRoute (req, res, next) {
  Restaurant.get(req.params.id)
  .then(Restaurant.getAddresses)
  .then(([restaurant]) => {
    let [address] = restaurant.addresses
    res.render('restaurants/edit', { restaurant, address, CUISINES })
  })
}

function createRestaurantRoute (req, res, next) {
  if (req.body.errors) {
    let { address, errors, restaurant } = req.body
    restaurant.cuisine_type = parseInt(restaurant.cuisine_type)
    res.render('restaurants/new', { errors, restaurant, address, CUISINES })
  } else {
    Address.create(req.body.address)
    .then(([address]) => {
      req.body.restaurant.address_id = address.id
      return Restaurant.create(req.body.restaurant)
    })
    .then(restaurant => res.redirect(`/restaurants/${restaurant[0].id}`))
    .catch(util.catchError(next))
  }
}

function updateRestaurantRoute (req, res, next) {
  if (req.body.errors) {
    let { address, errors, restaurant } = req.body
    restaurant.cuisine_type = parseInt(restaurant.cuisine_type)
    res.render('restaurants/edit', { errors, restaurant, address, CUISINES })
  } else {
    Address.update(req.body.address)
    .then(address => Restaurant.update(req.body.restaurant))
    .then(([restaurant]) => res.redirect(`/restaurants/${restaurant.id}`))
    .catch(util.catchError(next))
  }
}

function deleteRestaurantRoute (req, res, next) {
  Restaurant.get(req.params.id)
  .then(Restaurant.getAddresses)
  .then(Restaurant.getReviews)
  .then(Restaurant.getEmployees)
  .then(([restaurant]) => {
    let [address] = restaurant.addresses
    let delEmps = restaurant.employees.map(emp => Employee.del(emp.id))
    let delReviews = restaurant.reviews.map(review => Review.del(review.id))
    let deletions = delEmps.concat(delReviews)

    return Promise.all(deletions)
    .then(() => Restaurant.del(restaurant.id))
    .then(() => Address.del(address.id))
  })
  .then(() => res.json({ message: `Restaurant deleted.` }))
  .catch((error) => res.status(500).json({ error }))
}

module.exports = router
