import { useProduct } from "../../Context/ProductContext";
import { Link } from "react-router-dom";
import "./WishlistCard.css"
import { calculateOriginalPrice, getProductFromWishlistDb, getTrimmedDescription, isInCart, isInWishlist } from "../CardCommonFunctions";

export const WishlistCard = ({product}) => {
        const {id,image,brandName,description,price,isnew,sale,outOfStock,discountByPercentage,count} = product;
        const {state,dispatch} = useProduct();

        return (

            <div className={`card ${outOfStock ? "overlay" : ""} pointer`} key = {id} >
                {outOfStock && <div className="out-of-stock">OUT OF STOCK</div>}
                <img className="responsive-img" src={image} alt={brandName}/>
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
                            <Link to = "/cart">
                                <span style = {{marginRight:"1rem"}}>Go to Cart</span> 
                                <i className = "fa fa-arrow-right" style = {{fontSize:"1rem"}}></i>
                            </Link>
                        </button>:
                        <button 
                        className = "btn btn-primary" 
                        onClick = {() => dispatch({type:"ADD_TO_CART",payload:product})} 
                        disabled = {outOfStock}>Move to Cart</button>}
                    </div>
                </div>
                <button 
                className = "btn-icon br trash"
                onClick = {() => dispatch({type:"WISHLIST_ADD_OR_REMOVE",payload:isInWishlist(state.wishlist,id)?getProductFromWishlistDb(state.wishlist,id):product})}>
                    <i className="fa fa-trash-o fa-2x"></i>
                </button>
            </div>
            

    )
}