import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { faGift,faPlane,faHotel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  let userInfo = JSON.parse(localStorage.getItem(user));

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Holiday Central Packages</span>
        </Link>
        <div className="navItems">
          <Link to="/flight">
            <FontAwesomeIcon className="icons" icon={faPlane} />
            <button className="navButton">Flight</button>
          </Link>
          <Link to="/package">
          <FontAwesomeIcon className="icons" icon={faGift} />
            <button className="navButton">Package</button>
          </Link>
          <Link to="/package">
          <FontAwesomeIcon className="icons" icon={faHotel} />
            <button className="navButton">Hotel</button>
          </Link>
        </div>
        {user ? (
          user.username && (
            <button className="navButton" onClick={logout}>
              Logout
            </button>
          )
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
