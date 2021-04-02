import { useProduct } from "../../Context/ProductContext";
import "./CartListing.css";
import {CartCard} from "./CartCard";
import { OrderSummary } from "./OrderSummary";
import { Toast } from "../Toast/Toast";

export const CartListing = () => {
    const {state} = useProduct();
    
    const getTotalOrderPrice = (cart) => {
        return cart.reduce((acc,currentCartItem) => {
            return acc+Number(currentCartItem.price)
        },0)
    }

    console.log(state.toast);
    
    return(
        <div>
                {state.cart.length === 0 ? 
                <div className = "empty-product">"Your Cart is empty"</div> :
                <div className = "container">
               
                <div class = "cart-wrapper">
                    {state.overlay && <div className = "background-overlay"></div>}
                    <div className = "cart-grid">
                    <div className = "cart-heading flex">
                    <strong>My Shopping Bag ({state.cart.length} items)</strong>
                    <strong>Total: Rs. {getTotalOrderPrice(state.cart)}</strong>
                    </div>
                    {
                    state.cart.map(product => <CartCard product = {product}/>)
                    }
                    
                    </div>
                    <OrderSummary/>
                    
                </div>
                </div>}
                {state.toast.value && <Toast message = {state.toast.message}/>}

        </div>

    )
}