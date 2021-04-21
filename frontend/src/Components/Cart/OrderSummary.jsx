import {useState} from "react";
import { useProduct } from "../../Context/ProductContext";
import { getTotalOrderPrice, totalMRP } from "../CardCommonFunctions";
import "./OrderSummary.css";


export const OrderSummary = ({cart}) => {
    const {state} = useProduct();
    const [totalPrice] = useState(totalMRP(state.cart))
    const [totalOrderPrice] = useState(getTotalOrderPrice(state.cart))
     return <div className = "order-summary">
        <div className = "cart-heading flex-center">
            <strong>PRICE DETAILS ({cart.length} items)</strong>
        </div>
        <div className = "order-summary__card">
            <div className = "flex">
                <span>Total MRP</span>
                <span>Rs. {totalMRP(cart)}</span>
            </div >
            <div className = "flex border-bottom">
                <span>Discount on MRP</span>
                <span className = "green-txt">- Rs. {totalMRP(cart) - getTotalOrderPrice(cart)}</span>
            </div>
            <div className = "flex bold-txt">
                <span>Total Amount</span>
                <span>Rs. {getTotalOrderPrice(cart)}</span>
            </div>
            <button className = "btn btn-primary">PLACE ORDER</button>
        </div>
        
    </div>
}