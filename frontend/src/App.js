import './App.css';
import React,{useEffect, useState} from "react";
import Navbar from "./Components/Navbar/Navbar"
import { useProduct } from './Context/ProductContext';
import { RestApiCalls } from './CallRestApi';
import { ProductListingPage } from './Components/ProductListingPage/ProductListingPage';
import {
 Routes,
  Route,
} from "react-router";
import { CartListing } from './Components/Cart/CartListing';
import { WishlistListing } from './Components/Wishlist/WishlistListing';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Home } from './Components/Home/Home';
import { Login } from './Components/Login/Login';
import { SignUp } from './Components/Login/SignUp';
import { PrivateRoutes } from './Components/Navbar/PrivateRoutes';
import { AuthProvider, useAuth } from './Context/AuthContext';
import { BACKEND } from './api';
import { Address } from './Components/Address/Address';

function App() {
  const [openHamburger, setOpenHamburger] = useState(false);
  const {state,dispatch} = useProduct();
  const [status,setStatus] = useState({
    loading:true,
    error:false
  })
  const {auth} = useAuth();
  console.log({state});
  useEffect(() => {
    // setStatus({...status,loading:true})
    //fetching products
    (async function () {
      const {response,error} = await RestApiCalls("GET",`${BACKEND}/products`)
      
      console.log({response});
      if (!error) {
        dispatch({ type: "SET_PRODUCTS", payload: response.products});
      }
      setStatus({...status,loading:false});
    })();

    // //fetching cart
    // (async function () {
    //   const { response, error } = await RestApiCalls("GET", "api/carts");
    //   if (!error) {
    //     dispatch({ type: "SET_CART", payload: response });
    //     setStatus({...status,loading:false});

    //   }
    // })();

    // //fetching wishlist
    // (async function () {
    //   const { response, error } = await RestApiCalls("GET", "api/wishlists");
    //   if (!error) {
    //     dispatch({ type: "SET_WISHLIST", payload: response });
    //   }
    // })();
  }, []);

  useEffect (() => {
    console.log("from useeffect");
    console.log(auth.user._id);
    auth.user._id && (async function() {
      const { response } = await RestApiCalls("GET",`${BACKEND}/${auth.user._id}/cart`) ;
      console.log(response);
      if(response.success) {
        dispatch ({type: "SET_CART", payload: response.response.cartItems })
      }
    })() && (async function() {
      const { response, success } = await RestApiCalls("GET",`${BACKEND}/${auth.user._id}/wishlist`) ;
      console.log(response);
      if(response.success) {
        dispatch ({type: "SET_WISHLIST", payload: response.response.wishlistItems })
      }
    })() && (async function() {
      const { response, success } = await RestApiCalls("GET",`${BACKEND}/${auth.user._id}/address`) ;
      console.log(response);
      if(response.success) {
        dispatch ({type: "SET_ADDRESS", payload: response.response.addresses })
      }
    })()

  },[auth.user._id])
  if(state.overlay){
    document.body.style.overflow="hidden"
  }
  else {
    document.body.style.overflow="scroll"
  }
  return (
    <div className ="App" style = {{display:"flex",flexDirection:"column"}}>
      
      <Navbar
      openHamburger={openHamburger}
      setOpenHamburger={setOpenHamburger}
      />
      <div>
      {status.loading ? 
      <div className = "loader">
        <CircularProgress color = "inherit"/>
      </div> : 
      <Routes>
        <Route path = "/products/women" element = {<ProductListingPage />}/>
        <Route path = "/products/men" element = {<ProductListingPage/>}/>
        <Route path = "/products/sneakers" element = {<ProductListingPage/>}/>
        <Route path = "/"  element = {<Home/>}/>
        <PrivateRoutes path = "/checkout/cart" element = {<CartListing/>}/>
        <PrivateRoutes path = "/checkout/address" element = {<Address/>}/>
        <PrivateRoutes path = "/wishlist" element = {<WishlistListing/>}/>

      </Routes>} 
      </div>
      <Routes>
      <Route path = "/login" element = {<Login/>} />
        <Route path = "/signup" element = {<SignUp/>} />
      </Routes>

      {auth.loading && <div className = "loader">
        <CircularProgress color = "inherit"/>
      </div>}
    </div>
  );
}

export default App;
