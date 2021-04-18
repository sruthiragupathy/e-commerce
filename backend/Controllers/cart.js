
const Cart = require("../Database/cart");
// const Child = require("../Database/cart");
const _ = require('lodash');
const { extend } = require("lodash");

exports.getCartItems = async (req,res) => {
    const user = req.user;
    console.log(user._id);
    try {
        const cartItems = await Cart.findById(user._id);
        console.log(cartItems);
        res.json({success: true, cartItems: cartItems});
    }
    catch(error) {
        res.json({success: false, message: error.message})
    }
}

exports.addCartItems = async (req,res) => {
    const {productId} = req.params;
    const {userId} = req.params;
    try {
        
        let cartDocument = await Cart.findById(userId);
        if(!cartDocument.cartItems.id(productId)){
            cartDocument = _.extend(cartDocument, {cartItems: _.concat(cartDocument.cartItems,{_id:productId, product: productId, quantity: 1})})
            cartDocument = await cartDocument.save()
            await Cart.findOne({_id: userId}).populate('cartItems.product').exec((err, products) => {
                res.json({success:true, response: products})
            })

            console.log({cartDocument});
        }
    }
    catch(error) {
        res.json({success: false, response: error.message});
    }
}

exports.updateQuantityOfCartItems = async (req, res) => {
    let cart = req.cart;
    const { productId } = req.params;
    const {quantity} = req.body;
    let updateCartItem = cart.cartItems.id(productId)
    updateCartItem = _.extend(updateCartItem,{quantity: quantity})
    cart.cartItems = _.extend(...cart.cartItems, updateCartItem);
    console.log(cart);
    try {
      cart = new Cart(cart);
      cart = await cart.save((err, cart) => {
          res.json({success: true, response: cart})
      })
    }
    catch(err) {
        res.json({success: false, error: err.message})
    }
}

exports.deleteCartItems = async (req, res) => {
    const { productId } = req.params;
    const { userId } = req.params;
    // const cart = newCart;
    try{
        // await Cart.findById(userId).cartItems.remove({product: productId})
        const cartitems = await Cart.findById(userId);
        await cartitems.cartItems.id(productId).remove()
        await cartitems.save((err, cartItem) => {
            if(err) {
                throw new Error(err.message);
            }
            res.json({ success: true, respose: cartItem })
        })
    }
    catch(error) {
        res.json({ success: false, message: error.message })
    }
}