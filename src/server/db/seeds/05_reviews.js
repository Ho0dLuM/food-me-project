'use strict'

const faker = require('faker')

function reviewPromise (knex, restaurant, user) {
  return knex('reviews').insert({
    content: faker.lorem.sentences(10),
    rating: faker.random.number(4) + 1,
    restaurant_id: restaurant.id,
    user_id: user.id
  })
}

exports.seed = function (knex, Promise) {
  return Promise.all([
    knex('restaurants'),
    knex('users')
  ])
  .then(([restaurants, users]) => {
    let promises = Array.from(Array(users.length * 2))
      .map((el, i) => {
        let rRand = faker.random.number(restaurants.length - 1)
        let restaurant = restaurants[rRand]

        let uRand = faker.random.number(users.length - 1)
        let user = users[uRand]

        return reviewPromise(knex, restaurant, user)
      })

    return Promise.all(promises)
  })
}
