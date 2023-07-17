import React from "react";
import { Routes, Route } from "react-router-dom";
import TodayMainPage from "./routes/today/TodayMainPage";
import CalendarMainPage from "./routes/calendar/CalendarMainPage";
import GoalMainPage from "./routes/goal/GoalMainPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/today/" element={<TodayMainPage />} />
        <Route path="/calendar/" element={<CalendarMainPage />} />
        <Route path="/goal/" element={<GoalMainPage />} />
      </Routes>
    </>
  );
};

export default App;

{
  /* <div className="app-container"> */
}
