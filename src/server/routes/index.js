const express = require('express')
const router = express.Router()
const { Restaurant } = require('../db')
const { cuisines } = require('../config/constants')

router.get('/', function (req, res, next) {
  Restaurant.get().limit(3)
  .then(Restaurant.addCuisineName)
  .then(Restaurant.getAddresses)
  .then(restaurants => {
    res.render('index', { restaurants })
  })
})

module.exports = router
