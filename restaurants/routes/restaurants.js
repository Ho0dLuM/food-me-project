var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('restaurants/index');
});

//GET new restaurant form
router.get('/new', function(req,res,next){
  res.render('restaurants/new');
});

//POST CREATE a new restaurant
module.exports = router;
