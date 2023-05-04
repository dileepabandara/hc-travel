import "./flight.css";

const Flight = () => {
  return (
    <div className="login">
      <h1>Flight</h1>
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="lInput"
        />
        <button className="lButton">Login</button>
      </div>
    </div>
  );
};

export default Flight;
