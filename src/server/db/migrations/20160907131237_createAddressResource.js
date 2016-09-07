'use strict'

exports.up = function (knex, Promise) {
  return knex.schema.createTable('addresses', (table) => {
    table.increments()
    table.string('line_1').defaultsTo('')
    table.string('line_2').defaultsTo('')
    table.string('city').defaultsTo('')
    table.string('state', 2).defaultsTo('')
    table.string('zip').defaultsTo('')
    table.timestamps(true, true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('addresses')
}
