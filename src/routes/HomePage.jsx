import {
  LargeButtonActive,
  KakaoLogin,
  TextBtnMedium,
} from "../components/button/styled.jsx";
import logo from "../asset/images/logo.png";

import { TitleHeavy, TitleNormal } from "../components/text/styled.jsx";
import React, { useEffect } from "react";
import { refreshToken } from "../apis/api";

//작업을 위한 임시로그인//
import axios from "axios";
import { getCookie } from "../utils/cookie";
import { GoalDeleteModal, ReturnAlertModal, TagDeleteAlertModal } from "./goal/styled.jsx";

const HomePage = () => {
  useEffect(() => {
    // Define an async function to call refreshToken and handle the response
    const handleRefreshToken = async () => {
      try {

        const token = getCookie("refresh_token");
        if(token !== undefined){
          const response = await refreshToken(token);
          if (response.status === 200) {
            console.log("REFRESH TOKEN SUCCESS");
            // Access token is successfully refreshed, redirect to /today/
            window.location.href = "/today/";
          } else {
            console.log("[ERROR] error while refreshing token");
          }
        }

      } catch (error) {
        console.error("Token refresh failed:", error);
      }
    };

    // Call the handleRefreshToken function
    handleRefreshToken();
  }, []);
  

  return (
    <div className="mt-[237px] mb-[69px]">
      <div className="flex justify-center items-center flex-col mb-[165px]">
        <img src={logo} className="mb-3.5" alte="face"></img>
        <div className="mb-5">
          <TitleHeavy>CHEETHA</TitleHeavy>
        </div>
        <div>
          <TitleNormal>일정관리 자동화 서비스</TitleNormal>
        </div>
      </div>
      <div>
        <LargeButtonActive text="로그인" to="/signin"></LargeButtonActive>
        {/* 카카오 로그인 구현되면 링크 연결 */}
        <KakaoLogin /*to="/kakao"*/></KakaoLogin>
      </div>
      <div className="mt-[40px]">
        <TextBtnMedium text="회원가입하기" to="/signup"></TextBtnMedium>
      </div>
    </div>
  );
};

export default HomePage;
