import {useState} from "react";
import { useProduct } from "../../Context/ProductContext";
import { getTotalOrderPrice, totalMRP } from "../CardCommonFunctions";
import "./OrderSummary.css";


export const OrderSummary = () => {
    const {state,dispatch} = useProduct();
    const [totalPrice,setTotalPrice] = useState(totalMRP(state.cart))
    const [totalOrderPrice,setTotalOrderPrice] = useState(getTotalOrderPrice(state.cart))
     return <div className = "order-summary">
        <div className = "cart-heading flex-center">
            <strong>PRICE DETAILS ({state.wishlist.length} items)</strong>
        </div>
        <div className = "order-summary__card">
            <div className = "flex">
                <span>Total MRP</span>
                <span>Rs. {totalPrice}</span>
            </div >
            <div className = "flex border-bottom">
                <span>Discount on MRP</span>
                <span className = "green-txt">- Rs. {totalPrice - totalOrderPrice}</span>
            </div>
            <div className = "flex bold-txt">
                <span>Total Amount</span>
                <span>Rs. {totalOrderPrice}</span>
            </div>
            <button className = "btn btn-primary">PLACE ORDER</button>
        </div>
        
    </div>
}