import React from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Vidly
      </Link>
      <div className="navbar-nav custom-align">
        <NavLink className="nav-item nav-link" to="/movies">
          Movies
        </NavLink>
        <NavLink className="nav-item nav-link" to="/customers">
          Customers
        </NavLink>
        <NavLink className="nav-item nav-link" to="/rentals">
          Rentals
        </NavLink>
        <NavLink className="nav-item nav-link" to="/login">
          Login
        </NavLink>
        <NavLink className="nav-item nav-link" to="/register">
          Register
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
