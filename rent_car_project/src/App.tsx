import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import FirstHome from './components/FirstHome';
import MainLayOut from './components/MainLayOut';
import Manage from './components/admin/ManageMain';
import Booking from './components/Booking';
import ManageCar from './components/admin/ManageCar';
import AddCar from './components/admin/AddCar';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayOut/>}>
        <Route path='FirstHome' element={<FirstHome/>}></Route>
        <Route path='Manage' element={<Manage/>}></Route>
        <Route path='Booking' element={<Booking/>}></Route>
        <Route path='ManageCar' element={<ManageCar/>}></Route>
        <Route path='AddCar' element={<AddCar/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
