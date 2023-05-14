import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/featuredProperties";

import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
//import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
      <h1 className="homeTitle">Our Package Types</h1>
        <Featured />
        <h1 className="homeTitle"></h1>
        <h1 className="homeTitle">Best Rated Packages in Holiday Central</h1> 
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
