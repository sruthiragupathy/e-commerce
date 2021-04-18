const Cart = require("../Database/cart");
const User = require("../Database/user")
const Product = require("../Database/product")
const Item = require("../Database/cart");



exports.getUserById = async (req,res,next,id) => {
    try{
    const user = await User.findById(id);
    if(!user){
        throw Error("No such user found");
    }
    req.user = user;
    console.log(req.user)
    next();
    }
    catch(error) {
        return res.status(400).json({success: true, error: error.message})
    }
}

exports.getCartById = async (req,res,next,id) => {
    try{
    const cart = await Cart.findById(id);
    if(!cart){
        throw Error("No such cart found");
    }
    req.cart = cart;
    console.log(req.cart);
    next();
    }
    catch(error) {
        return res.status(400).json({success: true, error: error.message})
    }
}

exports.getProductById = async (req,res,next,id) => {
    console.log("hi");
    try{
    const product = await Product.findById(id);
    if(!product){
        throw Error("No such product found");
    }
    req.product = product;
    console.log(req.product);
    next();
    }
    catch(error) {
        return res.status(400).json({success: true, error: error.message})
    }
}