import React, { useState } from "react";
import "./ProductCard.css";
import {useProduct} from "../../Context/ProductContext";
import {Link} from "react-router-dom";
import { calculateOriginalPrice,getProductFromWishlistDb, getTrimmedDescription, isInCart, isInWishlist } from "../CardCommonFunctions";
import { Toast } from "../Toast/Toast";
import { RestApiCalls } from "../../CallRestApi";
import { useAuth } from "../../Context/AuthContext";
import { BACKEND } from "../../api";


export const ProductCard = ({product}) => {
    const {_id,image,brandName,description,price,isnew,sale,outOfStock,discountByPercentage,count} = product;
    const {state,dispatch} = useProduct();
    const {auth} = useAuth();
    const [toastMessage, setToastMessage] = useState("");

    const hideToast = () => {
        setTimeout(() => {
            dispatch({type:"TOGGLE_TOAST",payload:"1 item added to cart"});
          }, 1000)
    }

    const productAddToCartHandler = async () => {
        await RestApiCalls("POST", `${BACKEND}/${auth.user._id}/cart/${_id}`)
        dispatch({type:"TOGGLE_TOAST",payload:"1 item added to cart"});
        hideToast()
        const { response } = await RestApiCalls("GET",`${BACKEND}/${auth.user._id}/cart`) ;
        if(response.success) {
            dispatch ({type: "SET_CART", payload: response.response.cartItems })
        }
        
    }

    const productAddToWishlistHandler = async () => {
        if(isInWishlist(state.wishlist,_id)){
        await RestApiCalls("DELETE", `${BACKEND}/${auth.user._id}/wishlist/${_id}`)
        dispatch({type:"TOGGLE_TOAST",payload:"1 item removed from wishlist"});
        hideToast()
        const { response } = await RestApiCalls("GET",`${BACKEND}/${auth.user._id}/wishlist`) ;
        if(response.success) {
            dispatch ({type: "SET_WISHLIST", payload: response.response.wishlistItems })
        }
        }
        else {
        await RestApiCalls("POST", `${BACKEND}/${auth.user._id}/wishlist/${_id}`)
        dispatch({type:"TOGGLE_TOAST",payload:"1 item added to wishlist"});
        hideToast()
        const { response } = await RestApiCalls("GET",`${BACKEND}/${auth.user._id}/wishlist`) ;
        if(response.success) {
            dispatch ({type: "SET_WISHLIST", payload: response.response.wishlistItems })
        }
        }
        }
    

    return (
        <>
        <div className={`card ${outOfStock ? "overlay" : ""} pointer`} key = {_id} >
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

                    {isInCart(state.cart,_id) ?
                    <button className = "btn btn-primary"  disabled = {outOfStock}>
                        <Link to = "/checkout/cart">
                            <span style = {{marginRight:"1rem"}}>Go to Cart</span> 
                            <i className = "fa fa-arrow-right" style = {{fontSize:"1rem"}}></i>
                        </Link>
                    </button>:
                    <button 
                    className = "btn btn-primary" 
                    onClick = {productAddToCartHandler} 
                    disabled = {outOfStock}>Add to Cart</button>}
                </div>
                <button 
                className = {`btn-icon btn-social-engagement wishlist ${!isInWishlist(state.wishlist,_id)?"wishlist-purple":""}`}
                // onClick = {() => dispatch({type:"WISHLIST_ADD_OR_REMOVE",payload:isInWishlist(state.wishlist,_id)?getProductFromWishlistDb(state.wishlist,_id):product})}
                onClick = {productAddToWishlistHandler}
                >
                    <i className="fa fa-heart"></i>
                </button>
            </div>
            
        </div>
        </>

                
    )
}