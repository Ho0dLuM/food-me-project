const express = require('express');
const router = express.Router();
const knex = require('../db');

router.get('/', function (req, res, next) {
  knex('restaurants').then((restaurants) => {
    res.render('restaurants/index', {
      title: 'restaurants index',
      restaurants
    });
  });
});

module.exports = router;
