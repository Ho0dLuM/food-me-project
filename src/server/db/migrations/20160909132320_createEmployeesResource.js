'use strict'

exports.up = function (knex, Promise) {
  return knex.schema.createTable('employees', (table) => {
    table.increments()
    table.string('role').notNullable()
    table.integer('restaurant_id').references('id').inTable('restaurants')
    table.integer('user_id').references('id').inTable('users')
    table.timestamps(true, true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('employees')
}
