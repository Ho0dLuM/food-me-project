'use strict'

const faker = require('faker')

exports.seed = function (knex, Promise) {
  return Promise.all([
    // Inserts seed entries
    knex('reviews').insert({
      id: 1,
      content: faker.lorem.sentences(10),
      rating: faker.random.number(4) + 1,
      restaurant_id: 1,
      user_id: 1
    }),
    knex('reviews').insert({
      id: 2,
      content: faker.lorem.sentences(10),
      rating: faker.random.number(4) + 1,
      restaurant_id: 1,
      user_id: 2
    }),
    knex('reviews').insert({
      id: 3,
      content: faker.lorem.sentences(10),
      rating: faker.random.number(4) + 1,
      restaurant_id: 2,
      user_id: 2
    }),
    knex('reviews').insert({
      id: 4,
      content: faker.lorem.sentences(10),
      rating: faker.random.number(4) + 1,
      restaurant_id: 3,
      user_id: 2
    }),
    knex('reviews').insert({
      id: 5,
      content: faker.lorem.sentences(10),
      rating: faker.random.number(4) + 1,
      restaurant_id: 1,
      user_id: 3
    })
  ])
}
