const router = require('express').Router();
const usersController = require("../controllers/usersController");

router.get('/users', usersController.index, usersController.respondJSON);
module.exports = router;
