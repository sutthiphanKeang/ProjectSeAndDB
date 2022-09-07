import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import FristHome from './components/FristHome';
import { MainLayOut } from './components/MainLayOut';


function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayOut/>}>
        <Route path='FristHome' element={<FristHome/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
