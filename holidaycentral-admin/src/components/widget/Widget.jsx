import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import FlightIcon from "@mui/icons-material/Flight";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import InventoryIcon from "@mui/icons-material/Inventory";
import useFetch from "../../hooks/useFetch";

const Widget = ({ type }) => {
  const { data: hotelData } = useFetch("http://localhost:8090/api/hotels/");
  const { data: flightData } = useFetch("http://localhost:8090/api/flights/");
  const { data: packageData } = useFetch("http://localhost:8090/api/packages/");

  const { data: roomData } = useFetch("http://localhost:8090/api/rooms/");
  const { data: seatData } = useFetch("http://localhost:8090/api/seats/");

  let dataER;

  switch (type) {
    case "hotel":
      dataER = {
        title: "Hotels",
        amount: hotelData.length,
        icon: (
          <FoodBankIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "flight":
      dataER = {
        title: "Flights",
        amount: flightData.length,
        icon: (
          <FlightIcon
            className="icon"
            style={{
              backgroundColor: "rgba(255, 140, 0, 0.2)",
              color: "DarkOrange",
            }}
          />
        ),
      };
      break;
    case "package":
      dataER = {
        title: "Packages",
        amount: packageData.length,
        icon: (
          <InventoryIcon
            className="icon"
            style={{
              backgroundColor: "rgba(47, 79, 79, 0.2)",
              color: "DarkSlateGray",
            }}
          />
        ),
      };
      break;
    case "room":
      dataER = {
        title: "Rooms",
        amount: roomData.length,
        icon: (
          <SingleBedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(70, 130, 180, 0.2)",
              color: "SteelBlue",
            }}
          />
        ),
      };
      break;
    case "seat":
      dataER = {
        title: "Seats",
        amount: seatData.length,
        icon: (
          <AirlineSeatReclineExtraIcon
            className="icon"
            style={{
              backgroundColor: "rgba(60, 179, 113, 0.2)",
              color: "MediumSeaGreen",
            }}
          />
        ),
      };
      break;
    case "user":
      dataER = {
        title: "Users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(139, 0, 139, 0.2)",
              color: "DarkMagenta",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="subtitle">Available</span>
        <span className="title">{dataER.title}</span>
        <span className="counter">{dataER.amount}</span>
      </div>
      <div className="right">{dataER.icon}</div>
    </div>
  );
};

export default Widget;
