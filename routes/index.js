"use strict";

const router = require("express").Router(),
  userRoutes = require("./userRoutes"),
  errorRoutes = require("./errorRoutes"),
  homeRoutes = require("./homeRoutes");

router.use("/users", userRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;