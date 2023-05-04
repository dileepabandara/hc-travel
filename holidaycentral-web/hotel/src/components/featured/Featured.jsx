import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8090/api/hotels/countbycity?cities=Kurunegala,Colombo,Galle"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://images.pexels.com/photos/2422588/pexels-photo-2422588.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Kurunegala</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://images.pexels.com/photos/14825208/pexels-photo-14825208.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Colombo</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://images.pexels.com/photos/14993091/pexels-photo-14993091.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Galle</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
