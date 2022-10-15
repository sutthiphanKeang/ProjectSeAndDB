import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import FirstHome from "./components/FirstHome";
import MainLayoutUser from "./components/MainLayout-user";
import MainLayoutAdmin from "./components/MainLayout-admin";
import Manage from "./components/admin/ManageMain";
// import ManageCar from "./components/admin/ManageCar";
// import AddCar from "./components/admin/AddCar";
import Login from "./components/Login-user";
import LoginAdmin from "./components/Login-admin";
import Register from "./components/Regis-user";
// import ReturnCar from './components/ReturnCar';

import Costsummary from './components/user/Costsummary';
import Payment from './components/user/Payment';
import Additional from './components/user/Additional';


import Insurance from './components/Insurance';
import UserPage from './components/UserPage';
import RentCar from './components/RentCar';


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayoutUser />}>
        <Route path="" element={<FirstHome />}/>
        {/* <Route path='ReturnCar' element={<ReturnCar/>}></Route> */}
        <Route path='Costsummary' element={<Costsummary/>}></Route>
        <Route path='Payment' element={<Payment/>}></Route>
        <Route path='Additional' element={<Additional/>}></Route>
        <Route path='Insurance' element={<Insurance/>}></Route> 
        <Route path='UserPage' element={<UserPage/>}></Route>
        <Route path='RentCar' element={<RentCar/>}></Route>
        <Route path="Login" element={<Login />}></Route>
        <Route path="Register" element={<Register />}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
      <Route path="/Admin" element={<MainLayoutAdmin />}>
        <Route path="" element={<LoginAdmin />}></Route>
        <Route path="Manage" element={<Manage />}></Route>
        {/* <Route path="ManageCar" element={<ManageCar />}></Route>
        <Route path="AddCar" element={<AddCar />}></Route> */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
