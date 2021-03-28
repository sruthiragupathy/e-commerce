import { addNewItemToExistingArray, removeItemFromExistingArray } from "../array-manipulation";

export const reducerFunction = (state, { type, payload }) => {
    switch (type) {
      case "ROUTE":
        return { ...state, route: payload };
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
      case "WISHLIST_ADD_OR_REMOVE":
        console.log("payload");
        return {
          ...state,
          wishlist:payload.isWishlisted ? 
          removeItemFromExistingArray(state.wishlist,payload,"isWishlisted"):
          addNewItemToExistingArray(state.wishlist,payload,"isWishlisted")
        }
      default:
        return state;
    }
  };
  