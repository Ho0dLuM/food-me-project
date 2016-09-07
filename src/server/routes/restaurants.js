const express = require('express')
const router = express.Router()
const { Restaurant } = require('../db')

router.get('/', (req, res, next) => {
  Restaurant.get()
  .then(Restaurant.getAddresses)
  .then((restaurants) => {
    res.render('restaurants/index', { restaurants })
  })
  .catch(next)
})

router.get('/:id', (req, res, next) => {
  Restaurant.get(req.params.id)
  .then(Restaurant.getAddresses)
  .then((restaurants) => {
    let restaurant = restaurants[0]
    res.render('restaurants/show', { restaurant })
  })
  .catch(next)
})

module.exports = router
