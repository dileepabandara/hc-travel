import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewRoom = ({ inputs, title }) => {
  const [info, setInfo] = useState({});
  const [hotelID, setHotelID] = useState(undefined);
  const [rooms, setRooms] = useState([]);
  const [updatingStatus, setUpdatingStatus] = useState("Ready to create!");

  const { data, loading } = useFetch("/hotels");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const validate = () => {
    if (!info.title) {
      setUpdatingStatus("Title is required!");
      return false;
    }
    if (!info.description) {
      setUpdatingStatus("Description is required!");
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
    if (!info.maxPeople) {
      setUpdatingStatus("Max people is required!");
      return false;
    }
    if (isNaN(info.maxPeople)) {
      setUpdatingStatus("Max people must be a number!");
      return false;
    }
    if (!rooms) {
      setUpdatingStatus("Rooms are required!");
      return false;
    }
    const roomNumbers = rooms.split(",").map((room) => room.trim());
    if (roomNumbers.length === 0) {
      setUpdatingStatus("Rooms cannot be empty!");
      return false;
    }
    for (let i = 0; i < roomNumbers.length; i++) {
      if (isNaN(roomNumbers[i])) {
        setUpdatingStatus(`Room ${roomNumbers[i]} is not a number!`);
        return false;
      }
    }
    if (!hotelID) {
      setUpdatingStatus("Hotel is required!");
      return false;
    }
    return true;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setUpdatingStatus("Creating room...");
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      await axios.post(`/rooms/${hotelID}`, { ...info, roomNumbers });
      setUpdatingStatus("Room created!");
    } catch (err) {
      console.log(err);
      setUpdatingStatus(err.response.data);
    }
  };

  console.log(info);

  return (
    <div className="newRoom">
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
            <img src="https://i.ibb.co/RHMgSyv/room.png" alt="" />
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
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="give comma between room numbers."
                />
              </div>
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="hotelID"
                  onChange={(e) => setHotelID(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>
                          {hotel.name}
                        </option>
                      ))}
                </select>
              </div>
            </form>
            <button onClick={handleClick}>Create Room</button>
            <br />
            <p className="updatingStatus">{updatingStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
