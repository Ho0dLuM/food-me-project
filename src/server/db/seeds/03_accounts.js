'use strict'

const faker = require('faker')

function accountPromise (knex) {
  let email = faker.internet.email()
  let split = email.split('@')
  split[0] = split[0] + `.${faker.finance.mask()}`
  let uniqueEmail = split.join('@')
  return knex('accounts').insert({
    email: uniqueEmail,
    password: faker.internet.password(14),
    admin: false
  })
}

exports.seed = function (knex, Promise) {
  let promises = Array.from(Array(150)).map(() => accountPromise(knex))
  return Promise.all(promises)
}
