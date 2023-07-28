import React from "react";
import "./App.css";
import "./utils/fcm";
import { Routes, Route } from "react-router-dom";
import HomePage from "./routes/HomePage";
import SignInPage from "./routes/SignInPage";
import SignUpPage from "./routes/SignUpPage";
import FindIdPage from "./routes/account/FindIdPage";
import FindPwPage from "./routes/account/FindPwPage";
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
    <div className="app-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/findid" element={<FindIdPage />} />
        <Route path="/findpw" element={<FindPwPage />} />
        <Route path="/today" element={<TodayPage />} />
        <Route path="/today/mypage" element={<MyPage />} />
        <Route path="/today/mypage/edit" element={<InfoEditPage />} />
        <Route path="/today/info" element={<InfoDetailPage />} />
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

// const firebaseMessaging = firebaseApp.messaging();
// firebaseMessaging
//   .requestPermission()
//   .then(() => {
//     return firebaseMessaging.getToken(); // 등록 토큰 받기
//   })
//   .then(function (token) {
//     console.log(token); //토큰 출력
//   })
//   .catch(function (error) {
//     console.log("FCM Error : ", error);
//   });
//   firebaseMessaging.onMessage((payload) => {
//     console.log(payload.notification.title);
//     console.log(payload.notification.body);
//   });
