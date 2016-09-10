'use strict'

const faker = require('faker')

function employeePromise (knex, restaurant, user) {
  let role = faker.random.number(1000) > 800 ? 'Manager' : 'Waiter / Waitress'
  let employee = {
    role: role,
    restaurant_id: restaurant.id
  }

  if (user) employee.user_id = user.id

  return knex('employees').insert(employee)
}

exports.seed = function (knex, Promise) {
  return Promise.all([
    knex('restaurants'),
    knex('users')
  ])
  .then(([restaurants, users]) => {
    let promises = Array.from(Array(users.length + 50))
      .map((el, i) => {
        let rRand = faker.random.number(restaurants.length - 1)
        let restaurant = restaurants[rRand]

        let user = users[i]
        return employeePromise(knex, restaurant, user)
      })

    return Promise.all(promises)
  })
}
