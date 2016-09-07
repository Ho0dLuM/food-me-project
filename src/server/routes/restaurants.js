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

module.exports = router
