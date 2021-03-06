(function (appConfig) {
  'use strict'

  // *** main dependencies *** //
  const path = require('path')
  const cookieParser = require('cookie-parser')
  const bodyParser = require('body-parser')
  const session = require('express-session')
  const flash = require('express-flash')
  const morgan = require('morgan')
  const nunjucks = require('nunjucks')
  const favicon = require('serve-favicon')
  const methodOverride = require('method-override')

  // *** view folders *** //
  const viewFolders = [
    path.join(__dirname, '..', 'views')
  ]

  // *** load environment variables *** //
  require('dotenv').config()

  appConfig.init = function (app, express) {
    // *** view engine *** //
    const nunjucksEnv = nunjucks.configure(viewFolders, {
      express: app,
      autoescape: true
    })
    nunjucksEnv.addFilter('date', require('nunjucks-date-filter'))
    app.set('view engine', 'njk')

    // *** app middleware *** //
    if (process.env.NODE_ENV !== 'test') {
      app.use(morgan('dev'))
    }

    app.use(favicon(path.join(__dirname, '..', '..', 'client', 'images', 'favicon.ico')))
    app.use(cookieParser())
    app.use(methodOverride('_method'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(flash())
    app.use(express.static(path.join(__dirname, '..', '..', 'client')))
    app.use(session({
      secret: process.env.SECRET_KEY,
      resave: true,
      saveUninitialized: true
    }))
  }
})(module.exports)
