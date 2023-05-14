import "./newSeat.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewSeat = ({ inputs, title }) => {
  const [info, setInfo] = useState({});
  const [flightID, setFlightID] = useState(undefined);
  const [seats, setSeats] = useState([]);
  const [updatingStatus, setUpdatingStatus] = useState("Ready to create!");

  const { data, loading } = useFetch("/flights");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const validate = () => {
    if (!info.title) {
      setUpdatingStatus("Title is required!");
      return false;
    }
    if (!info.price) {
      setUpdatingStatus("Price is required!");
      return false;
    }
    if (isNaN(info.price)) {
      setUpdatingStatus("Price must be a number!");
      return false;
    }
    if (!info.description) {
      setUpdatingStatus("Description is required!");
      return false;
    }
    if (!info.maxPeople) {
      setUpdatingStatus("Max people is required!");
      return false;
    }
    if (isNaN(info.maxPeople)) {
      setUpdatingStatus("Max people must be a number!");
      return false;
    }
    if (!seats) {
      setUpdatingStatus("Seats are required!");
      return false;
    }
    const seatNumbers = seats.split(",").map((seat) => seat.trim());
    if (seatNumbers.length === 0) {
      setUpdatingStatus("Seats cannot be empty!");
      return false;
    }
    for (let i = 0; i < seatNumbers.length; i++) {
      if (isNaN(seatNumbers[i])) {
        setUpdatingStatus(`Seat ${seatNumbers[i]} is not a number!`);
        return false;
      }
    }
    if (!flightID) {
      setUpdatingStatus("Flight is required!");
      return false;
    }
    return true;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setUpdatingStatus("Creating Seat...");
    const seatNumbers = seats.split(",").map((seat) => ({ number: seat }));
    try {
      await axios.post(`/seats/${flightID}`, { ...info, seatNumbers });
      setUpdatingStatus("Seat created!");
    } catch (err) {
      console.log(err);
      setUpdatingStatus(err.response.data.message);
    }
  };

  console.log(info);

  return (
    <div className="newSeat">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Bulk Upload</h1>
          {/* TODO: Add bulk upload via CSV */}
        </div>
        <div className="bottom">
          <div className="left">
            <h1>{title}</h1>
            <img src="https://i.ibb.co/1Jd67Yv/seat.png" alt="" />
          </div>
          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Seats</label>
                <textarea
                  onChange={(e) => setSeats(e.target.value)}
                  placeholder="give comma between seat numbers."
                />
              </div>
              <div className="formInput">
                <label>Choose a flight</label>
                <select
                  id="flightID"
                  onChange={(e) => setFlightID(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((flight) => (
                        <option key={flight._id} value={flight._id}>
                          {flight.name}
                        </option>
                      ))}
                </select>
              </div>
            </form>
            <button onClick={handleClick}>Create Seat</button>
            <br />
            <p className="updatingStatus">{updatingStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSeat;
