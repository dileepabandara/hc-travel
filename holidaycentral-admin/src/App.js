import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import NewUser from "./pages/newUser/NewUser";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import NewPackage from "./pages/newPackage/NewPackage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  flightInputs,
  hotelInputs,
  packageInputs,
  roomInputs,
  seatInputs,
  userInputs,
} from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import {
  flightColumns,
  hotelColumns,
  packageColumns,
  roomColumns,
  seatColumns,
  userColumns,
} from "./datatablesource";
import NewFlight from "./pages/newFlight/NewFlight";
import NewSeat from "./pages/newSeat/NewSeat";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewUser inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="hotels">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={hotelColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":hotelId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewHotel inputs={hotelInputs} title="Add New Hotel" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="rooms">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={roomColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":roomId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewRoom inputs={roomInputs} title="Add New Room" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="flights">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={flightColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":flightId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewFlight inputs={flightInputs} title="Add New Flight" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="seats">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={seatColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":seatId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewSeat inputs={seatInputs} title="Add New Seat" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="packages">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={packageColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":packageId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewPackage
                      inputs={packageInputs}
                      title="Add New Package"
                    />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
