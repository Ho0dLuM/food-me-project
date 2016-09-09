'use strict'

const faker = require('faker')

exports.seed = function (knex, Promise) {
  return Promise.all([
    // Inserts seed entries
    knex('addresses').insert({
      line_1: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zip: faker.address.zipCode().split('-')[0]
    }),
    knex('addresses').insert({
      line_1: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zip: faker.address.zipCode().split('-')[0]
    }),
    knex('addresses').insert({
      line_1: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zip: faker.address.zipCode().split('-')[0]
    })
  ])
}
