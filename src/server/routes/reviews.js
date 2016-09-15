const express = require('express')
const router = express.Router({ mergeParams: true })
const { Auth, Restaurant, Review } = require('../db')
const util = require('./util')
const segment = util.segmentBody('review')

router.get('/new',
  Auth.loginRequired,
  newReviewRoute)
router.get('/:id/edit',
  Auth.loginRequired,
  editReviewRoute)
router.post('/',
  Auth.loginRequired,
  segment,
  Review.validate,
  createReviewRoute)
router.put('/:id',
  Auth.loginRequired,
  segment,
  Review.validate,
  updateReviewRoute)

// ------------------------------------- //

function newReviewRoute (req, res, next) {
  Restaurant.get(req.params.restaurantId)
  .then(([restaurant]) => {
    let { user } = req
    res.render('reviews/new', {
      restaurant, user, review: {}
    })
  })
}

function editReviewRoute (req, res, next) {
  Review.get(req.params.id)
  .then(Review.getRestaurants)
  .then(([review]) => {
    let [restaurant] = review.restaurants
    let { user } = req

    if (req.user.id !== parseInt(review.user_id)) {
      req.flash('error', 'You can\'t access that page.')
      res.redirect('/restaurants')
    } else {
      res.render('reviews/edit', {
        restaurant, user, review
      })
    }
  })
}

function createReviewRoute (req, res, next) {
  if (req.body.errors) {
    Restaurant.get(req.body.restaurantId)
    .then(([restaurant]) => {
      let { user } = req
      let { errors, review } = req.body
      res.render('reviews/new', { errors, restaurant, review, user })
    })
  } else {
    let { review } = req.body
    if (req.user.id !== parseInt(review.user_id)) {
      req.flash('error', 'You can\'t access that page.')
      res.redirect('/restaurants')
    } else {
      Review.create(review)
      .then(([review]) => res.redirect(`/restaurants/${review.restaurant_id}`))
      .catch(util.catchError(next))
    }
  }
}

function updateReviewRoute (req, res, next) {
  if (req.body.errors) {
    Review.get(req.params.id)
    .then(Review.getRestaurants)
    .then(([{ restaurants: [restaurant] }]) => {
      let { user } = req
      let { errors, review } = req.body

      res.render('reviews/edit', { errors, restaurant, review, user })
    })
  } else {
    let { review } = req.body
    if (req.user.id !== parseInt(review.user_id)) {
      req.flash('error', 'You can\'t access that page.')
      res.redirect('/restaurants')
    } else {
      Review.update(review)
      .then(([review]) => res.redirect(`/restaurants/${review.restaurant_id}`))
      .catch(util.catchError(next))
    }
  }
}

module.exports = router
