'use strict'

const faker = require('faker')

exports.seed = function (knex, Promise) {
  return Promise.all([
    // Inserts seed entries
    knex('users').insert({
      id: 1,
      preferred_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      account_id: 1
    }),
    knex('users').insert({
      id: 2,
      preferred_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      account_id: 2
    }),
    knex('users').insert({
      id: 3,
      preferred_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      account_id: 3
    })
  ])
}
