import "./newPackage.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";

const NewPackage = ({ inputs, title }) => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [updatingStatus, setUpdatingStatus] = useState("Ready to create!");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  console.log(files);

  // Validation
  const validate = () => {
    if (!info.name) {
      setUpdatingStatus("Name is required!");
      return false;
    }
    if (!info.description) {
      setUpdatingStatus("Description is required!");
      return false;
    }
    if (!info.destination) {
      setUpdatingStatus("Destination is required!");
      return false;
    }
    if (!info.duration) {
      setUpdatingStatus("Duration is required!");
      return false;
    }
    if (!info.travelers) {
      setUpdatingStatus("No. of travelers are required!");
      return false;
    }
    if (!info.specialty) {
      setUpdatingStatus("Specialty is required!");
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
    if (!info.rating) {
      setUpdatingStatus("Rating is required!");
      return false;
    }
    if (isNaN(info.rating)) {
      setUpdatingStatus("Rating must be a number!");
      return false;
    }
    if (!info.featured) {
      setUpdatingStatus("Featured is required!");
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
    if (!validate()) return;
    setUpdatingStatus("Creating package...");
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

      const newPackage = {
        ...info,
        photos: list,
      };

      await axios.post("/packages", newPackage);
      setUpdatingStatus("Package has been created!");
    } catch (err) {
      console.log(err);
      setUpdatingStatus(err.response.data);
    }
  };

  return (
    <div className="newPackage">
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
            </form>
            <button onClick={handleClick}>Create Package</button>
            <br />
            <p className="updatingStatus">{updatingStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPackage;
