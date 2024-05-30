'use strict';

const router = require('express').Router();
console.log('In userRoutes - pass 1');
const usersController = require('../controllers/usersController');

console.log('In userRoutes - pass 2');

router.get('/', usersController.index, usersController.indexView);
module.exports = router;
