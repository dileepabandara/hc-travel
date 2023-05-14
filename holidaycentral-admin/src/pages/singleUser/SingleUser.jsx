import "./singleUser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const SingleUser = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  // Update User
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [updatingStatus, setUpdatingStatus] = useState("Ready to update!");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/users/${userId}`);
        setUser(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const options = ["Admin", "TravelAgent", "BackofficeStaff"];

  // Update User
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    const { id, value } = e.target;
    setUser((prev) => ({ ...prev, [id]: value }));
  };

  //TODO: Add Validation

  const handleClick = async (e) => {
    e.preventDefault();
    //TODO: if (!validate()) return;
    setUpdatingStatus("Updating..."); // set status to updating
    const data = new FormData();
    if (file) {
      // check if file is selected
      data.append("file", file);
      data.append("upload_preset", "upload");
      try {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/holidaycentral/image/upload",
          data
        );

        const { url } = uploadRes.data;

        const updateUser = {
          _id: userId,
          ...info,
          img: url,
        };

        await axios.put(`/users/`, updateUser);
        setUpdatingStatus("Update successful!"); // set status to successful

        console.log(updateUser);
      } catch (err) {
        console.log(err);
        setUpdatingStatus("Error updating user."); // set status to error
      }
    } else {
      try {
        // no file selected
        const updateUser = {
          _id: userId,
          ...info,
          img: user.img,
        };

        await axios.put(`/users/`, updateUser);
        setUpdatingStatus("Update successful!"); // set status to successful
        console.log(updateUser);
      } catch (err) {
        console.log(err);
        setUpdatingStatus(err.response.data.message); // set status to error
      }
    }
  };

  console.log(info);

  return (
    <div className="singleUser">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              <img src={user.img} alt="" className="itemImg" />
              <div className="details">
                <div className="detailItem">
                  <span className="itemKey">First Name:</span>
                  <span className="itemValue">{user.firstName}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Last Name:</span>
                  <span className="itemValue">{user.lastName}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Username:</span>
                  <span className="itemValue">{user.username}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">{user.city}</span>
                </div>
              </div>
              <div className="details">
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{user.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Role:</span>
                  <span className="itemValue">{user.role}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">ID:</span>
                  <span className="itemValue">{user._id}</span>
                </div>
              </div>
              <div className="details">
                <div className="detailItem">
                  <span className="itemKey">Created At:</span>
                  <span className="itemValue">{user.createdAt}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Updated At:</span>
                  <span className="itemValue">{user.updatedAt}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="newContainer">
          <div className="bottom">
            <div className="left">
              <h1>Update User</h1>
              <img
                src={file ? URL.createObjectURL(file) : { user } && user.img}
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
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <br />
              <button onClick={handleClick}>Update</button>
              <br />
              <p className="updatingStatus">{updatingStatus}</p>
            </div>
            <div className="right">
              <form>
                <div className="formInput">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={user.firstName}
                    id="firstName"
                  />
                  <label htmlFor="username">Username</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={user.username}
                    id="username"
                  />
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={user.email}
                    id="email"
                  />
                  <label htmlFor="role">Role</label>
                  {user && (
                    <select onChange={handleChange} id="role" value={user.role}>
                      {options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="formInput">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={user.lastName}
                    id="lastName"
                  />
                  <label htmlFor="city">City</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={user.city}
                    id="city"
                  />
                  <label htmlFor="phone">Phone</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder={user.phone}
                    id="phone"
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    onChange={handleChange}
                    type="password"
                    placeholder={
                      user.password ? user.password.replace(/./g, "*") : ""
                    }
                    id="password"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
