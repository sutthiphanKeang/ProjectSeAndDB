import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import FirstHome from './components/FirstHome';
import MainLayOut from './components/MainLayOut';
import Manage from './components/admin/Manage';
import Booking from './components/Booking';
import ReturnCar from './components/ReturnCar';
import Costsummary from './components/user/Costsummary';
import Payment from './components/user/Payment';
import Additional from './components/user/Additional';



function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayOut/>}>
        <Route path='FirstHome' element={<FirstHome/>}></Route>
        <Route path='Manage' element={<Manage/>}></Route>
        <Route path='Booking' element={<Booking/>}></Route>
        <Route path='ReturnCar' element={<ReturnCar/>}></Route>
        <Route path='Costsummary' element={<Costsummary/>}></Route>
        <Route path='Payment' element={<Payment/>}></Route>
        <Route path='Additional' element={<Additional/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
