'use strict'

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('reviews').del()
    .then(() => knex('restaurants').del())
    .then(() => knex('addresses').del())
    .then(() => knex('reviews').del())
    .then(() => knex('users').del())
    .then(() => knex('accounts').del())
}
