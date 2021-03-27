export const reducerFunction = (state, { type, payload }) => {
    switch (type) {
      case "ROUTE":
        return { ...state, route: payload };
      case "SET_PRODUCTS":
        return { ...state, products: payload };
      case "SET_CART":
        return {
          ...state,
          cart: payload.map(item => ({...item,inCart:true}))
        };
      case "SET_WISHLIST":
        return {
          ...state,
          wishlist:payload.map(item => ({...item,inWishlist:true}))
        };
      default:
        return state;
    }
  };
  