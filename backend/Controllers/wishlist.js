const Wishlist = require("../Database/wishlist");
const _ = require('lodash');
const { extend } = require("lodash");

exports.getWishlistItems = async (req,res) => {
    const {userId} = req.params
    try {
        // const wishlistItems = await Wishlist.findById(user._id);
        await Wishlist.findOne({_id:userId}).populate('wishlistItems.product').exec((err, products) => {
            res.json({success:true, response: products})
        })
    }
    catch(error) {
        res.json({success: false, response: error.message})
    }
}

exports.addWishlistItems = async (req,res) => {
    const {productId} = req.params;
    const {userId} = req.params;
    try {
        
        let wishlistDocument = await Wishlist.findById(userId);
        console.log(wishlistDocument);
        if(!wishlistDocument.wishlistItems.id(productId)){
            wishlistDocument = _.extend(wishlistDocument, {wishlistItems: _.concat(wishlistDocument.wishlistItems,{_id:productId, product: productId})})
            wishlistDocument = await wishlistDocument.save()
            await Wishlist.findOne({_id: userId}).populate('wishlistItems.product').exec((err, products) => {
                res.json({success:true, response: products})
            })

        }
    }
    catch(error) {
        res.json({success: false, error: error.message});
    }
}

exports.deleteWishlistItems = async (req, res) => {
    const { productId } = req.params;
    const { userId } = req.params;
    try{
        const wishlistitems = await Wishlist.findById(userId);
        console.log(wishlistitems);
        await wishlistitems.wishlistItems.id(productId).remove()
        await wishlistitems.save((err, wishlistItem) => {
            if(err) {
                throw new Error(err.message);
            }
            res.json({ success: true, response: "1 product removed from wishlist" })
        })
    }
    catch(error) {
        res.json({ success: false, error: error.message })
    }
}