import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Car from './pages/Car';
import Navbar from './components/NavBar ';
import Phoenix from './components/Phoenix';
import CCTV from './components/CCTV';
import Dragon from './components/Dragon';


const App = () => {
  return (
    <Router>
      <div style={{ paddingTop: '60px' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Car />} />
          <Route path="/phoenix" element={<Phoenix />} />
          {/* <Route path="/tiger" element={<Tiger />} /> */}
          <Route path="/cctv" element={<CCTV />} />
          <Route path="/dragon" element={<Dragon />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;