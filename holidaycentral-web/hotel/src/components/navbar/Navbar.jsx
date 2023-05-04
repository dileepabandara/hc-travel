import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const quantity = useSelector((state) => state.cart.quantity);
  console.log(quantity);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Holiday Central</span>
        </Link>
        {user ? (
          <div className="navItems">
            <span className="cartIcon">
              <FontAwesomeIcon className="icons" icon={faCartShopping} />
            </span>
            <span className="cartNumber">0</span>

            <button className="navButton">{user.details.username}</button>
            <button className="navButton" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
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
