import "./singleSeat.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const SingleSeat = () => {
  // const [seatNumbers, setSeatNumbers] = useState(null);
  const { seatId } = useParams();
  // Update Seat
  const [info, setInfo] = useState({});
  const [seats, setSeats] = useState(null);
  const [setFlightID] = useState(undefined);
  const [updatingStatus, setUpdatingStatus] = useState("Ready to update!");

  const { data, loading } = useFetch("/flights");

  useEffect(() => {
    const fetchSeat = async () => {
      try {
        const response = await axios.get(`/seats/${seatId}`);
        setSeats(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSeat();
  }, [seatId]);

  if (!seats) {
    return <div>Loading...</div>;
  }

  //  const options = data.map((flight) => flight.name.toString());

  // Update Seat
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setUpdatingStatus("Updating seat...");
    //const seatNumbers = seats.split(",").map((seat) => ({ number: seat }));
    try {
      await axios.put(`/seats/${seatId}`, { ...info });
      setUpdatingStatus("Seat updated!");
    } catch (err) {
      console.log(err);
      setUpdatingStatus(err.response.data.message);
    }
  };

  console.log(info);

  return (
    <div className="singleSeat">
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
                  <span className="itemValue">{seats.title}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price</span>
                  <span className="itemValue">{seats.price}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{seats.description}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Max People:</span>
                  <span className="itemValue">{seats.maxPeople}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">ID:</span>
                  <span className="itemValue">{seats._id}</span>
                </div>
              </div>
              <div className="details">
                <div className="detailItem">
                  <span className="itemKey">Seat Numbers:</span>
                  {seats.seatNumbers && (
                    <span className="itemValue">
                      {seats.seatNumbers.map((seatNumber) => (
                        <div key={seatNumber._id}>
                          <p>Number: {seatNumber.number}</p>
                          <p>
                            Unavailable Dates:{" "}
                            {seatNumber.unavailableDates.join(", ")}
                          </p>
                        </div>
                      ))}
                    </span>
                  )}
                </div>
              </div>
              <div className="details">
                <div className="detailItem">
                  <span className="itemKey">Created At:</span>
                  <span className="itemValue">{seats.createdAt}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Updated At:</span>
                  <span className="itemValue">{seats.updatedAt}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="newContainer">
          <div className="bottom">
            <div className="left">
              <h1>Update Seat</h1>
              <img src="https://i.ibb.co/1Jd67Yv/seat.png" alt="" />
            </div>
            <div className="right">
              <form>
                <div className="formInput">
                  <label htmlFor="title">Title</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={seats.title}
                    id="title"
                  />
                  <label htmlFor="description">Description</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={seats.description}
                    id="description"
                  />
                  <div className="formInput">
                    <label>Seats</label>
                    <textarea
                      onChange={(e) => setSeats(e.target.value)}
                      placeholder={seats.seatNumbers
                        .map((seat) => seat.number)
                        .join(", ")}
                    />
                  </div>
                </div>
                <div className="formInput">
                  <label htmlFor="price">Price</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={seats.price}
                    id="price"
                  />
                  <label htmlFor="maxPeople">Max People</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={seats.maxPeople}
                    id="maxPeople"
                  />
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
                </div>
              </form>
              <br />
              <button onClick={handleClick}>Update Seat</button>
              <br />
              <p className="updatingStatus">{updatingStatus}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSeat;
