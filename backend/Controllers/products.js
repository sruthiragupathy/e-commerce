const femaleProducts  = require("../Database/database");
const faker = require("faker");
faker.seed(123);


exports.getProducts = (req,res) => {
    res.json(femaleProducts);
}