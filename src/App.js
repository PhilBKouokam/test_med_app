// src/App.js
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import Login from "./Components/Login/Login";
import InstantConsultation from './Components/InstantConsultation/InstantConsultation';
import Notification from "./Components/Notification/Notification"; // ✅ Import Notification
import ReviewForm from "./Components/ReviewForm/ReviewForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Notification>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing_Page />} />
            <Route path="/signup" element={<Sign_Up />} />
            <Route path="/login" element={<Login />} />
            <Route path="/instant-consultation" element={<InstantConsultation />} />
            <Route path="/reviews" element={<ReviewForm />} />
          </Routes>
        </Notification>
      </BrowserRouter>
    </div>
  );
}

export default App;