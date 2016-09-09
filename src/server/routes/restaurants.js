const express = require('express')
const router = express.Router()
const { Address, Restaurant } = require('../db')

function parseGroups (body) {
  return Object.keys(body)
    .filter(key => key.includes('['))
    .map(key => key.split('[')[0])
    .reduce((acc, key) => acc.includes(key) ? acc : acc.concat([key]), [])
}

function segmentBody (resource) {
  return (req, res, next) => {
    let groupings = parseGroups(req.body)
    let body = Object.assign({}, req.body)
    req.body = groupings.concat(['']).reduce((acc, prefix) => {
      acc[prefix] = {}

      Object.keys(body)
        .filter(key => key.indexOf(`${prefix}`) === 0)
        .forEach(key => {
          let split = key.split('[')
          let newKey = split[1] ? split[1].slice(0, -1) : key
          acc[prefix][newKey] = body[key]
          delete body[key]
        })

      return acc
    }, {})

    req.body[resource] = Object.assign({}, req.body[''])
    delete req.body['']

    next()
  }
}

router.get('/', (req, res, next) => {
  Restaurant.get()
  .then(Restaurant.getAddresses)
  .then((restaurants) => {
    res.render('restaurants/index', { restaurants })
  })
  .catch(next)
})

router.get('/new', (req, res, next) => {
  res.render('restaurants/new', { restaurant: {} })
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
  .catch((err) => {
    console.log(err)
    next(err)
  })
})

router.get('/:id/edit', (req, res, next) => {
  Restaurant.get(req.params.id)
  .then(Restaurant.getAddresses)
  .then((restaurants) => {
    let restaurant = restaurants[0]
    res.render('restaurants/edit', { restaurant })
  })
})

router.post('/', segmentBody('restaurant'), (req, res, next) => {
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
  .catch((err) => {
    console.log(err)
    next(err)
  })
})

module.exports = router
