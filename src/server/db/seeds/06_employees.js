'use strict'

exports.seed = function (knex, Promise) {
  return Promise.all([knex('restaurants'), knex('users')]).then(data => {
    let [restaurants, users] = data
    return Promise.all([
      // Inserts seed entries
      knex('employees').insert({
        role: 'Manager',
        restaurant_id: restaurants[0].id,
        user_id: users[3].id
      }),
      knex('employees').insert({
        role: 'Waiter / Waitress',
        restaurant_id: restaurants[0].id,
        user_id: users[4].id
      }),
      knex('employees').insert({
        role: 'Manager',
        restaurant_id: restaurants[1].id,
        user_id: users[5].id
      }),
      knex('employees').insert({
        role: 'Waiter / Waitress',
        restaurant_id: restaurants[1].id,
        user_id: users[6].id
      }),
      knex('employees').insert({
        role: 'Waiter / Waitress',
        restaurant_id: restaurants[1].id,
        user_id: users[7].id
      }),
      knex('employees').insert({
        role: 'Waiter / Waitress',
        restaurant_id: restaurants[2].id,
        user_id: users[8].id
      }),
      knex('employees').insert({
        role: 'Manager',
        restaurant_id: restaurants[2].id,
        user_id: users[9].id
      }),
      knex('employees').insert({
        role: 'Waiter / Waitress',
        restaurant_id: restaurants[3].id,
        user_id: users[1].id
      }),
      knex('employees').insert({
        role: 'Manager',
        restaurant_id: restaurants[3].id,
        user_id: users[2].id
      })
    ])
  })
}
