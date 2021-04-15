require("dotenv").config()

const express = require("express");
const app = express()
const cors = require("cors");
const bodyParser = require("body-parser");
const  Routes  = require("./Routes/products")
const connectMongoDb = require("./Database/connectMongoDb");
const femaleProducts = require("./Database/database");
const Product = require("./Database/Product");
const PORT = 3000

const bool = true;

app.use(cors());
connectMongoDb();
// console.log(femaleProducts);
const populateData = async ( femaleProducts ) => {
    try {
    await Product.insertMany(femaleProducts);
    }
    catch (error) {
        console.log(error)
    }
}

//Middlewares
app.use(bodyParser.json());

//Routes
app.use("/api",Routes);


app.listen(PORT, () => {
    console.log("Server running at port" + PORT)
})