import "./singleHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import useFetch from "../../hooks/useFetch";

const SingleHotel = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [updatingStatus, setUpdatingStatus] = useState("Ready to update!");

  const { data, loading } = useFetch("/rooms");

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`/hotels/${hotelId}`);
        setHotel(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHotel();

    if (data) {
      const roomIds = data.map((room) => room.id);
      setRooms(roomIds);
    }
  }, [hotelId, data]);

  if (!hotel) {
    return <div>Loading...</div>;
  }

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

  const handleClick = async (e) => {
    e.preventDefault();
    setUpdatingStatus("Updating...");
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

        const updateHotel = {
          ...info,
          rooms,
          photos: list,
        };

        await axios.put(`/hotels/${hotelId}`, updateHotel);
        // await axios.put(`/hotels/`, updateHotel);
        setUpdatingStatus("Hotel has been updated!");

        console.log(updateHotel);
      } catch (err) {
        setUpdatingStatus(err.response.data);
      }
    } else {
      try {
        // no file selected
        const updateHotel = {
          ...info,
          rooms,
        };

        await axios.put(`/hotels/${hotelId}`, updateHotel);
        // await axios.put(`/hotels/`, updateHotel);
        setUpdatingStatus("Hotel has been updated!");
        console.log(updateHotel);
      } catch (err) {
        console.log(err);
        setUpdatingStatus(err.response.data.message);
      }
    }
  };

  console.log(info);
  console.log(hotel.featured);

  return (
    <div className="singleHotel">
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
                  <span className="itemValue">{hotel.name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Title:</span>
                  <span className="itemValue">{hotel.title}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{hotel.description}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Type:</span>
                  <span className="itemValue">{hotel.type}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">{hotel.price}</span>
                </div>
              </div>
              <div className="details">
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">{hotel.city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{hotel.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Facilities:</span>
                  <span className="itemValue">{hotel.facilities}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Stars:</span>
                  <span className="itemValue">{hotel.stars}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">ID:</span>
                  <span className="itemValue">{hotel._id}</span>
                </div>
              </div>
              <div className="details">
                <div className="detailItem">
                  <span className="itemKey">Rooms:</span>
                  <ul className="detailItemList">
                    {hotel.rooms.map((room, index) => (
                      <li key={index}>{room}</li>
                    ))}
                  </ul>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Featured:</span>
                  <span className="itemValue">{hotel.featured}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Created At:</span>
                  <span className="itemValue">{hotel.createdAt}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Updated At:</span>
                  <span className="itemValue">{hotel.updatedAt}</span>
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
              {hotel.photos.map((photo) => (
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
              <h1>Update Hotel</h1>
              <img
                src={files ? URL.createObjectURL(files[0]) : hotel.photos[0]}
                alt=""
              />
              <div className="formInput">
                <p>Image</p>
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
                {/* Left */}
                <div className="formInput">
                  <label htmlFor="name">Name</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={hotel.name}
                    id="name"
                  />
                  <label htmlFor="description">Description</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={hotel.description}
                    id="description"
                  />
                  <label htmlFor="city">City</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={hotel.city}
                    id="city"
                  />
                  <label htmlFor="facilities">Facilities</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={hotel.facilities}
                    id="facilities"
                  />
                  <label htmlFor="price">Price</label>
                  <input
                    onChange={handleChange}
                    type="number"
                    placeholder={hotel.price}
                    id="price"
                  />
                  {/* Room Types */}
                  <label>Room Type</label>
                  <select id="rooms" multiple onChange={handleSelect}>
                    {loading
                      ? "loading"
                      : data &&
                        data.map((room) => (
                          <option
                            key={room._id}
                            value={room._id}
                            selected={hotel.rooms.includes(room._id)}
                          >
                            {room.title} - {room._id}
                          </option>
                        ))}
                  </select>
                </div>
                {/* Right */}
                <div className="formInput">
                  <label htmlFor="title">Title</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={hotel.title}
                    id="title"
                  />
                  <label htmlFor="type">Type</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={hotel.type}
                    id="type"
                  />
                  <label htmlFor="address">Address</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={hotel.address}
                    id="address"
                  />
                  <label htmlFor="stars">Stars</label>
                  <input
                    onChange={handleChange}
                    type="number"
                    placeholder={hotel.stars}
                    id="stars"
                  />
                  {/* Featured */}
                  <label htmlFor="featured">Featured</label>
                  <select
                    name="featured"
                    id="featured"
                    defaultValue={hotel.featured}
                    onChange={handleChange}
                  >
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>
              </form>
              <br />
              <button onClick={handleClick}>Update Hotel</button>
              <br />
              <p className="updatingStatus">{updatingStatus}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleHotel;
