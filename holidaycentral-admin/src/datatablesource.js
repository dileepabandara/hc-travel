// Users
export const userColumns = [
  {
    field: "user",
    headerName: "User",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.img || "https://i.ibb.co/30NrpXX/avatar.jpg"}
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "firstName",
    headerName: "First Name",
    width: 150,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 150,
  },
  {
    field: "role",
    headerName: "Role",
    width: 150,
    renderCell: (params) => {
      return (
        <div className={`cellWithRole ${params.row.role}`}>
          {params.row.role}
        </div>
      );
    },
  },
  {
    field: "city",
    headerName: "City",
    width: 150,
  },
  {
    field: "_id",
    headerName: "User ID",
    width: 230,
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
  },
];

// Flights
export const flightColumns = [
  { field: "_id", headerName: "ID", width: 220 },
  {
    field: "name",
    headerName: "Name",
    width: 120,
  },
  {
    field: "title",
    headerName: "Title",
    width: 120,
  },
  {
    field: "description",
    headerName: "Description",
    width: 150,
  },
  {
    field: "airline",
    headerName: "Airline",
    width: 100,
  },
  {
    field: "departureDestination",
    headerName: "Departure",
    width: 100,
  },
  {
    field: "departureDate",
    headerName: "Departure Date",
    width: 120,
    valueGetter: (params) => {
      const departureDate = params.row.departureDate;
      if (departureDate) {
        return departureDate.slice(0, 10);
      } else {
        return params.row.departureDate;
      }
    },
  },
  {
    field: "arrivalDestination",
    headerName: "Arrival",
    width: 100,
  },
  {
    field: "arrivalDate",
    headerName: "Arrival Date",
    width: 120,
    valueGetter: (params) => {
      const arrivalDate = params.row.arrivalDate;
      if (arrivalDate) {
        return arrivalDate.slice(0, 10);
      } else {
        return params.row.arrivalDate;
      }
    },
  },
  {
    field: "cabinClass",
    headerName: "Cabin Class",
    width: 100,
  },
  {
    field: "seats",
    headerName: "Total Seats",
    width: 100,
    valueGetter: (params) =>
      params.row.seats ? params.row.seats.length : "No Seats",
  },
  {
    field: "duration",
    headerName: "Duration",
    width: 100,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "featured",
    headerName: "Featured",
    width: 80,
    valueGetter: (params) => {
      return params.row.featured ? "Yes" : "No";
    },
  },
];

// Seats
export const seatColumns = [
  { field: "_id", headerName: "ID", width: 220 },
  {
    field: "title",
    headerName: "Title",
    width: 150,
  },
  {
    field: "price",
    headerName: "Price",
    width: 150,
  },
  {
    field: "description",
    headerName: "Description",
    width: 150,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 150,
  },
  {
    field: "seatNumbers",
    headerName: "Seat Numbers",
    width: 150,
    valueGetter: (params) =>
      params.row.seatNumbers
        ? params.row.seatNumbers.map((seat) => seat.number).join(", ")
        : "",
  },
];

// Hotels
export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 220 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "description",
    headerName: "Description",
    width: 230,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithType ${params.row.type}`}>
          {params.row.type}
        </div>
      );
    },
  },
  {
    field: "city",
    headerName: "City",
    width: 150,
  },
  {
    field: "stars",
    headerName: "Stars",
    width: 100,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "featured",
    headerName: "Featured",
    width: 80,
    valueGetter: (params) => {
      return params.row.featured ? "Yes" : "No";
    },
  },
];

// Rooms
export const roomColumns = [
  { field: "_id", headerName: "ID", width: 220 },
  {
    field: "title",
    headerName: "Title",
    width: 120,
  },
  {
    field: "description",
    headerName: "Description",
    width: 300,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
  {
    field: "roomNumbers",
    headerName: "Room Numbers",
    width: 150,
    valueGetter: (params) =>
      params.row.roomNumbers
        ? params.row.roomNumbers.map((room) => room.number).join(", ")
        : "",
  },
];

// Packages
export const packageColumns = [
  { field: "_id", headerName: "ID", width: 220 },
  {
    field: "name",
    headerName: "Name",
    width: 120,
  },
  {
    field: "description",
    headerName: "Description",
    width: 100,
  },
  {
    field: "destination",
    headerName: "Destination",
    width: 120,
  },
  {
    field: "duration",
    headerName: "Duration",
    width: 100,
  },
  {
    field: "travelers",
    headerName: "Travelers",
    width: 100,
  },
  {
    field: "specialty",
    headerName: "Specialty",
    width: 150,
    renderCell: (params) => {
      return (
        <div className={`cellWithSpecialty ${params.row.specialty}`}>
          {params.row.specialty}
        </div>
      );
    },
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 100,
  },
  {
    field: "featured",
    headerName: "Featured",
    width: 80,
    valueGetter: (params) => {
      return params.row.featured ? "Yes" : "No";
    },
  },
];
