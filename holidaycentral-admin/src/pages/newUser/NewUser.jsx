import "./newUser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";

const NewUser = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [updatingStatus, setUpdatingStatus] = useState("Ready to register!");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Validation

  // const validateEmail = (email) => {
  //   const re = /\S+@\S+\.\S+/;
  //   return re.test(email);
  // };

  // const validatePassword = (password) => {
  //   return password.length >= 6;
  // };

  const validate = () => {
    if (!info.firstName) {
      setUpdatingStatus("First name is required!");
      return false;
    }
    if (!info.lastName) {
      setUpdatingStatus("Last name is required!");
      return false;
    }
    if (!info.username) {
      setUpdatingStatus("Username is required!");
      return false;
    }
    if (!info.email) {
      setUpdatingStatus("Email is required!");
      return false;
    }
    // if (!validateEmail(info.email)) {
    //   setUpdatingStatus("Invalid email address!");
    //   return false;
    // }
    if (!info.phone) {
      setUpdatingStatus("Phone is required!");
      return false;
    }
    if (!info.password) {
      setUpdatingStatus("Password is required!");
      return false;
    }
    // if (!validatePassword(info.password)) {
    //   setUpdatingStatus("Password must be at least 6 characters long!");
    //   return false;
    // }
    if (!info.role) {
      setUpdatingStatus("Role is required!");
      return false;
    }
    if (!info.city) {
      setUpdatingStatus("City is required!");
      return false;
    }
    return true;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setUpdatingStatus("Registering..."); // set status to updating
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

        const newUser = {
          ...info,
          img: url,
        };

        console.log(newUser);
        await axios.post("/auth/register", newUser);
        setUpdatingStatus("Registration successful!"); // set status to successful
      } catch (err) {
        console.log(err);
        setUpdatingStatus(err.response.data.message); // set status to error
      }
    } else {
      try {
        // no file selected
        const newUser = {
          ...info,
          img: "https://i.ibb.co/30NrpXX/avatar.jpg",
        };

        console.log(newUser);
        await axios.post("/auth/register", newUser);
        setUpdatingStatus("Registration successful!");
      } catch (err) {
        console.log(err);
        setUpdatingStatus(err.response.data.message); // set status to error
      }
    }
  };

  console.log(info);
  return (
    <div className="newUser">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        {/* <div className="top">
          <h1>{title}</h1>
        </div> */}
        <div className="bottom">
          <div className="left">
            <h1>{title}</h1>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://i.ibb.co/30NrpXX/avatar.jpg"
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
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {input.type === "select" ? (
                    <select onChange={handleChange} id={input.id}>
                      {input.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      onChange={handleChange}
                      type={input.type}
                      placeholder={input.placeholder}
                      id={input.id}
                    />
                  )}
                </div>
              ))}

              <button onClick={handleClick}>Register</button>
            </form>
            <br />
            <p className="updatingStatus">{updatingStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
