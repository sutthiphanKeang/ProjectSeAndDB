import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import FirstHome from './components/FirstHome';
import MainLayOut from './components/MainLayOut';
import Manage from './components/admin/Manage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayOut/>}>
        <Route path='FirstHome' element={<FirstHome/>}></Route>
        <Route path='Manage' element={<Manage/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
