import "./singleRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const SingleRoom = () => {
  const { roomId } = useParams();
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [updatingStatus, setUpdatingStatus] = useState("Ready to update!");

  const { data, loading } = useFetch("/hotels");

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`/rooms/${roomId}`);
        setRooms(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRoom();

    if (data) {
      const hotelIds = data.map((hotel) => hotel.id);
      setRooms(hotelIds);
    } else {
      setRooms([]);
    }
  }, [roomId, data]);

  if (!rooms) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    if (e.target.id === "roomNumbers") {
      const roomNumbers = e.target.value
        .split(",")
        .map((room) => ({ number: room }));
      setInfo((prev) => ({ ...prev, [e.target.id]: roomNumbers }));
    } else {
      setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setUpdatingStatus("Updating room...");
    try {
      await axios.put(`/rooms/${roomId}`, { ...info });
      setUpdatingStatus("Room updated!");
    } catch (err) {
      console.log(err);
      setUpdatingStatus(err.response.data.message);
    }
  };

  console.log(info);

  return (
    <div className="singleRoom">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        {/* TOP */}
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              <div className="details">
                <div className="detailItem">
                  <span className="itemKey">Title:</span>
                  <span className="itemValue">{rooms.title}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{rooms.description}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price</span>
                  <span className="itemValue">{rooms.price}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Max People:</span>
                  <span className="itemValue">{rooms.maxPeople}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">ID:</span>
                  <span className="itemValue">{rooms._id}</span>
                </div>
              </div>
              <div className="details">
                <div className="detailItem">
                  <span className="itemKey">Room Numbers:</span>
                  {rooms.roomNumbers && (
                    <span className="itemValue">
                      {rooms.roomNumbers.map((roomNumber) => (
                        <div key={roomNumber._id}>
                          <p>Number: {roomNumber.number}</p>
                        </div>
                      ))}
                    </span>
                  )}
                </div>
              </div>
              <div className="details">
                <div className="detailItem">
                  <span className="itemKey">Created At:</span>
                  <span className="itemValue">{rooms.createdAt}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Updated At:</span>
                  <span className="itemValue">{rooms.updatedAt}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="newContainer">
          <div className="bottom">
            <div className="left">
              <h1>Update Room</h1>
              <img src="https://i.ibb.co/1Jd67Yv/room.png" alt="" />
            </div>
            <div className="right">
              <form>
                <div className="formInput">
                  <label htmlFor="title">Title</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={rooms.title}
                    id="title"
                  />
                  <label htmlFor="description">Description</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={rooms.description}
                    id="description"
                  />
                  {/* Rooms */}
                  <label>Rooms</label>
                  <textarea
                    onChange={handleChange}
                    placeholder={rooms?.roomNumbers
                      ?.map((room) => room.number)
                      ?.join(", ")}
                    id="roomNumbers"
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="price">Price</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={rooms.price}
                    id="price"
                  />
                  <label htmlFor="maxPeople">Max People</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={rooms.maxPeople}
                    id="maxPeople"
                  />
                  <div className="formInput">
                    {/* Choose Hotel */}
                    <label>Choose a hotel</label>
                    <select id="hotelID" onChange={handleChange}>
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
                </div>
              </form>
              <br />
              <button onClick={handleClick}>Update Room</button>
              <br />
              <p className="updatingStatus">{updatingStatus}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRoom;
