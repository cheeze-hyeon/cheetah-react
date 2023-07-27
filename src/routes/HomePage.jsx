import {
  LargeButtonActive,
  KakaoLogin,
  TextBtnMedium,
} from "../components/button/styled.jsx";
import logo from "../asset/images/logo.png";

import {
  TextHeavy,
  TitleHeavy,
  TitleNormal,
} from "../components/text/styled.jsx";

//작업을 위한 임시로그인//
import axios from "axios";
import { getCookie } from "../utils/cookie";
import { useEffect } from "react";
import {
  GoalDeleteModal,
  ReturnAlertModal,
  TagDeleteAlertModal,
} from "./goal/styled.jsx";

const HomePage = () => {
  return (
    <div className="mt-[237px] mb-[69px]">
      <div className="flex justify-center items-center flex-col mb-[165px]">
        <img src={logo} className="mb-3.5 w-[170px]" alte="face"></img>
        <div className="mb-5">
          <TitleHeavy>CHEETAH</TitleHeavy>
        </div>
        <div>
          <TextHeavy color="var(--brown)">일정관리 자동화 서비스</TextHeavy>
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
