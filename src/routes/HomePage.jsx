import {
  LargeButtonActive,
  KakaoLogin,
  TextBtnMedium,
} from "../components/button/styled.jsx";
import logo from "../asset/images/logo.png";

import { TitleHeavy, TitleNormal } from "../components/text/styled.jsx";

//작업을 위한 임시로그인//
import axios from "axios";
import { getCookie } from "../utils/cookie";
import { useEffect } from "react";

const HomePage = () => {
  return (
    <div className="mt-[237px] mb-[69px]">
      <div className="flex justify-center items-center flex-col mb-[165px]">
        <img src={logo} className="mb-3.5"></img>
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
