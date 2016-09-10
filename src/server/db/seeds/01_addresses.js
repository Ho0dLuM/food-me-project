'use strict'

const faker = require('faker')

function addressPromise (knex) {
  return knex('addresses').insert({
    line_1: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zip: faker.address.zipCode().split('-')[0]
  })
}

exports.seed = function (knex, Promise) {
  let promises = Array.from(Array(60)).map(() => addressPromise(knex))
  return Promise.all(promises)
}
