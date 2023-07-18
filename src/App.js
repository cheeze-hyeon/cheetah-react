import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './routes/HomePage';
import SignInPage from './routes/SignInPage';
import SignUpPage from './routes/SignUpPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        {/* home */}
        <Route path="/" element={<HomePage/>} />
        <Route path="/signin" element={<SignInPage/>} /> 
        <Route path="/signup" element={<SignUpPage/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;