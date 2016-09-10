// CUISINE_TYPES = [ 'american', 'italian', 'mexican', 'thai' ]
'use strict'

const _ = require('lodash')
const faker = require('faker')

exports.seed = function (knex, Promise) {
  return knex('addresses').then(addresses => {
    return Promise.all([
      // Inserts seed entries
      knex('restaurants').insert({
        name: `${faker.name.firstName()}'s`,
        description: faker.lorem.paragraph(),
        cuisine_type: faker.random.number(2),
        address_id: addresses[0].id
      }),
      knex('restaurants').insert({
        name: `${faker.name.firstName()}'s`,
        description: faker.lorem.paragraph(),
        cuisine_type: faker.random.number(2),
        address_id: addresses[1].id
      }),
      knex('restaurants').insert({
        name: `${faker.name.firstName()}'s`,
        description: faker.lorem.paragraph(),
        cuisine_type: faker.random.number(2),
        address_id: addresses[2].id
      }),
      knex('restaurants').insert({
        name: `${faker.name.firstName()}'s`,
        description: faker.lorem.paragraph(),
        cuisine_type: faker.random.number(2),
        address_id: addresses[3].id
      }),
      knex('restaurants').insert({
        name: `${faker.name.firstName()}'s`,
        description: faker.lorem.paragraph(),
        cuisine_type: faker.random.number(2),
        address_id: addresses[3].id
      })
    ])
  })
}
