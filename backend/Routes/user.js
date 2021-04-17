const express = require("express");
const { findUserById, signupHandler, getUsersFromDatabase } = require("../Controllers/user.js");
const router = express.Router();

router.param("userId", findUserById);
router.get("/users", getUsersFromDatabase);
router.post("/signup", signupHandler);

module.exports = router;
