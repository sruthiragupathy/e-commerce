import React from "react";
import { useProduct } from "../../Context/ProductContext";
import "./Navbar.css";

export const RightNavbar = () => {
  const {
    state: { cart, wishlist },
    dispatch
  } = useProduct();

  const routeHandler = (e, routeToBeSet) => {
    dispatch({ type: "ROUTE", payload: routeToBeSet });
  };
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
          onClick={(e) => routeHandler(e, "wishlist")}
        >
          <div>
            <i className="fa fa-heart"></i>
          </div>
          <div className="notification-badge flex-center">
            <span>{wishlist.length}</span>
          </div>
        </div>
      </li>
      <li className="navbar__list pointer">
        <div
          className="notification-badge-container"
          onClick={(e) => routeHandler(e, "cart")}
        >
          <div>
            <i className="fa fa-shopping-bag"></i>
          </div>
          <div className="notification-badge flex-center">
            <span>{cart.length}</span>
          </div>
        </div>
      </li>
    </ul>
  );
};
