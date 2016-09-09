const Promise = require('bluebird')
const knex = require('../connection')

function get (resourceName) {
  return (ids) => {
    let resources = knex(resourceName)

    if (ids) {
      if (!Array.isArray(ids)) { ids = [ids] }
      resources = resources.whereIn('id', ids)
    }

    return resources
  }
}

function create (table) {
  return (body) => {
    return knex(table).insert(body, '*')
  }
}

function update (table) {
  return (body) => {
    return knex(table).update(body).where({ id: body.id })
  }
}

function validate (callback) {
  return (req, res, next) => {
    let errors = []
    callback(errors, req.body)

    if (errors.length) {
      if (req.body.errors) {
        req.body.errors = req.body.errors.concat(errors)
      } else {
        req.body.errors = errors
      }
    }

    next()
  }
}

/***
  the getResource() function takes a number of option arguments to create a link between the primary resource and a secondary resource. It essentially joins the two records together by stating which ids should be matching but does so without re-querying the original set of data.

  It is intended to be used as so:

  Restaurant.get()
    .then(Restaurant.getReviews())

  >> [{ id: 1, name: 'Restaurant 1', reviews: [...]}]
***/

function getResource ({ table, primary, foreign }) {
  return (resources) => {
    let ids = resources.map((resource) => resource[primary.key])
    let secondaries = knex(table).whereIn(foreign.key, ids)

    return secondaries
      .then(compose(resources, table, primary.resource, foreign.resource))
  }
}

/***
  the getJoin() function is intended to be used after the getResource() function. You pass the table name of the resources you just received and a set of paths that tell you where you'd like to innerJoin. The intention is to make it easier to grab a deep structure of subqueries and attach to what is necessary.

  It is intended to be used as so:

  Restaurant = {
    ...,
    getUsersFromReviews: getJoin({
      table: 'reviews',
      paths: [
        ['users', 'users.id', 'reviews.user_id']
      ]
    })
  }

  Restaurant.get()
    .then(Restaurant.getReviews())
    .then(Restaurants.getUsersFromReviews())

  >> [{ id: 1, name: 'Restaurant 1', reviews: [{ email: '', ...}]}]

  Note: This means it will return a flat array of potential dupes if there are multiple relationships between the joined resources.
***/

function getJoin ({ table, paths }) {
  return (primaryResources) => {
    let allResources = primaryResources.map(resource => resource[table])
    let promises = allResources.map(resources => {
      let ids = resources.map(resource => resource.id)
      return paths.reduce((query, join) => {
        let [joinTable, primary, foreign] = join
        return query.innerJoin(joinTable, primary, foreign)
      }, knex(table)).whereIn(`${table}.id`, ids)
    })

    return Promise.all(promises).then(resources => {
      primaryResources.forEach((resource, i) => {
        resource[table] = resources[i]
      })
      return Promise.resolve(primaryResources)
    })
  }
}

/***
  the compose() function takes some set of outer data (e.g. all restaurants)
  and possible foreign keys and returns a new function that takes some set of
  related data (e.g. related reviews) and combines them together in the primary resource.

  For example, if primaries was a set of all restaurants and secondaries was a set of all reviews, primaryName would be 'restaurant' and secondaryName
  would be 'review'.

  The two sets of arrays are then compared and where a match is found a new key of 'reviews' would be set to be an array of all those rows that match the
  restaurant
***/

function compose (primaries, relationName, primaryName, secondaryName) {
  return (secondaries) => {
    let primaryId = `${primaryName}_id`
    let secondaryId = `${secondaryName}_id`

    primaries.forEach((primary) => {
      let row = secondaries.filter((secondary) => {
        return (primary[secondaryId] === secondary.id) ||
          (secondary[primaryId] === primary.id)
      })

      primary[relationName] = row
    })

    return Promise.resolve(primaries)
  }
}

module.exports = {
  get, create, update, validate, getResource, getJoin, compose
}
