'use strict'

const faker = require('faker')

exports.seed = function (knex, Promise) {
  return Promise.all([knex('restaurants'), knex('users')]).then(data => {
    let [restaurants, users] = data
    return Promise.all([
      // Inserts seed entries
      knex('reviews').insert({
        content: faker.lorem.sentences(10),
        rating: faker.random.number(4) + 1,
        restaurant_id: restaurants[0].id,
        user_id: users[0].id
      }),
      knex('reviews').insert({
        content: faker.lorem.sentences(10),
        rating: faker.random.number(4) + 1,
        restaurant_id: restaurants[0].id,
        user_id: users[1].id
      }),
      knex('reviews').insert({
        content: faker.lorem.sentences(10),
        rating: faker.random.number(4) + 1,
        restaurant_id: restaurants[1].id,
        user_id: users[1].id
      }),
      knex('reviews').insert({
        content: faker.lorem.sentences(10),
        rating: faker.random.number(4) + 1,
        restaurant_id: restaurants[2].id,
        user_id: users[1].id
      }),
      knex('reviews').insert({
        content: faker.lorem.sentences(10),
        rating: faker.random.number(4) + 1,
        restaurant_id: restaurants[0].id,
        user_id: users[2].id
      })
    ])
  })
}
