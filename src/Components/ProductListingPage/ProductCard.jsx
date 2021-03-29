import React from "react";
import "./ProductCard.css";
import {useProduct} from "../../Context/ProductContext";
import {Link} from "react-router-dom";
import { calculateOriginalPrice,getProductFromWishlistDb, getTrimmedDescription, isInCart, isInWishlist } from "../CardCommonFunctions";
export const ProductCard = ({product}) => {
    const {id,image,brandName,description,price,isnew,sale,outOfStock,discountByPercentage,count} = product;
    const {state,dispatch} = useProduct();

    return (
        <div className={`card ${outOfStock ? "overlay" : ""} pointer`} key = {id} >
            {outOfStock && <div className="out-of-stock">OUT OF STOCK</div>}
            <img className="responsive-img" src={image} alt={brandName}/>
            {isnew && <span className = "card__badge">NEW</span>}
            {!isnew && discountByPercentage !== 0 && sale && <span className = "card__badge">SALE</span>}
            <div className="card__description">
                <div className="primary">
                    <h4 className="brand-name rm">{brandName}</h4>
                    <small className="light">{getTrimmedDescription(description)}</small>
                    <div className="price">
                        <h5 className = "rm"><strong>Rs. {price.split(".")[0]} </strong></h5>
                        {discountByPercentage !== 0 && <h5 className="rm light strikethrough">Rs. {calculateOriginalPrice(price,discountByPercentage)} </h5>}
                        {discountByPercentage !== 0 && <h5 className="rm discount">({discountByPercentage}% OFF)</h5>}
                    </div>
                    {count <= 5 &&
                            <div className = "secondary">
                                <span className="orange-txt"><strong>Only few left!</strong></span>
                    </div>}
                    {isInCart(state.cart,id) ?
                    <button className = "btn btn-primary"  disabled = {outOfStock}>
                        <Link to = "/checkout/cart">
                            <span style = {{marginRight:"1rem"}}>Go to Cart</span> 
                            <i className = "fa fa-arrow-right" style = {{fontSize:"1rem"}}></i>
                        </Link>
                    </button>:
                    <button 
                    className = "btn btn-primary" 
                    onClick = {() => dispatch({type:"ADD_TO_CART",payload:product})} 
                    disabled = {outOfStock}>Add to Cart</button>}
                </div>
                <button 
                className = {`btn-icon btn-social-engagement wishlist ${!isInWishlist(state.wishlist,id)?"wishlist-purple":""}`}
                onClick = {() => dispatch({type:"WISHLIST_ADD_OR_REMOVE",payload:isInWishlist(state.wishlist,id)?getProductFromWishlistDb(state.wishlist,id):product})}>
                    <i className="fa fa-heart"></i>
                </button>
            </div>
        </div>
                
    )
}