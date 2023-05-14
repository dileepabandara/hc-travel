import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user && user.role === "Admin";

  // TODO: Add bulk upload via CSV

  const handleBulkUpload = async (collectionName) => {
    console.log("Bulk Upload", collectionName);

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".csv";

    fileInput.onchange = async (event) => {
      const file = event.target.files[0];

      try {
        const csvData = await file.text();
        const jsonArray = csvData.split(/\r?\n/).map((row) => {
          const values = row.split(",");
          return {
            name: values[0],
            description: values[1],
            destination: values[2],
            duration: values[3],
            travelers: parseInt(values[4]) || null,
            specialty: values[5] || null,
            price: parseInt(values[6]) || null,
            rating: parseInt(values[7]) || null,
            photos: [values[8], values[9], values[10]].filter(Boolean),
            featured: values[11] === "true",
          };
        });

        const singleJson = jsonArray.map((obj) => {
          return Object.entries(obj).reduce((acc, [key, value]) => {
            if (value !== null && value !== "") {
              acc[key] = value;
            }
            return acc;
          }, {});
        });

        console.log(JSON.stringify(singleJson[0]));

        // const response = await fetch(
        //   `http://localhost:8090/api/${collectionName}`,
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(singleJson[0]),
        //   }
        // );

        // if (!response.ok) {
        //   throw new Error("Bulk upload failed!");
        // }

        console.log("Bulk upload successful!");
      } catch (error) {
        console.error(error);
      }
    };

    fileInput.click();
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="hotel" />
          <Widget type="flight" />
          <Widget type="package" />
        </div>
        <div className="widgets">
          <Widget type="room" />
          <Widget type="seat" />

          {isAdmin && (
            <>
              <Widget type="user" />
            </>
          )}
        </div>
        <div className="bulkUpload">
          <h1>Bulk Upload</h1>
          <button
            className="uploadBtn"
            onClick={() => handleBulkUpload("hotels")}
          >
            Hotels
          </button>
          <button
            className="uploadBtn"
            onClick={() => handleBulkUpload("rooms")}
          >
            Rooms
          </button>
          <button
            className="uploadBtn"
            onClick={() => handleBulkUpload("flights")}
          >
            Flights
          </button>
          <button
            className="uploadBtn"
            onClick={() => handleBulkUpload("seats")}
          >
            Seats
          </button>
          <button
            className="uploadBtn"
            onClick={() => handleBulkUpload("packages")}
          >
            Packages
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
