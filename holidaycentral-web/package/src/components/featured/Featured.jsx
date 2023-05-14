import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8090/api/packages/countbypackage?packages=Honeymoon,Beach holiday,Family Holiday"
  );

  console.log(data);
  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://images.pexels.com/photos/2549089/pexels-photo-2549089.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h2>Honeymoon</h2>
              <h2>{data[0]} packages</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://images.pexels.com/photos/5913193/pexels-photo-5913193.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h2>Beach Holiday</h2>
              <h2>{data[1]} packages</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://images.pexels.com/photos/5727775/pexels-photo-5727775.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h2>Family Holiday</h2>
              <h2>{data[2]} packages</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
