import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import FirstHome from "./components/FirstHome";
import MainLayOut from "./components/MainLayOut";
import Manage from "./components/admin/ManageMain";
import Booking from "./components/Booking";
import ManageCar from "./components/admin/ManageCar";
import AddCar from "./components/admin/AddCar";
import Login from "./components/Login-user";
import LoginAdmin from "./components/Login-admin";
import Register from "./components/Regis-user";
import ReturnCar from './components/ReturnCar';
import RentCar from './components/RentCar';


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayOut />}>
        <Route path="/" element={<FirstHome />}></Route>
        <Route path="Manage" element={<Manage />}></Route>
        <Route path="Booking" element={<Booking />}></Route>
        <Route path='ReturnCar' element={<ReturnCar/>}></Route>
        <Route path='RentCar' element={<RentCar/>}></Route>
        <Route path="ManageCar" element={<ManageCar />}></Route>
        <Route path="AddCar" element={<AddCar />}></Route>
        <Route path="Login" element={<Login />}></Route>
        <Route path="LoginAdmin" element={<LoginAdmin />}></Route>
        <Route path="Register" element={<Register />}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
