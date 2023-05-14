import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        {/* <div className="item">
          <h3>HolidayCentral Backoffice</h3>
        </div> */}
        <div className="items">
          <div className="item">
            <img src={`${user.details.img}`} alt="" className="avatar" />
          </div>
          <div className="item">
            <span className="name">
              Hi, {user.details.firstName} {user.details.lastName} -{" "}
              {user.details.username}
            </span>
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon
              className="icon"
              onClick={() => {
                if (document.fullscreenElement) {
                  document.exitFullscreen();
                } else {
                  document.documentElement.requestFullscreen();
                }
              }}
            />
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
