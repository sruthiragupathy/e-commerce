export const calculateOriginalPrice = (price,discountByPercentage) => {
    return Math.floor(discountByPercentage/100 * price) + Number(price);
}
export const getTrimmedDescription = (description) => {
    return description.length > 20 ? 
    description.slice(0,21)+"..." :
    description
}

export const isInCart = (cart,id) => {
    return cart.map(item => item.id).includes(id)
}

export const isInWishlist = (wishlist,id) => {
    return wishlist.map(item => item.id).includes(id)
}

export const getProductFromWishlistDb = (wishlist,id) => wishlist.find(product => product.id === id)