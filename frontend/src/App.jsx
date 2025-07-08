import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/Login.jsx';
import Register from './component/Register';
import Home from './component/Home.jsx';


const App = () => {

  return (
      <Router>
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login"  element={<Login />}/>
          <Route path="/" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
  );
};

export default App;
