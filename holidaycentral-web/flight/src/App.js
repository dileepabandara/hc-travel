import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Flight from "./pages/flight/Flight";
import Package from "./pages/package/Package";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/flights/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/flight" element={<Flight />} />
        <Route path="/package" element={<Package />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
