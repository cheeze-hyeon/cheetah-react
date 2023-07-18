import { HeaderBack, HeaderBackArrow } from "../components/header/styled";
import { TextLight, TextNormal } from "../components/text/styled";
import {
  LargeButtonActive2,
  LargeButtonActive,
} from "../components/button/styled";
import {
  InputTextFieldActive,
  InputTextFieldNonActive,
  InputTextFieldButton,
  AlertLabel,
} from "../components/input/styled";
import { useState } from "react";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phone_number: "",
    c_num: "",
    nickname: "",
    max_speed: "",
  });

  const [page, setPage] = useState(1);

  const clickNext = () => {
    setPage(2);
    console.log(page);
  };

  const [certification, setCertification] = useState(0);

  const clickCertification = () => {
    setCertification(!certification);
    console.log("certification!");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // 참고 : api 연결은 아래처럼!!
    // createPost(formData, navigate);
  };

  return (
    <div className="flex flex-col m-auto">
      <HeaderBack text="회원가입"></HeaderBack>
      {page === 1 ? (
        // Page 1
        <div className="w-[350px] m-auto flex flex-col gap-[181px]">
          <form className="flex flex-col gap-y-[20px]">
            <div className="flex flex-col gap-y-[10px]">
              <TextNormal>아이디</TextNormal>
              <InputTextFieldButton
                placeholder="아이디 입력"
                text="중복확인"
                type="text"
              ></InputTextFieldButton>
            </div>
            <div className="flex flex-col gap-y-[10px]">
              <TextNormal>비밀번호</TextNormal>
              <InputTextFieldActive
                placeholder="8자 이상의 영문, 숫자 입력"
                type="password"
              ></InputTextFieldActive>
            </div>
            <div className="flex flex-col gap-y-[10px]">
              <TextNormal>비밀번호 재확인</TextNormal>
              <InputTextFieldActive
                placeholder="비밀번호 다시 입력"
                type="password"
              ></InputTextFieldActive>
              {/* 비밀번호가 일치하지 않을 때 */}
              <AlertLabel>비밀번호를 다시 입력해주세요</AlertLabel>
            </div>
            <div className="flex flex-col gap-y-[10px] mb-[20px]">
              <TextNormal>전화번호</TextNormal>
              <InputTextFieldButton
                placeholder="숫자만 입력"
                text="인증하기"
                type="text"
              ></InputTextFieldButton>
              {/* 인증하기 누르면 활성화로 바꾸기 */}
              {certification ? (
                <InputTextFieldNonActive text="인증번호 입력"></InputTextFieldNonActive>
              ) : (
                <InputTextFieldActive
                  placeholder="인증번호 입력"
                  type="text"
                  onClick={clickCertification}
                ></InputTextFieldActive>
              )}
            </div>
          </form>
          {/* useState로 관리해서 formData가 적절히 채워졌을 때 활성화 버튼으로 변경 */}
          <div onClick={clickNext}>
            <LargeButtonActive2
              text="다음으로"
              className="mb-[37px]"
            ></LargeButtonActive2>
          </div>
        </div>
      ) : (
        // Page 2
        <div className="w-[350px] m-auto flex flex-col gap-[435px]">
          <form className="flex flex-col gap-y-[20px]" onSubmit={onSubmit}>
            <div className="flex flex-col gap-y-[10px]">
              <TextNormal>닉네임</TextNormal>
              <InputTextFieldActive
                placeholder="2자 이상 입력"
                type="text"
              ></InputTextFieldActive>
            </div>
            <div className="flex flex-col gap-y-[10px]">
              <TextNormal>제한속도 (hour/day)</TextNormal>
              <InputTextFieldActive
                defaultvalue="6"
                type="number"
              ></InputTextFieldActive>
              <AlertLabel>
                *하루에 투자할 수 있는 최대 시간을 입력해주세요
              </AlertLabel>
            </div>
          </form>
          <LargeButtonActive
            text="완료"
            className="mb-[37px]"
            to="/today"
          ></LargeButtonActive>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
