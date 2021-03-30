import { addNewItemToExistingArray, removeItemFromExistingArray } from "../array-manipulation";
import { brandNameArray } from "../Database";
import { createObject } from "./ProductContext";

export const reducerFunction = (state, { type, payload,value }) => {
    switch (type) {
      case "SET_PRODUCTS":
        return { ...state, products: payload };
      case "SET_CART":
        return {
          ...state,
          cart: payload.map(item => ({...item,inInCart:true}))
        };
      case "SET_WISHLIST":
        return {
          ...state,
          wishlist:payload.map(item => ({...item,inWishlisted:true}))
        };
      case "ADD_TO_CART":
        return {
          ...state,
          cart:addNewItemToExistingArray(state.cart,payload,"isInCart")
        }
      case "REMOVE_FROM_CART":
        return {
          ...state,
          cart:removeItemFromExistingArray(state.cart,payload)
        }
      case "WISHLIST_ADD_OR_REMOVE":
        // console.log("payload");
        return {
          ...state,
          wishlist:payload.isWishlisted ? 
          removeItemFromExistingArray(state.wishlist,payload,"isWishlisted"):
          addNewItemToExistingArray(state.wishlist,payload,"isWishlisted")
        }
      case "FILTER_BY_BRAND":
        return {
          ...state,
          brandFilter:{...state.brandFilter,[payload]:!state.brandFilter[payload]}
        }
      case "OTHER_FILTER":
        switch(payload){
          case "ranger_value":
            return {...state,otherFilter:{...state.otherFilter,ranger_value:value}}
          case "in_stock":
            return {...state,otherFilter:{...state.otherFilter,in_stock:!state.otherFilter.in_stock}}
          default:
            return state
        }
      case "SORT":
        return {...state,sort:{latest:false,
          discount:false,
          "price : low to high":false,
          "price : high to low":false,
          [payload.toLowerCase()]:true}}
      case "OPEN_FILTER":
        return {...state,openFilter:!state.openFilter}
      case "OPEN_SORT":  
        return {...state,openSort:!state.openSort}
      case "CLEAR_ALL_FILTERS":
        return {...state,
          brandFilter:createObject(brandNameArray,{}),
          otherFilter:{in_stock:false,ranger_value:1000},
          sort:{
            latest:false,
            discount:false,
            "price : low to high":false,
            "price : high to low":false
          }
        }

      case "SET_OVERLAY":
        return {...state,overlay:!state.overlay}
      default:
        return state;
    }
  };
  