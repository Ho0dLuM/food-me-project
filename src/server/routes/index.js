const express = require('express')
const router = express.Router()
const { Restaurant } = require('../db')

router.get('/', function (req, res, next) {
  Restaurant.get().limit(3)
  .then(Restaurant.getAddresses)
  .then(restaurants => {
    let cuisines = [ 'american', 'italian', 'mexican', 'thai' ]
    restaurants = restaurants.map(restaurant => {
      restaurant.cuisine = cuisines[restaurant.cuisine_type]
      return restaurant
    })
    res.render('index', { restaurants })
  })
})

module.exports = router
