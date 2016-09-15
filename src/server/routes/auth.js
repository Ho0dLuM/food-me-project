const express = require('express')
const router = express.Router({ mergeParams: true })
const passport = require('passport')
const bcrypt = require('bcryptjs')
const { Auth, Account, User } = require('../db')
const util = require('./util')
const segment = util.segmentBody('user')

router.get('/signup', Auth.noLoginRequired, newUserRoute)
router.get('/login', Auth.noLoginRequired, newSessionRoute)
router.post('/users',
  Auth.noLoginRequired,
  segment,
  User.validate,
  createUserRoute)
router.post('/login',
  Auth.noLoginRequired,
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
  }),
  createSessionRoute)
router.get('/logout', Auth.loginRequired, deleteSessionRoute)

// ------------------------------------- //

function newUserRoute (req, res, next) {
  res.render('auth/signup', { account: {}, user: {} })
}

function newSessionRoute (req, res, next) {
  res.render('auth/login', { account: {} })
}

function createUserRoute (req, res, next) {
  if (req.body.errors) {
    let { account, errors, user } = req.body
    res.render('auth/signup', { account, errors, user })
  } else {
    let { account, user } = req.body
    account.password = bcrypt.hashSync(account.password, 8)
    Account.create(req.body.account)
    .then(([account]) => {
      user.account_id = account.id
      return User.create(user)
    })
    .then(users => res.redirect(`/login`))
    .catch(util.catchError(next))
  }
}

function createSessionRoute (req, res, next) {
  res.redirect('/restaurants')
}

function deleteSessionRoute (req, res, next) {
  req.logout()
  res.redirect('/restaurants')
}

module.exports = router
