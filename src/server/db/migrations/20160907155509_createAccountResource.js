'use strict'

exports.up = function (knex, Promise) {
  return knex.schema.createTable('accounts', (table) => {
    table.increments()
    table.string('email', 70).unique().notNullable()
    table.string('password').notNullable()
    table.boolean('admin').defaultsTo(false)
    table.timestamps(true, true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('accounts')
}
