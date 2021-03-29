import React from "react";
import { useProduct } from "../../Context/ProductContext";
import { FilterSideBar } from "./FilterSideBar";
import { ProductCard } from "./ProductCard";
import "./ProductListingPage.css"

export const ProductListingPage = ({props,productCategory}) => {
    
    const {state} = useProduct();

    const transformProducts = (products) => {
        let products_to_filter = products;
        //sort based on instock
        products_to_filter.sort((a,b) => (b.outOfStock === false ? 1 : -1))
        //filter by brands and in stock
        const keysOfFilterObject = Object.keys(state.brandFilter);
        const checkedBrands = keysOfFilterObject.filter(item => state.brandFilter[item] === true)
        if(state.otherFilter.in_stock){
            products_to_filter = products_to_filter.filter(product => {
                return product.outOfStock === false
            })
        }
        if(checkedBrands.length !== 0){
            products_to_filter = products_to_filter.filter(product => checkedBrands.includes(product.brandName))
        }
        //list products based on price range
        console.log(state.otherFilter.ranger_value);
        products_to_filter = products_to_filter.filter(product => Number(product.price) <= state.otherFilter.ranger_value)
        console.log(products_to_filter);
        return products_to_filter;
    }
    
    return (
        <div className = "PLP-wrapper">
        {/* {transformProducts(state.products)} */}
        <FilterSideBar/>
        <div className = "product-flex">
            {transformProducts(state.products).map(product => 
                <ProductCard product = {product}/>
            )}
        </div>
        </div>
        
    )
}