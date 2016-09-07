// CUISINE_TYPES = [ 'american', 'italian', 'mexican', 'thai' ]
'use strict'

const _ = require('lodash')
const faker = require('faker')

exports.seed = function (knex, Promise) {
  return Promise.all([
    // Inserts seed entries
    knex('restaurants').insert({
      id: 1,
      name: `The ${_.capitalize(faker.company.bsAdjective())} Restaurant`,
      description: faker.lorem.paragraph(),
      cuisine_type: faker.random.number(2),
      address_id: 1
    }),
    knex('restaurants').insert({
      id: 2,
      name: `The ${_.capitalize(faker.company.bsAdjective())} Restaurant`,
      description: faker.lorem.paragraph(),
      cuisine_type: faker.random.number(2),
      address_id: 2
    }),
    knex('restaurants').insert({
      id: 3,
      name: `The ${_.capitalize(faker.company.bsAdjective())} Restaurant`,
      description: faker.lorem.paragraph(),
      cuisine_type: faker.random.number(2),
      address_id: 3
    })
  ])
}
