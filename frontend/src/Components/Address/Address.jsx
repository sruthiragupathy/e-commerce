import React  from "react";
import { OrderSummary } from "../Cart/OrderSummary";
import { Checkout } from "../Checkout/Checkout";
import { AddressForm } from "./AddressForm";
import "./Address.css"


export const Address = () => {
    return <div>
        <Checkout/>
        <div className = "address-wrapper">
            <AddressForm />
            <OrderSummary/>
        </div>
    </div>
}