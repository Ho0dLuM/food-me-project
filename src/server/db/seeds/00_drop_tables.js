'use strict'

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('restaurants').del()
    .then(() => knex('addresses').del())
    .then(() => knex('accounts').del())
}
