import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewHotel = ({ inputs, title }) => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [updatingStatus, setUpdatingStatus] = useState("Ready to create!");

  const { data, loading } = useFetch("/rooms");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
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
    if (!info.type) {
      setUpdatingStatus("Type is required!");
      return false;
    }
    if (!info.city) {
      setUpdatingStatus("City is required!");
      return false;
    }
    if (!info.address) {
      setUpdatingStatus("Address is required!");
      return false;
    }
    if (!info.facilities) {
      setUpdatingStatus("Facilities is required!");
      return false;
    }
    if (!info.stars) {
      setUpdatingStatus("Stars is required!");
      return false;
    }
    // stars are numbers
    if (isNaN(info.stars)) {
      setUpdatingStatus("Stars must be a number!");
      return false;
    }
    if (!info.price) {
      setUpdatingStatus("Price is required!");
      return false;
    }
    // price are numbers
    if (isNaN(info.price)) {
      setUpdatingStatus("Price must be a number!");
      return false;
    }
    if (!info.featured) {
      setUpdatingStatus("Featured is required!");
      return false;
    }
    if (rooms.length === 0) {
      setUpdatingStatus("Room type is required!");
      return false;
    }
    if (!files) {
      setUpdatingStatus("Photos are required!");
      return false;
    }
    return true;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(info);
    console.log(rooms);
    if (!validate()) return;
    setUpdatingStatus("Creating hotel...");
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

      const newHotel = {
        ...info,
        rooms,
        photos: list,
      };

      await axios.post("/hotels", newHotel);
      setUpdatingStatus("Hotel has been created!");
    } catch (err) {
      console.log(err);
      setUpdatingStatus(err.response.data.message);
    }
  };

  // console.log(info);

  return (
    <div className="newHotel">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        {/* TOP */}
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
        {/* BOTTOM */}
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
              <div className="selectRooms">
                <label>Room Type</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Create Hotel</button>
            </form>
            <br />
            <p className="updatingStatus">{updatingStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
