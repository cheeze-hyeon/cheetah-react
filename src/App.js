import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./routes/HomePage";
import SignInPage from "./routes/SignInPage";
import SignUpPage from "./routes/SignUpPage";
import TodayPage from "./routes/today/TodayPage";
import MyPage from "./routes/today/MyPage";
import InfoDetailPage from "./routes/today/InfoDetailPage";
import InfoEditPage from "./routes/today/InfoEditPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* home */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/today" element={<TodayPage />} />
          <Route path="/today/mypage" element={<MyPage />} />
          <Route path="/today/mypage/edit" element={<InfoEditPage />} />
          <Route path="/today/mypage/info" element={<InfoDetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
