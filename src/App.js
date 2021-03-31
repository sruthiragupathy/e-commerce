import './App.css';
import React,{useEffect, useState} from "react";
import Navbar from "./Components/Navbar/Navbar"
import { useProduct } from './Context/ProductContext';
import { RestApiCalls } from './CallRestApi';
import { ProductListingPage } from './Components/ProductListingPage/ProductListingPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { CartListing } from './Components/Cart/CartListing';
import { WishlistListing } from './Components/Wishlist/WishlistListing';


function App() {
  const [openHamburger, setOpenHamburger] = useState(false);
  const {state,dispatch} = useProduct();
  const [status,setStatus] = useState({
    loading:true,
    error:false
  })

  useEffect(() => {
    // setStatus({...status,loading:true})
    //fetching products
    (async function () {
      const { response, error } = await RestApiCalls("GET", "api/products");
      if (!error) {
        dispatch({ type: "SET_PRODUCTS", payload: response });
      }
    })();

    //fetching cart
    (async function () {
      const { response, error } = await RestApiCalls("GET", "api/carts");
      if (!error) {
        dispatch({ type: "SET_CART", payload: response });
        setStatus({...status,loading:false});

      }
    })();

    //fetching wishlist
    (async function () {
      const { response, error } = await RestApiCalls("GET", "api/wishlists");
      if (!error) {
        dispatch({ type: "SET_WISHLIST", payload: response });
      }
    })();
  }, []);
  if(state.overlay){
    document.body.style.overflow="hidden"
  }
  else {
    document.body.style.overflow="scroll"
  }
  return (
    <div className ="App" style = {{display:"flex",flexDirection:"column"}}>
      <Router>
      <Navbar
      openHamburger={openHamburger}
      setOpenHamburger={setOpenHamburger}
      />
      
      {status.loading ? <p>Loading.....</p> : 
      <Switch>
        <Route path = "/products/women" exact component = {(props) => (<ProductListingPage props = {props} productCategory = "women"/>)}/>
        <Route path = "/products/men" exact component = {(props) => (<ProductListingPage props = {props} productCategory = "men"/>)}/>
        <Route path = "/products/sneakers" component = {(props) => (<ProductListingPage props = {props} productCategory = "sneakers"/>)}/>
        <Route path = "/" exact component = {(props) => (<ProductListingPage props = {props} productCategory = "men"/>)}/>
        <Route path = "/checkout/cart" component = {(props) => (<CartListing props = {props}/>)}/>
        <Route path = "/wishlist" component = {(props) => (<WishlistListing props = {props}/>)}/>
      </Switch>} 
    
    
    </Router>
    </div>
  );
}

export default App;
