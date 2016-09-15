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

function findOne (resourceName) {
  return (where) => knex(resourceName).where(where).first()
}

function create (table) {
  return (body) => knex(table).insert(body, '*')
}

function update (table) {
  return (body) => knex(table).update(body, '*').where({ id: body.id })
}

function del (table) {
  return (ids) => {
    if (!Array.isArray(ids)) { ids = [ids] }
    return knex(table).del().whereIn('id', ids)
  }
}

function validate (callback) {
  return (req, res, next) => {
    let errors = []
    callback(errors, req.body)

    if (errors.length) {
      req.body.errors = req.body.errors || []
      req.body.errors = req.body.errors.concat(errors)
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
    let ids = resources.map(resource => resource[primary.key])
    let secondaries = knex(table).whereIn(foreign.key, ids)

    return secondaries
      .then(compose(resources, table, primary.resource, foreign.resource))
  }
}

/***
  the getRelated function takes a primary resource with an existing association and nests data related to that association. That is, it creates a structure like the following:

  {
    primary: {
      secondaries: [
        {
          secondary_name: '',
          related: [
            { related_name: '' }
          ]
        }
      ]
    }
  }

  It is intended be used as so:

  Restaurant.get()
    .then(Restaurant.getReviews())
    .then(Restaurant.getUsersThroughReviews)
***/

function getRelated ({ related, through }) {
  return (primaryResources) => {
    let [primary] = primaryResources
    let promises = primary[through.table].map(throughResource => {
      return knex(through.table).where('id', throughResource.id).first()
        .then(resource => {
          return knex(related.table)
          .where(related.key, throughResource[through.key])
        })
    })

    return Promise.all(promises).then(relatedResources => {
      relatedResources.forEach((rows, i) => {
        primary[through.table][i][related.table] = rows
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
  get, findOne, create, update, del, validate, getResource, getRelated, compose
}
