const express = require('express')
const router = express.Router()
const { Restaurant } = require('../db')

router.get('/', function (req, res, next) {
  Restaurant.get().limit(3)
  .then(Restaurant.addCuisineName)
  .then(Restaurant.addAddresses)
  .then(restaurants => {
    res.render('index', { restaurants })
  })
})

module.exports = router
