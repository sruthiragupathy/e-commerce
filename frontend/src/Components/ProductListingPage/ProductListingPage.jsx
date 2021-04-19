import React, {useEffect} from "react";
import { BACKEND } from "../../api";
import { RestApiCalls } from "../../CallRestApi";
import { useAuth } from "../../Context/AuthContext";
import { useProduct } from "../../Context/ProductContext";
import { Toast } from "../Toast/Toast";
import { FilterSideBar } from "./FilterSideBar";
import { ProductCard } from "./ProductCard";
import "./ProductListingPage.css";
import {sortFunction} from "./SortFunction";

export const ProductListingPage = ({props,productCategory}) => {
    const {state, dispatch} = useProduct();
    const {auth} = useAuth()
    // useEffect (async ()=> {

    //     const { response } = await RestApiCalls("GET",`${BACKEND}/${auth.user._id}/cart`) ;
    //     console.log(response);
    //     if(response.success) {
    //         dispatch ({type: "SET_CART", payload: response.response.cartItems })
    //     }


    //     // const { res } = await RestApiCalls("GET",`${BACKEND}/${auth.user._id}/wishlist`) ;
    //     // if(res.success) {
    //     //     dispatch ({type: "SET_WISHLIST", payload: res.response.wishlistItems })
    //     // }

    // }, [state.cart, state.wishlist])
    
    
    console.log(state);

    const transformProducts = (products) => {
        let products_to_filter = products;
        //sort based on instock
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
        products_to_filter = products_to_filter.filter(product => Number(product.price) <= state.otherFilter.ranger_value)
                //sorting
        const keysOfSortObject  = Object.keys(state.sort);
        const currentSortByType = keysOfSortObject.filter(type => state.sort[type] === true);
        if(currentSortByType.length !== 0){
        products_to_filter = sortFunction(products_to_filter,currentSortByType[0])
        }
        products_to_filter.sort((a,b) => (b.outOfStock === false ? 1 : -1))
        return products_to_filter;
    }
    
    return (
        <div className = "PLP-wrapper">
        {/* {transformProducts(state.products)} */}
        {state.overlay && <div className = "background-overlay"></div>}
        <FilterSideBar/>
        <div className = "product-flex">
            {transformProducts(state.products).length !== 0 ? 
            transformProducts(state.products).map(product => 
                <ProductCard product = {product} key = {product.id}/>
            ) : 
            <div className = "empty-product__PLP">"No products to display"</div>}
        </div>
        {state.toast.value && <Toast message = {state.toast.message}/>}
        </div>
        
    )
}