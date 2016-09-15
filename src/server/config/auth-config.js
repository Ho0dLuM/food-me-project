(function (authConfig) {
  const passport = require('passport')
  const bcrypt = require('bcryptjs')
  const { Account, User } = require('../db')

  authConfig.init = (app) => {
    app.use(passport.initialize())
    app.use(passport.session())
    app.use((req, res, next) => {
      app.locals.currentUser = req.user ? req.user : null
      next()
    })

    passport.serializeUser((account, done) => {
      // later this will be where you selectively send to the browser an identifier for your user, like their primary key from the database, or their ID from linkedin

      User.findOne({ account_id: account.id })
      .then(user => {
        let ids = { user_id: user.id, account_id: account.id }
        return done(null, ids)
      })
    })

    passport.deserializeUser((ids, done) => {
      // here is where you will go to the database and get the user each time from it's id, after you set up your db

      User.get(ids.user_id)
      .then(users => {
        return Account.get(ids.account_id)
        .then(accounts => {
          let user = users[0]
          let account = accounts[0]

          delete account.password
          user.account = account

          return done(null, user)
        })
      })
    })

    const LocalStrategy = require('passport-local').Strategy
    let usernameField = 'email'
    passport.use(new LocalStrategy({ usernameField },
      (email, password, done) => {
        return Account.findOne({ email })
        .then(user => {
          if (!user) {
            done(null, false, { message: 'Incorrect username.' })
          }
          if (!bcrypt.compareSync(password, user.password)) {
            done(null, false, { message: 'Incorrect password.' })
          }
          delete user.password
          done(null, user)
          return null
        })
        .catch(err => done(err))
      }))
  }
})(module.exports)
