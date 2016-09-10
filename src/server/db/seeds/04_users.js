'use strict'

const faker = require('faker')

exports.seed = function (knex, Promise) {
  return knex('accounts').then(accounts => {
    return Promise.all([
      // Inserts seed entries
      knex('users').insert({
        preferred_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        account_id: accounts[0].id
      }),
      knex('users').insert({
        preferred_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        account_id: accounts[1].id
      }),
      knex('users').insert({
        preferred_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        account_id: accounts[2].id
      }),

      // Users who are employees
      knex('users').insert({
        preferred_name: faker.name.firstName(),
        last_name: faker.name.lastName()
      }),
      knex('users').insert({
        preferred_name: faker.name.firstName(),
        last_name: faker.name.lastName()
      }),
      knex('users').insert({
        preferred_name: faker.name.firstName(),
        last_name: faker.name.lastName()
      }),
      knex('users').insert({
        preferred_name: faker.name.firstName(),
        last_name: faker.name.lastName()
      }),
      knex('users').insert({
        preferred_name: faker.name.firstName(),
        last_name: faker.name.lastName()
      }),
      knex('users').insert({
        preferred_name: faker.name.firstName(),
        last_name: faker.name.lastName()
      }),
      knex('users').insert({
        preferred_name: faker.name.firstName(),
        last_name: faker.name.lastName()
      })
    ])
  })
}
