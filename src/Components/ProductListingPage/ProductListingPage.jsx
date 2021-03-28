import React from "react";
import { useProduct } from "../../Context/ProductContext";
import { ProductCard } from "./ProductCard";
import "./ProductListingPage.css"

export const ProductListingPage = ({props,productCategory}) => {
    
    const {state} = useProduct();
    console.log(state.wishlist,state.cart);
    return (
        <div className = "product-flex">
            {state.products.map(product => 
                <ProductCard product = {product}/>
            )}
        </div>
        // <h1>Hello</h1>
    )
}