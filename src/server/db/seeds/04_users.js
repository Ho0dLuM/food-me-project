'use strict'

const faker = require('faker')

function userPromise (knex, account) {
  return knex('users').insert({
    preferred_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    account_id: account.id
  })
}

exports.seed = function (knex, Promise) {
  return knex('accounts').then(accounts => {
    let promises = Array.from(Array(accounts.length - 1))
      .map((el, i) => {
        let account = accounts[i]
        return userPromise(knex, account)
      })

    return Promise.all(promises)
  })
}
