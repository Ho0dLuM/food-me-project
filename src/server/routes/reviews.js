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
    let { user } = req
    res.render('reviews/new', {
      restaurant, user, review: {}
    })
  })
}

function editReviewRoute (req, res, next) {
  Review.get(req.params.id)
  .then(Review.getRestaurants)
  .then(reviews => {
    let review = reviews[0]

    let { restaurants, users } = review
    let restaurant = restaurants[0]
    let { user } = req

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
      let { user } = req
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
    Review.get(req.params.id)
    .then(Review.getRestaurants)
    .then(reviews => {
      let { user } = req
      let { restaurants } = reviews[0]
      let { errors, review } = req.body
      let restaurant = restaurants[0]
      
      res.render('reviews/edit', { errors, restaurant, review, user })
    })
  } else {
    Review.update(req.body.review)
    .then(reviews => res.redirect(`/restaurants/${reviews[0].restaurant_id}`))
    .catch(util.catchError(next))
  }
}

module.exports = router
