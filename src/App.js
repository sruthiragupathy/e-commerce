import './App.css';
import React,{useEffect, useState} from "react";
import {Navbar} from "./Components/Navbar/Navbar"
import { useProduct } from './Context/ProductContext';
import { RestApiCalls } from './CallRestApi';
import { ProductListingPage } from './Components/ProductListingPage/ProductListingPage';

function App() {
  const [openHamburger, setOpenHamburger] = useState(false);
  const {state,dispatch} = useProduct();
  const [status,setStatus] = useState({
    loading:true,
    error:false
  })

  console.log(status,"before useEffect");
  useEffect(() => {
    // setStatus({...status,loading:true})
    //fetching products
    (async function () {
      const { response, error } = await RestApiCalls("GET", "api/products");
      if (!error) {
        // console.log(response);
        dispatch({ type: "SET_PRODUCTS", payload: response });
      }
    })();

    //fetching cart
    (async function () {
      const { response, error } = await RestApiCalls("GET", "api/carts");
      // console.log("wishlist", response);
      if (!error) {
        dispatch({ type: "SET_CART", payload: response });
        setStatus({...status,loading:false});

      }
    })();

    //fetching wishlist
    (async function () {
      const { response, error } = await RestApiCalls("GET", "api/wishlists");
      // console.log("wishlist", response);
      if (!error) {
        dispatch({ type: "SET_WISHLIST", payload: response });
      }
    })();
  }, []);
  console.log("loading",status.loading);
  return (
    <div className ="App" style = {{display:"flex",flexDirection:"column"}}>
      <Navbar
      openHamburger={openHamburger}
      setOpenHamburger={setOpenHamburger}
      />
      {console.log(status)}
      {status.loading && <p>Loading.....</p>} 
      <ProductListingPage/>
    </div>
  );
}

export default App;
