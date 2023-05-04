import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
// import Featured from "../../components/featured/Featured";
// import Chart from "../../components/chart/Chart";
// import Table from "../../components/table/Table";

const Home = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user && user.role === "Admin";
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
        {/* <div className="widgets">
          <Widget type="earning" />
          <Widget type="balance" />
        </div> */}
        {/* <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
