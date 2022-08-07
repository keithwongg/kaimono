import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import kaimono from "../../images/kaimono.png";
import './navbar.css';

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <NavLink className="navbar-brand nav-logo" to="/">
            <img style={{ height: 40 + "px" }} src={kaimono}></img>
            <h1>Kaimono</h1>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
