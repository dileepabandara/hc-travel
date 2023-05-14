import useFetch from "../../hooks/useFetch";
import "./propertyList.css";

const PropertyList = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8090/api/packages/countbytype"
  );

  const images = [
    "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2023/04/09115037/Emirates-first-class.jpg",
    "https://www.nerdwallet.com/assets/blog/wp-content/uploads/2021/12/GettyImages-1335029467.jpg",
    "https://media.cnn.com/api/v1/images/stellar/prod/underscored-flying-in-economy-more-comfortably-lead.jpg?q=h_1800,w_3200,x_0,y_0",
    "https://www.elal.com/media/a2ahaz3i/business-experience-1920x1190.jpg",
    "https://i0.wp.com/theluxurytravelexpert.com/wp-content/uploads/2021/03/best-airlines-for-flying-first-class.jpg?fit=1300%2C731&ssl=1",
  ];
  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            images.map((img, i) => (
              <div className="pListItem" key={i}>
                <img src={img} alt="" className="pListImg" />
                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>
                    {data[i]?.count} {data[i]?.type}
                  </h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
