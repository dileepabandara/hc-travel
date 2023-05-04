import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FlightIcon from "@mui/icons-material/Flight";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user && user.role === "Admin";
  // console.log(isAdmin);
  // console.log(user);

  const { dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">HolidayCentral</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Main</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          {isAdmin && (
            <>
              <p className="title">Admin</p>
              <Link to="/users" style={{ textDecoration: "none" }}>
                <li>
                  <PersonOutlineIcon className="icon" />
                  <span>Users</span>
                </li>
              </Link>
            </>
          )}
          <p className="title">Hotels</p>
          <Link to="/hotels" style={{ textDecoration: "none" }}>
            <li>
              <FoodBankIcon className="icon" />
              <span>Hotels</span>
            </li>
          </Link>
          <Link to="/rooms" style={{ textDecoration: "none" }}>
            <li>
              <SingleBedIcon className="icon" />
              <span>Rooms</span>
            </li>
          </Link>
          <p className="title">Flights</p>
          <Link to="/flights" style={{ textDecoration: "none" }}>
            <li>
              <FlightIcon className="icon" />
              <span>Flights</span>
            </li>
          </Link>
          <Link to="/seats" style={{ textDecoration: "none" }}>
            <li>
              <AirlineSeatReclineExtraIcon className="icon" />
              <span>Seats</span>
            </li>
          </Link>
          <p className="title">Packages</p>
          <Link to="/packages" style={{ textDecoration: "none" }}>
            <li>
              <InventoryIcon className="icon" />
              <span>Packages</span>
            </li>
          </Link>
          <p className="title">User</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      {/* <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div> */}
    </div>
  );
};

export default Sidebar;
