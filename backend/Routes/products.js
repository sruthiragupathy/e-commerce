const express = require("express");
const { getProducts } = require("../Controllers/products");
const router = express.Router();

router.get("/products", getProducts);

module.exports = router;