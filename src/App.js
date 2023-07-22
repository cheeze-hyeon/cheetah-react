import React from "react";
import "./App.css";
import {  BrowserRouter, Routes, Route } from "react-router-dom";  
import HomePage from "./routes/HomePage";
import SignInPage from "./routes/SignInPage";
import SignUpPage from "./routes/SignUpPage";
import TodayPage from "./routes/today/TodayPage";
import MyPage from "./routes/today/MyPage";
import InfoDetailPage from "./routes/today/InfoDetailPage";
import InfoEditPage from "./routes/today/InfoEditPage";
import CalendarMainPage from "./routes/calendar/CalendarMainPage";
import GoalMainPage from "./routes/goal/GoalMainPage";
import CalendarDetailPage from "./routes/calendar-detail/CalendarDetailPage";
import TagDetail from "./routes/goal/Tag/TagDetailPage";
import ScheduleDetailPage from "./routes/goal/ScheduleDetail/ScheduleDetailPage";

const App = () => {
  return (
    <div className="App">
    <div className="app-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/today" element={<TodayPage />} />
        <Route path="/today/mypage" element={<MyPage />} />
        <Route path="/today/mypage/edit" element={<InfoEditPage />} />
        <Route path="/today/mypage/info" element={<InfoDetailPage />} />
        <Route path="/calendar/" element={<CalendarMainPage />} />
        <Route path="/goal/" element={<GoalMainPage />} />
        <Route path="/tag-detail" element={<TagDetail />} />
        <Route
          path="/calendar/:selectedDate"
          element={<CalendarDetailPage />}
        />
        <Route
          path="/scheduledetailpage/:goalId"
          element={<ScheduleDetailPage />}
        />
      </Routes>
    </div>
  );
};

export default App;
