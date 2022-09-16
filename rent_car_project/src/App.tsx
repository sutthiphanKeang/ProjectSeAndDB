import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import FirstHome from './components/FirstHome';
import MainLayOut from './components/MainLayOut';


function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayOut/>}>
        <Route path='FirstHome' element={<FirstHome/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
