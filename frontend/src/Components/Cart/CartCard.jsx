import { useProduct } from "../../Context/ProductContext";
import { isInWishlist } from "../CardCommonFunctions";
import { Modal } from "../Modal/Modal";
import "./CartCard.css"

export const CartCard = ({product}) => {
    const {image,brandName,description,price,discountByPercentage,seller} = product;
    const {state,dispatch} = useProduct();

    const hideToast = () => {
        setTimeout(() => {
            dispatch({type:"TOGGLE_TOAST",payload:"1 item added to cart"});
          }, 1000)
    }

    const addToWishlist = () => {
        if(isInWishlist(state.wishlist,product.id)){
            dispatch({type:"REMOVE_FROM_CART",payload:product})
        }
        else{
        dispatch({type:"WISHLIST_ADD_OR_REMOVE",payload:product})
        dispatch({type:"REMOVE_FROM_CART",payload:product})
        }
        dispatch({type:"TOGGLE_TOAST",payload:"1 item added to wishlist"});
        hideToast()

    }

    return (    <>
                    <div className="horizontal-card mb">
                        <div className="horizontal-card__cart-item">
                            <div className="cart-item__img">
                                <img className="responsive-img" src={image} alt={brandName}/>
                            </div>
                            <div className="cart-item__flex">
                                <div className="cart-item__details">
                                    <div className="details__primary">
                                        <p className =  "rm"><strong>{brandName}</strong></p>
                                        <div className="description light rm">{description}</div>
                                        <small>Sold by: {seller}</small>
                                    </div>
                                    <div className = "details__btns">
                                        <button className="badge primary-badge">Size: S <i className="fa fa-caret-down"></i></button>
                                        <button className="badge primary-badge">Qty: 1 <i className="fa fa-caret-down"></i></button>
                                    </div>
                                </div>
                                <div className="cart-item__price">
                                    <h5 className = "rm"><strong>Rs. {price} </strong></h5>
                                    <span className="rm light strikethrough">Rs.1400 </span>
                                    <span className = "price__discount">({discountByPercentage} OFF)</span>
                                </div>
                            </div>
                        </div>
                        <div className="horizontal-card__btns">
                            <div className = "remove-container">
                                <button className = "remove" onClick = {() => {
                                    dispatch({type:"SET_OVERLAY"})
                                }}>REMOVE</button>
                            </div>
                            <div>
                                {
                                    <button className = "move-to-wishlist" onClick = {addToWishlist}>MOVE TO WISHLIST</button>
                                }
                                
        
                            </div>
                        </div>
                    </div>
                    {state.overlay && <Modal product = {product}/>}
                </>
    )
}