import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './routes/HomePage';
import SignInPage from './routes/SignInPage';
import SignUpPage from './routes/SignUpPage';
import { Routes, Route } from "react-router-dom";
import TodayMainPage from "./routes/today/TodayMainPage";
import CalendarMainPage from "./routes/calendar/CalendarMainPage";
import GoalMainPage from "./routes/goal/GoalMainPage";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        {/* home */}
        <Route path="/" element={<HomePage/>} />
        <Route path="/signin" element={<SignInPage/>} /> 
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/today/" element={<TodayMainPage />} />
        <Route path="/calendar/" element={<CalendarMainPage />} />
        <Route path="/goal/" element={<GoalMainPage />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;