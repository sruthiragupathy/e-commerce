import React from "react";
import { RightNavbar } from "./RightNavbar";
import "./Navbar.css";
import { useProduct } from "../../Context/ProductContext";

const category = ["men", "women", "sneakers"];
const mobileCurrentCategory = {
  color: "var(--purple)",
  fontWeight: 1000
};

export const Navbar = ({ openHamburger, setOpenHamburger }) => {
  const { state, dispatch } = useProduct();
  const toggleHamburgerMenu = () => {
    setOpenHamburger((prev) => !prev);
  };

  const routeHandler = (e) => {
    dispatch({ type: "ROUTE", payload: e.target.innerText.toLowerCase() });
    setOpenHamburger(false);
  };

  return (
    <nav className="navbar-component flex">
      <div
        className={`hamburger-menu pointer ${openHamburger ? "click" : ""}`}
        onClick={toggleHamburgerMenu}
      >
        <span className="hamburger-menu__line"></span>
        <span className="hamburger-menu__line"></span>
        <span className="hamburger-menu__line"></span>
      </div>
      <ul
        className={`menu__mobile-none rm rm-ul-padding ${
          openHamburger ? "menu__mobile" : ""
        }`}
      >
        {category.map((item, index) => {
          return (
            <button
              href="/"
              className="sidebar__item"
              key={index}
              style={state.route === item ? mobileCurrentCategory : {}}
              onClick={routeHandler}
            >
              {item}
            </button>
          );
        })}
      </ul>
      <ul className="nav__category rm-ul-padding flex">
        {category.map((item, index) => {
          return (
            <button
              href="/"
              className={`sidebar__item ${
                state.route === item ? "current-category" : ""
              }`}
              key={index}
              onClick={routeHandler}
            >
              {item}
            </button>
          );
        })}
      </ul>
      <RightNavbar />
    </nav>
  );
};
