import "./newFlight.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewFlight = ({ inputs, title }) => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [seats, setSeats] = useState([]);
  const [updatingStatus, setUpdatingStatus] = useState("Ready to create!");

  const { data, loading } = useFetch("/seats");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSeats(value);
  };

  console.log(files);

  // Validation

  const validate = () => {
    if (!info.name) {
      setUpdatingStatus("Name is required!");
      return false;
    }
    if (!info.title) {
      setUpdatingStatus("Title is required!");
      return false;
    }
    if (!info.description) {
      setUpdatingStatus("Description is required!");
      return false;
    }
    if (!info.airline) {
      setUpdatingStatus("Airline is required!");
      return false;
    }
    if (!info.departureDestination) {
      setUpdatingStatus("Departure Destination is required!");
      return false;
    }
    if (!info.departureDate) {
      setUpdatingStatus("Departure date is required!");
      return false;
    }
    if (!info.arrivalDestination) {
      setUpdatingStatus("Arrival Destination is required!");
      return false;
    }
    if (!info.arrivalDate) {
      setUpdatingStatus("Arrival date is required!");
      return false;
    }
    if (!info.cabinClass) {
      setUpdatingStatus("Cabin class is required!");
      return false;
    }
    if (!info.duration) {
      setUpdatingStatus("Duration is required!");
      return false;
    }
    if (!info.price) {
      setUpdatingStatus("Price is required!");
      return false;
    }
    if (!info.featured) {
      setUpdatingStatus("Featured is required!");
      return false;
    }
    if (seats.length === 0) {
      setUpdatingStatus("At least one seat is required!");
      return false;
    }
    if (files.length === 0) {
      setUpdatingStatus("At least one image is required!");
      return false;
    }
    return true;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(info);
    if (!validate()) return;
    setUpdatingStatus("Creating flight...");
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

      const newFlight = {
        ...info,
        seats,
        photos: list,
      };

      await axios.post("/flights", newFlight);
      setUpdatingStatus("Flight has been created!");
    } catch (err) {
      console.log(err);
      setUpdatingStatus(err.response.data.message);
    }
  };

  return (
    <div className="newFlight">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1>Uploaded Images</h1>
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
        <div className="bottom">
          <div className="left">
            <h1>{title}</h1>
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
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
            <div className="formInput">
              <button
                className="remove"
                onClick={() => {
                  setFiles("");
                }}
              >
                Remove All Images
              </button>
            </div>
          </div>
          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div className="selectFeatured">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectSeats">
                <label>Seat Seats</label>
                <select id="seats" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((seat) => (
                        <option key={seat._id} value={seat._id}>
                          {seat.title}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Create Flight</button>
            </form>
            <br />
            <p className="updatingStatus">{updatingStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFlight;
