import { useProduct } from "../../Context/ProductContext";
import {useState} from "react"
import "./CartListing.css";
import {CartCard} from "./CartCard";
import { OrderSummary } from "./OrderSummary";
import { Modal } from "../Modal/Modal";

export const CartListing = () => {
    const {state,dispatch} = useProduct();
    const [showModal,setShowModal] = useState(false);
    const getTotalOrderPrice = (cart) => {
        return cart.reduce((acc,currentCartItem) => {
            return acc+Number(currentCartItem.price)
        },0)
    }
    console.log(showModal,state.overlay);
    return(
        <div>
                {state.cart.length === 0 ? 
                <div className = "empty-product">"Your Cart is empty"</div> :
                <div className = "container">
               
                <div class = "cart-wrapper">
                    {state.overlay && <div className = "background-overlay"></div>}
                    <div className = "cart-grid">
                    <div className = "cart-heading flex">
                    <strong>My Shopping Bag ({state.wishlist.length} items)</strong>
                    <strong>Total: Rs. {getTotalOrderPrice(state.cart)}</strong>
                    </div>
                    {
                    state.cart.map(product => <CartCard product = {product}/>)
                    }
                    
                    </div>
                    <OrderSummary/>
                    
                </div>
                </div>}
        </div>

    )
}