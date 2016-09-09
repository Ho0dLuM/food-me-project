const express = require('express')
const router = express.Router()
const { Address, Restaurant } = require('../db')
const util = require('./util')

router.get('/', (req, res, next) => {
  Restaurant.get()
  .then(Restaurant.getAddresses)
  .then((restaurants) => {
    res.render('restaurants/index', { restaurants })
  })
  .catch(util.catchError)
})

router.get('/new', (req, res, next) => {
  res.render('restaurants/new', { restaurant: {}, address: {} })
})

router.get('/:id', (req, res, next) => {
  Restaurant.get(req.params.id)
  .then(Restaurant.getAddresses)
  .then(Restaurant.getReviews)
  .then(Restaurant.getUsersAndAccountsFromReviews)
  .then((restaurants) => {
    let restaurant = restaurants[0]
    res.render('restaurants/show', { restaurant })
  })
  .catch(util.catchError)
})

router.get('/:id/edit', (req, res, next) => {
  Restaurant.get(req.params.id)
  .then(Restaurant.getAddresses)
  .then((restaurants) => {
    let restaurant = restaurants[0]
    res.render('restaurants/edit', { restaurant })
  })
})

router.post('/', util.segmentBody('restaurant'), Restaurant.validate, Address.validate, (req, res, next) => {
  if (req.body.errors) {
    let { address, errors, restaurant } = req.body
    res.render('restaurants/new', { errors, restaurant, address })
  } else {
    Address.create(req.body.address)
    .then(address => {
      req.body.restaurant.address_id = address[0].id
      return Restaurant.create(req.body.restaurant)
        .then(restaurant => {
          restaurant[0].address = address
          return restaurant[0]
        })
    })
    .then(restaurant => res.json(restaurant))
    .catch(util.catchError(next))
  }
})

module.exports = router
