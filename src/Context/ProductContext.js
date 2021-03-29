import { createContext, useContext, useReducer} from "react";
import { brandNameArray } from "../Database";
import { reducerFunction } from "./reducerFunction";

const ProductContext = createContext();

const filterObject  = {}

const createObject  = (brandNameArray) => {
  for(let i =0;i<brandNameArray.length;i++){
    filterObject[brandNameArray[i]] = false
  }
  return filterObject
}

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunction, {
    product: [],
    cart: [],
    wishlist: [],
    brandFilter : createObject(brandNameArray),
    otherFilter : {
      ranger_value : 1000,
      in_stock : false
    }
  });

  console.log(state.filter);
  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(ProductContext);
};
