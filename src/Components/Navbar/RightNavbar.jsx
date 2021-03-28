import React from "react";
import { useProduct } from "../../Context/ProductContext";
import "./Navbar.css";
import {Link} from "react-router-dom";

export const RightNavbar = () => {
  const {
    state: { cart, wishlist },
  } = useProduct();

  return (
    <ul className="right flex-center rm-ul-padding">
      <img
        src="https://ui-labs-sr.netlify.app/Sruthi.jpg"
        alt="avatar"
        className="avatar__img navbar__list sm"
      />
      
      <li className="navbar__list pointer">
        <div
          className="notification-badge-container"
        >
          
            <Link to = "/wishlist"><i className="fa fa-heart"></i></Link>
          
          <div className="notification-badge flex-center">
            <span>{wishlist.length}</span>
          </div>
        </div>
      </li>
      
      
      <li className="navbar__list pointer">
        <div
          className="notification-badge-container"
        >
            <Link to = "/checkout/cart"><i className="fa fa-shopping-bag"></i></Link>
          
          <div className="notification-badge flex-center">
            <span>{cart.length}</span>
          </div>
        </div>
      </li>
      
    </ul>
  );
};
