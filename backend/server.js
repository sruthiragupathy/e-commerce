const express = require("express");
const app = express()
const cors = require("cors");
const bodyParser = require("body-parser");
const  Routes  = require("./Routes/products")
const PORT = 3000

app.use(cors());
app.use(bodyParser.json());

//Routes
app.use("/api",Routes);


app.listen(PORT, () => {
    console.log("Server running at port" + PORT)
})