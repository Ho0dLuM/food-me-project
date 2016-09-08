'use strict'

exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('preferred_name').notNullable()
    table.string('last_name').notNullable()
    table.integer('account_id').references('id').inTable('accounts')
    table.timestamps(true, true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
}
