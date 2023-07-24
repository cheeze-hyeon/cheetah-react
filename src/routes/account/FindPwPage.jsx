import { useState } from "react";
import { TextNormal } from "../../components/text/styled";
import { HeaderBack } from "../../components/header/styled";
import { Box } from "./styled";
import {
  AlertLabel,
  InputTextFieldActive,
  InputTextFieldButton,
  InputTextFieldNonActive,
} from "../../components/input/styled";
import {
  LargeButtonActive,
  LargeButtonActive2,
} from "../../components/button/styled";

const FindPwPage = () => {
  const [authPhone, setAuthPhone] = useState(false);
  const [auth, setAuth] = useState(false);

  const clickAuthPhone = () => {
    // 인증 API 연결 -> if문과 연결 -> 인증번호가 맞는지
    if (1) {
      setAuthPhone(!authPhone);
    }
  };

  // 인증번호 입력창 활성화
  const clickAuth = () => {
    console.log("눌렀다");
    return setAuth(!auth);
  };

  const [isCorrected, setIsCorrected] = useState(false);

  return (
    <div>
      <HeaderBack text="비밀번호 찾기"></HeaderBack>
      {authPhone ? (
        <div className="m-auto">
          <form className="flex flex-col m-auto">
            <div className="flex flex-col m-auto gap-y-[10px] mb-[20px]">
              <TextNormal>새로운 비밀번호</TextNormal>
              <InputTextFieldActive
                placeholder="8자 이상의 영문, 숫자 입력"
                type="password"
              ></InputTextFieldActive>
            </div>
            <div className="flex flex-col m-auto gap-y-[10px] mb-[20px]">
              <TextNormal>새로운 비밀번호 재확인</TextNormal>
              <InputTextFieldActive
                placeholder="비밀번호 다시 입력"
                type="password"
              ></InputTextFieldActive>
              {isCorrected ? (
                <div></div>
              ) : (
                <AlertLabel>비밀번호를 다시 입력해주세요</AlertLabel>
              )}
            </div>
          </form>
          <div className="mt-[435px]">
            <LargeButtonActive text="완료" to="/signin"></LargeButtonActive>
          </div>
        </div>
      ) : (
        <div className="flex flex-col m-auto">
          <form className="m-auto">
            <div className="flex flex-col m-auto gap-y-[10px] mb-[20px]">
              <TextNormal>아이디</TextNormal>
              <InputTextFieldActive
                placeholder="아이디를 입력하세요"
                type="text"
              ></InputTextFieldActive>
            </div>
            <div className="flex flex-col m-auto gap-y-[10px] mb-[20px]">
              <TextNormal>전화번호</TextNormal>
              <InputTextFieldButton
                placeholder="숫자만 입력"
                text="인증하기"
                type="text"
                onClick={clickAuth}
              ></InputTextFieldButton>
              {/* 인증하기 누르면 활성화로 바꾸기 */}
              {!auth ? (
                <InputTextFieldNonActive text="인증번호 입력"></InputTextFieldNonActive>
              ) : (
                <InputTextFieldActive
                  placeholder="인증번호 입력"
                  type="text"
                ></InputTextFieldActive>
              )}
              <AlertLabel className="w-[350px]">
                회원정보에 등록한 전화번호와 입력한 전화번호가 같아야,
                인증번호를 받을 수 있습니다.
              </AlertLabel>
            </div>
          </form>
          <div onClick={clickAuthPhone} className="mt-[351px]">
            <LargeButtonActive2
              text="다음으로"
              className="mb-[37px]"
            ></LargeButtonActive2>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindPwPage;
