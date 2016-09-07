'use strict'

const faker = require('faker')

exports.seed = function (knex, Promise) {
  return Promise.all([
    // Inserts seed entries
    knex('accounts').insert({
      id: 1,
      email: faker.internet.email(),
      password: faker.internet.password(10),
      admin: true
    }),
    knex('accounts').insert({
      id: 2,
      email: faker.internet.email(),
      password: faker.internet.password(10),
      admin: false
    }),
    knex('accounts').insert({
      id: 3,
      email: faker.internet.email(),
      password: faker.internet.password(10),
      admin: false
    })
  ])
}
