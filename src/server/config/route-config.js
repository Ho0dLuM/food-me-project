(function (routeConfig) {
  'use strict'

  routeConfig.init = function (app) {
    // *** routes *** //
    const routes = require('../routes/index')
    const restaurants = require('../routes/restaurants')
    const employees = require('../routes/employees')
    const reviews = require('../routes/reviews')
    const auth = require('../routes/auth')

    // *** register routes *** //
    app.use('/', routes)
    app.use('/', auth)
    app.use('/restaurants', restaurants)
    app.use('/restaurants/:restaurantId/employees', employees)
    app.use('/restaurants/:restaurantId/reviews', reviews)
  }
})(module.exports)
