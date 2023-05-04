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
    field: "role",
    headerName: "Role",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithRole ${params.row.role}`}>
          {params.row.role}
        </div>
      );
    },
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

// Hotels
export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 220 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 150,
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
];

// Flights
export const flightColumns = [
  { field: "_id", headerName: "ID", width: 220 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "title",
    headerName: "Title",
    width: 150,
  },
  {
    field: "arline",
    headerName: "Airline",
    width: 150,
  },
  {
    field: "departureDestination",
    headerName: "Departure",
    width: 150,
  },
  {
    field: "arrivalDestination",
    headerName: "Arrival",
    width: 150,
  },
  {
    field: "cabinClass",
    headerName: "Cabin Class",
    width: 150,
  },
  {
    field: "duration",
    headerName: "Duration",
    width: 150,
  },
  {
    field: "price",
    headerName: "Price",
    width: 150,
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

// Packages
export const packageColumns = [
  { field: "_id", headerName: "ID", width: 220 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "description",
    headerName: "Description",
    width: 150,
  },
  {
    field: "destination",
    headerName: "Destination",
    width: 150,
  },
  {
    field: "duration",
    headerName: "Duration",
    width: 150,
  },
  {
    field: "travelers",
    headerName: "Travelers",
    width: 150,
  },
  {
    field: "specialty",
    headerName: "Specialty",
    width: 150,
  },
  {
    field: "facilities",
    headerName: "Facilities",
    width: 150,
    valueGetter: (params) =>
      params.row.facilities
        ? params.row.facilities.map((facility) => facility.number).join(", ")
        : "",
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 150,
  },
  {
    field: "price",
    headerName: "Price",
    width: 150,
  },
];
