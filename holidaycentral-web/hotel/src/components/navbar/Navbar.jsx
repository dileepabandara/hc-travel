import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { ReserveContext } from "../../context/ReserveContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);
  const { cartCount, addToCart, removeItem, total } =
    useContext(ReserveContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Holiday Central</span>
        </Link>
        {user ? (
          <div className="navItems">
            <Link to="/cart">
              <FontAwesomeIcon className="icons" icon={faCartShopping} />
            </Link>
            <span className="cartNumber">
              {cartCount > 0 ? (
                <span className="cart-count-badge">{cartCount}</span>
              ) : (
                <span className="cart-count-badge">0</span>
              )}
            </span>

            <button className="navButton">{user.details.username}</button>
            <button className="navButton" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="navItems">
            {/* <button className="navButton">Register</button> */}
            <Link to="/login">
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
