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

// Take in an options object with a related and through key.
// Through is the middle association (reviews in the above example)
// while related is the final destination (users in the above example)
function getRelated ({ related, through }) {
  // Return a function that takes an array of primary resources
  return (primaryResources) => {
    // Reduce over the primary resources, starting with an empty array
    let relatedPromises = primaryResources.reduce((promises, primary) => {
      // Access the secondary resources nested inside the primary resource.
      // For example, if primary is a single restaurant grab the `reviews`
      // key inside of it (i.e. `restaurant.reviews`) and then map over those // nested resources
      let resourcePromises = primary[through.table].map(resource => {
        // Make a query to the secondary table based on the secondary resources
        // id and get each one back. In the above example, this is like getting
        // all the users based on the review's user_id.
        return knex(related.table).where(related.key, resource[through.key])
      })

      // Push all of those promises (i.e. for users) into the larger
      // collection array after calling Promise.all on them. This makes
      // sure the collection of related resources is at the same array
      // index as the through resources
      promises.push(Promise.all(resourcePromises))
      return promises
    }, [])

    // What we have now is an array of `Promise.all`s, within which is an array
    // of those related resources, which is also an array. We now just need
    // to match everything back up to where it came from.
    return Promise.all(relatedPromises).then(allRelatedResources => {
      // Loop over each set of resources
      allRelatedResources.forEach((relatedResources, i) => {
        // Secondaries is a pointer to where the secondary resources are stored.
        // For example, all reviews associated with each restaurant.
        let secondaries = primaryResources[i][through.table]

        // Get inside the through resource and attach the related resources
        // on a key with the related table's name
        relatedResources.forEach((relatedResourceRow, j) => {
          let secondary = secondaries[j]
          secondary[related.table] = relatedResourceRow
        })
      })

      // Send it all back!
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
