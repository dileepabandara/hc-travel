import Featured from "../../components/featured/Featured";
import FeaturedPackages from "../../components/featuredPackages/FeaturedPackages";
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
      <h1 className="homeTitle">Or Browse By Package Types</h1>
        <Featured />
        <h1 className="homeTitle">Best Rated Packages in Holiday Central</h1>
        <FeaturedPackages />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
