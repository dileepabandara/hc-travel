import "./singlePackage.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const SinglePackageHCT = () => {
  const { packageId } = useParams();
  const [packageHCT, setPackageHCT] = useState(null);
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [updatingStatus, setUpdatingStatus] = useState("Ready to update!");

  console.log(packageId);

  useEffect(() => {
    const fetchPackageHCT = async () => {
      try {
        const response = await axios.get(`/packages/${packageId}`);
        setPackageHCT(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPackageHCT();
  }, [packageId]);

  if (!packageHCT) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
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

        const updatePackageHCT = {
          ...info,
          photos: list,
        };

        await axios.put(`/packages/${packageId}`, updatePackageHCT);
        // await axios.put(`/packageHCTs/`, updatePackageHCT);
        setUpdatingStatus("Package has been updated!");

        console.log(updatePackageHCT);
      } catch (err) {
        setUpdatingStatus(err.response.data);
      }
    } else {
      try {
        // no file selected
        const updatePackageHCT = {
          ...info,
        };

        await axios.put(`/packages/${packageId}`, updatePackageHCT);
        // await axios.put(`/packageHCTs/`, updatePackageHCT);
        setUpdatingStatus("Package has been updated!");
        console.log(updatePackageHCT);
      } catch (err) {
        console.log(err);
        setUpdatingStatus(err.response.data.message);
      }
    }
  };

  console.log(info);
  console.log(packageHCT.featured);

  return (
    <div className="singlePackageHCT">
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
                  <span className="itemValue">{packageHCT.name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{packageHCT.description}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Destination:</span>
                  <span className="itemValue">{packageHCT.destination}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Duration:</span>
                  <span className="itemValue">{packageHCT.duration}</span>
                </div>
              </div>
              <div className="details">
                <div className="detailItem">
                  <span className="itemKey">No. of Travelers:</span>
                  <span className="itemValue">{packageHCT.travelers}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Specialty:</span>
                  <span className="itemValue">{packageHCT.specialty}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">{packageHCT.price}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Rating:</span>
                  <span className="itemValue">{packageHCT.rating}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">ID:</span>
                  <span className="itemValue">{packageHCT._id}</span>
                </div>
              </div>
              <div className="details">
                <div className="detailItem">
                  <span className="itemKey">Featured:</span>
                  <span className="itemValue">{packageHCT.featured}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Created At:</span>
                  <span className="itemValue">{packageHCT.createdAt}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Updated At:</span>
                  <span className="itemValue">{packageHCT.updatedAt}</span>
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
              {packageHCT.photos.map((photo) => (
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
              <h1>Update Package</h1>
              <img
                src={
                  files ? URL.createObjectURL(files[0]) : packageHCT.photos[0]
                }
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
                    placeholder={packageHCT.name}
                    id="name"
                  />
                  <label htmlFor="destination">Destination</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={packageHCT.destination}
                    id="destination"
                  />
                  <label htmlFor="travelers">No. of Travelers</label>
                  <input
                    onChange={handleChange}
                    type="number"
                    placeholder={packageHCT.travelers}
                    id="travelers"
                  />
                  <label htmlFor="price">Price</label>
                  <input
                    onChange={handleChange}
                    type="number"
                    placeholder={packageHCT.price}
                    id="price"
                  />
                  {/* Featured */}
                  <label htmlFor="featured">Featured</label>
                  <select
                    name="featured"
                    id="featured"
                    defaultValue={packageHCT.featured}
                    onChange={handleChange}
                  >
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>
                {/* Right */}
                <div className="formInput">
                  <label htmlFor="description">Description</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={packageHCT.description}
                    id="description"
                  />
                  <label htmlFor="duration">Duration</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={packageHCT.duration}
                    id="duration"
                  />
                  <label htmlFor="specialty">Specialty</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={packageHCT.specialty}
                    id="specialty"
                  />
                  <label htmlFor="rating">Rating</label>
                  <input
                    onChange={handleChange}
                    type="number"
                    placeholder={packageHCT.rating}
                    id="rating"
                  />
                </div>
              </form>
              <br />
              <button onClick={handleClick}>Update Package</button>
              <br />
              <p className="updatingStatus">{updatingStatus}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePackageHCT;
