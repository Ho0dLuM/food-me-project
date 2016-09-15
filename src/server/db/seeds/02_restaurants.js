'use strict'

const { CUISINES } = require('../../config/constants')
const faker = require('faker')

function restaurantPromise (knex, address) {
  return knex('restaurants').insert({
    name: `${faker.name.firstName()}'s`,
    description: faker.lorem.paragraph(),
    cuisine_type: faker.random.number(CUISINES.length - 1),
    address_id: address.id
  })
}

exports.seed = function (knex, Promise) {
  return knex('addresses').then(addresses => {
    let promises = Array.from(Array(addresses.length - 1))
      .map((el, i) => {
        let address = addresses[i]
        return restaurantPromise(knex, address)
      })

    return Promise.all(promises)
  })
}
