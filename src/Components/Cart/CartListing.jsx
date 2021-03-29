import { useProduct } from "../../Context/ProductContext";
import "./CartListing.css";
import {CartCard} from "./CartCard";
import { OrderSummary } from "./OrderSummary";
export const CartListing = () => {
    const {state,dispatch} = useProduct();
    console.log("state from cart page",state);
    const getTotalOrderPrice = (cart) => {
        return cart.reduce((acc,currentCartItem) => {
            return acc+Number(currentCartItem.price)
        },0)
    }
    return(
        <div>
                {state.cart.length === 0 ? 
                <div className = "empty-product">"Your Cart is empty"</div> :
                <div className = "container">
               
                <div class = "cart-wrapper">
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