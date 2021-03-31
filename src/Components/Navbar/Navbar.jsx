import React from "react";
import { RightNavbar } from "./RightNavbar";
import "./Navbar.css";

import {
  Link,useHistory, withRouter
} from "react-router-dom";
import { isInCurrentPage } from "./isInCurrentPage";

const category = ["home","men", "women", "sneakers"];

const Navbar = ({ openHamburger, setOpenHamburger}) => {
  const history = useHistory();
  const toggleHamburgerMenu = () => {
    setOpenHamburger((prev) => !prev);
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
          return item === "home" ? 
          <Link 
          to = "/" 
          key = {index} >
            <button className = {`sidebar__item ${isInCurrentPage(history.location.pathname,`/`)?"mobile__current-category":""}`}
            onClick = {toggleHamburgerMenu}>
              {item}
            </button>
          </Link>:
          <Link to = {`/products/${item}`} key = {index} >
            <button className = {`sidebar__item ${isInCurrentPage(history.location.pathname,`/products/${item}`)?"mobile__current-category":""}`}
            onClick = {toggleHamburgerMenu}>
              {item}
            </button>
          </Link>
          
        })}
      </ul>
      <ul className="nav__category rm-ul-padding flex">
        {category.map((item, index) => {
          return item === "home" ? 
          <Link to = "/" key = {index} className = {`sidebar__item ${isInCurrentPage(history.location.pathname,`/`)?"current-category":""}`}>{item}</Link>:
          <Link to = {`/products/${item}`} key = {index} className = {`sidebar__item ${isInCurrentPage(history.location.pathname,`/products/${item}`)?"current-category":""}`}>{item}</Link>
          
        })}
      </ul>
      <RightNavbar />
    </nav>
  );
};

export default withRouter(Navbar)
