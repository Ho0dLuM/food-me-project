const express = require('express')
const router = express.Router()
const { Restaurant } = require('../db')

router.get('/', function (req, res, next) {
  Restaurant.get({
    address: true
  }).then((restaurants) => {
    res.render('restaurants/index', {
      title: 'restaurants index',
      restaurants
    })
  })
})

module.exports = router
