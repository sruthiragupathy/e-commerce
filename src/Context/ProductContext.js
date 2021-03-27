import { createContext, useContext, useReducer,useEffect } from "react";
import { RestApiCalls } from "../CallRestApi";
import { reducerFunction } from "./reducerFunction";


const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunction, {
    route: "men",
    product: [],
    cart: [],
    wishlist: []
  });

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(ProductContext);
};
