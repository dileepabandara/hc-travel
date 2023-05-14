import "./singleFlight.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import useFetch from "../../hooks/useFetch";

const SingleFlight = () => {
  const [flight, setFlight] = useState(null);
  const { flightId } = useParams();
  // Update flight
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [seats, setSeats] = useState([]);
  const [updatingStatus, setUpdatingStatus] = useState("Ready to update!");

  const { data, loading } = useFetch("/seats");

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await axios.get(`/flights/${flightId}`);
        setFlight(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFlight();
  }, [flightId]);

  useEffect(() => {
    if (flight) {
      setSeats(flight.seats);
    }
  }, [flight]);

  if (!flight) {
    return <div>Loading...</div>;
  }

  const options = ["Yes", "No"];

  const handleChange = (e) => {
    const valueUpdated =
      e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value === "Yes"
        ? true
        : e.target.value === "No"
        ? false
        : e.target.value;

    setInfo((prev) => ({ ...prev, [e.target.id]: valueUpdated }));
    const { id, value } = e.target;
    setFlight((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSeats(value);
  };

  //TODO: Add Validation

  // console.log(files);

  const handleClick = async (e) => {
    e.preventDefault();
    //TODO: if (!validate()) return;
    setUpdatingStatus("Updating..."); // set status to updating
    const data = new FormData();
    if (files) {
      // check if file is selected
      data.append("file", files);
      data.append("upload_preset", "upload");
      try {
        const list = await Promise.all(
          Object.values(files).map(async (file) => {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "upload");
            const uploadRes = await axios.post(
              "https://api.cloudinary.com/v1_1/holidaycentral/image/upload",
              data
            );

            const { url } = uploadRes.data;
            return url;
          })
        );

        const updateFlight = {
          ...info,
          seats,
          photos: list,
        };

        await axios.put(`/flights/${flightId}`, updateFlight);
        setUpdatingStatus("Flight has been updated!");

        console.log("updateFlight: ", updateFlight);
      } catch (err) {
        console.log(err);
        setUpdatingStatus(err.response.data.message);
      }
    } else {
      try {
        // no file selected
        const updateFlight = {
          ...info,
          seats,
        };

        await axios.put(`/flights/${flightId}`, updateFlight);
        console.log("updateFlight: ", updateFlight);
        setUpdatingStatus("Flight has been updated!");
      } catch (err) {
        console.log(err);
        setUpdatingStatus(err.response.data.message);
      }
    }
  };

  console.log(info);

  return (
    <div className="singleFlight">
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
                  <span className="itemKey">Name:</span>
                  <span className="itemValue">{flight.name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Title:</span>
                  <span className="itemValue">{flight.title}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{flight.description}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Departure Destination:</span>
                  <span className="itemValue">
                    {flight.departureDestination}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Departure Date:</span>
                  <span className="itemValue">{flight.departureDate}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Arrival Destination:</span>
                  <span className="itemValue">{flight.arrivalDestination}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Arrival Date:</span>
                  <span className="itemValue">{flight.arrivalDate}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Arline:</span>
                  <span className="itemValue">{flight.airline}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Cabin Class:</span>
                  <span className="itemValue">{flight.cabinClass}</span>
                </div>
              </div>
              <div className="details">
                <div className="detailItem">
                  <span className="itemKey">Seats:</span>
                  <ul className="detailItemList">
                    {flight.seats.map((seat, index) => (
                      <li key={index}>{seat}</li>
                    ))}
                  </ul>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Duration:</span>
                  <span className="itemValue">{flight.duration}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">{flight.price}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Featured:</span>
                  <span className="itemValue">
                    {flight.featured ? "Yes" : "No"}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">ID:</span>
                  <span className="itemValue">{flight._id}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Created At:</span>
                  <span className="itemValue">{flight.createdAt}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Updated At:</span>
                  <span className="itemValue">{flight.updatedAt}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* MIDDLE */}
        <div className="middle">
          <div className="left">
            <h1 className="title">Old Images</h1>
            <div className="imageList">
              {flight.photos.map((photo) => (
                <img
                  className="itemImg"
                  src={photo}
                  alt=""
                  key={photo}
                  onClick={() => {
                    const newWindow = window.open(photo, "_blank");
                    newWindow.focus();
                  }}
                />
              ))}
            </div>
            <br />
            <h1 className="title">Updated Images</h1>
            <div className="imageList">
              {files &&
                Array.from(files).map((file) => (
                  <img
                    className="itemImg"
                    src={URL.createObjectURL(file)}
                    alt=""
                    key={file.name}
                    onClick={() => {
                      const newWindow = window.open(
                        URL.createObjectURL(file),
                        "_blank"
                      );
                      newWindow.focus();
                    }}
                  />
                ))}
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="newContainer">
          <div className="bottom">
            <div className="left">
              <h1>Update Flight</h1>
              <img
                src={files ? URL.createObjectURL(files[0]) : flight.photos[0]}
                alt=""
              />
              <div className="formInput">
                <p>Images</p>
                <label htmlFor="file">
                  <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>
              <button
                className="remove"
                onClick={() => {
                  setFiles("");
                }}
              >
                Remove All Images
              </button>
            </div>
            <div className="right">
              <form>
                <div className="formInput">
                  <label htmlFor="name">Name</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={flight.name}
                    id="name"
                  />
                  <label htmlFor="description">Description</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={flight.description}
                    id="description"
                  />
                  <label htmlFor="departureDestination">
                    Departure Destination
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={flight.departureDestination}
                    id="departureDestination"
                  />
                  <label htmlFor="arrivalDestination">
                    Arrival Destination
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={flight.arrivalDestination}
                    id="arrivalDestination"
                  />
                  <label htmlFor="cabinClass">Cabin Class</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={flight.cabinClass}
                    id="cabinClass"
                  />
                  <label htmlFor="price">Price</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={flight.price}
                    id="price"
                  />
                  <div className="selectSeats">
                    <label>Seats</label>
                    <select id="seats" multiple onChange={handleSelect}>
                      {loading
                        ? "loading"
                        : data &&
                          data.map((seat) => (
                            <option
                              key={seat._id}
                              value={seat._id}
                              selected={flight.seats.includes(seat._id)}
                            >
                              {seat.title} - {seat._id}
                            </option>
                          ))}
                    </select>
                  </div>
                </div>
                <div className="formInput">
                  <label htmlFor="title">Title</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={flight.title}
                    id="title"
                  />
                  <label htmlFor="airline">Airline</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={flight.airline}
                    id="airline"
                  />
                  <label htmlFor="departureDate">Departure Date</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={flight.departureDate}
                    id="departureDate"
                  />
                  <label htmlFor="arrivalDate">Arrival Date</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={flight.arrivalDate}
                    id="arrivalDate"
                  />
                  <label htmlFor="duration">Duration</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={flight.duration}
                    id="duration"
                  />
                  <label>Featured</label>
                  {flight && (
                    <select
                      onChange={handleChange}
                      id="featured"
                      value={flight.featured}
                    >
                      {options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </form>
              <br />
              <button onClick={handleClick}>Update Flight</button>
              <br />
              <p className="updatingStatus">{updatingStatus}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFlight;
