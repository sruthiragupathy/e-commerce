const express = require("express");
const { findUserById } = require("../Controllers/user.js");
const router = express.Router();

router.param("userId", findUserById);

module.exports = router;
