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

    let { restaurants } = review
    let restaurant = restaurants[0]
    let { user } = req

    if (req.user.id !== +review.user_id) {
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
    .then(restaurants => {
      let restaurant = restaurants[0]
      let { user } = req
      let { errors, review } = req.body
      res.render('reviews/new', { errors, restaurant, review, user })
    })
  } else {
    let { review } = req.body
    if (req.user.id !== +review.user_id) {
      req.flash('error', 'You can\'t access that page.')
      res.redirect('/restaurants')
    } else {
      Review.create(review)
      .then(reviews => res.redirect(`/restaurants/${reviews[0].restaurant_id}`))
      .catch(util.catchError(next))
    }
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
    let { review } = req.body
    if (req.user.id !== +review.user_id) {
      req.flash('error', 'You can\'t access that page.')
      res.redirect('/restaurants')
    } else {
      Review.update(review)
      .then(reviews => res.redirect(`/restaurants/${reviews[0].restaurant_id}`))
      .catch(util.catchError(next))
    }
  }
}

module.exports = router
