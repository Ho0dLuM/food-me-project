const Promise = require('bluebird')
const express = require('express')
const router = express.Router({ mergeParams: true })
const { Restaurant, Review, User } = require('../db')
const util = require('./util')
const segment = util.segmentBody('review')

router.get('/new', newReviewRoute)
router.get('/:id/edit', editReviewRoute)
router.post('/',
  segment,
  Review.validate,
  createReviewRoute)
router.put('/:id',
  segment,
  Review.validate,
  updateReviewRoute)

// ------------------------------------- //

function newReviewRoute (req, res, next) {
  Restaurant.get(req.params.restaurantId)
  .then(restaurants => {
    let restaurant = restaurants[0]
    return User.get()
    .then(users => {
      let user = users[0] // dummy user for now
      return Promise.resolve({ restaurant, user })
    })
  })
  .then(({ restaurant, user }) => {
    res.render('reviews/new', {
      restaurant, user, review: {}
    })
  })
}

function editReviewRoute (req, res, next) {
  let { restaurantId, id } = req.params
  Restaurant.get(restaurantId)
  .then(restaurants => {
    let restaurant = restaurants[0]
    return Review.get(id).then(reviews => {
      let review = reviews[0]
      return Promise.resolve({ restaurant, review })
    })
  })
  .then(({ restaurant, review }) => {
    return User.get()
    .then(users => {
      let user = users[0] // dummy user for now
      return Promise.resolve({ restaurant, review, user })
    })
  })
  .then(({ restaurant, review, user }) => {
    res.render('reviews/edit', {
      restaurant, user, review
    })
  })
}

function createReviewRoute (req, res, next) {
  if (req.body.errors) {
    Restaurant.get(req.body.restaurantId)
    .then(restaurants => {
      let restaurant = restaurants[0]
      return User.get(req.body.user_id)
      .then(users => {
        let user = users[0] // dummy user for now
        return Promise.resolve({ restaurant, user })
      })
    })
    .then(({ restaurant, user }) => {
      let { errors, review } = req.body
      res.render('reviews/new', { errors, restaurant, review, user })
    })
  } else {
    Review.create(req.body.review)
    .then(reviews => res.redirect(`/restaurants/${reviews[0].restaurant_id}`))
    .catch(util.catchError(next))
  }
}

function updateReviewRoute (req, res, next) {
  if (req.body.errors) {
    Restaurant.get(req.body.restaurantId)
    .then(restaurants => {
      let restaurant = restaurants[0]
      return User.get(req.body.user_id)
      .then(users => {
        let user = users[0] // dummy user for now
        return Promise.resolve({ restaurant, user })
      })
    })
    .then(({ restaurant, user }) => {
      let { errors, review } = req.body
      res.render('reviews/edit', { errors, restaurant, review, user })
    })
  } else {
    Review.update(req.body.review)
    .then(reviews => res.redirect(`/restaurants/${reviews[0].restaurant_id}`))
    .catch(util.catchError(next))
  }
}

module.exports = router
