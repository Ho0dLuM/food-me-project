'use strict'

exports.up = function (knex, Promise) {
  return knex.schema.table('restaurants', (table) => {
    table.integer('address_id').references('id').inTable('addresses')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('restaurants', (table) => {
    table.dropColumn('address_id')
  })
}
