import { useState, useEffect } from "react";
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
import { sendSMSAuth, SMSAuthCheck } from "../../apis/api";

const FindIdPage = () => {
  const [SMSAuthData, setSMSAuthData] = useState({
    phone_num: "",
    auth_number: "",
  });

  const [isSentSMS, setIsSentSMS] = useState(false);
  const [certification, setCertification] = useState(0);
  const [countdown, setCountdown] = useState(300);
  const [authPhone, setAuthPhone] = useState(false);
  const [page, setPage] = useState(0);


  const handleChangeAuthNum = (e) => {
    const { id, value } = e.target;
    setSMSAuthData((prevCertificationData) => ({
      ...prevCertificationData,
      [id]: value,
    }));
  };

  const clickCertification = async (e) => {
    e.preventDefault();
    const isSentMessage = await sendSMSAuth({
      phone_num: SMSAuthData.phone_num,
    });
    if (isSentMessage.status === 200) {
      console.log("인증번호를 입력해주세요");
      setIsSentSMS(true);
      setCountdown(300);
      setCertification(true);
    } else {
      console.log("전화번호를 확인해주세요");
      setIsSentSMS(false);
      setCertification(false);
    }
    console.log("certification!");
  };

  const clickNext = async (e) => {
    e.preventDefault();
    const isAuthenticated = await SMSAuthCheck(SMSAuthData);
    if (isAuthenticated.status === 200) {
      setPage(!page);
    }
  };


  useEffect(() => {
    let intervalId;
    console.log(isSentSMS);
    if (isSentSMS && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isSentSMS, countdown]);

  return (
    <div>
      <HeaderBack text="아이디 찾기"></HeaderBack>
      {page ? (
        <div>
          <div className="w-[350px] m-auto">
            <Box className="flex flex-row">
              <TextNormal>회원님의 아이디는 </TextNormal>
              <TextNormal className="text-[#f19a37]">cheetah </TextNormal>
              <TextNormal>입니다</TextNormal>
            </Box>
          </div>
          <div className="mt-[582px]">
            <LargeButtonActive text="완료" to="/signin"></LargeButtonActive>
          </div>
        </div>
      ) : (
        <div className="flex flex-col m-auto">
          <form className="m-auto">
            <div className="flex flex-col m-auto gap-y-[10px] mb-[20px]">
              <TextNormal>전화번호</TextNormal>
              <InputTextFieldButton
                placeholder="숫자만 입력"
                text="인증하기"
                type="text"
                onClick={clickCertification}
                id="phone_number"
                value={SMSAuthData.phone_num}
              ></InputTextFieldButton>
              {/* 인증하기 누르면 활성화로 바꾸기 */}
              {!certification ? (
                <InputTextFieldNonActive text="인증번호 입력"></InputTextFieldNonActive>
              ) : (
                <>
                  <InputTextFieldActive
                    placeholder="인증번호 입력"
                    type="text"
                    id="auth_number"
                    onChange={handleChangeAuthNum}
                    value={SMSAuthData.auth_number}
                  ></InputTextFieldActive>
                  <TextNormal>{`남은 시간: ${Math.floor(countdown / 60)}:${(
                    countdown % 60
                  )
                    .toString()
                    .padStart(2, "0")}`}</TextNormal>
                </>
              )}
              <AlertLabel className="w-[350px]">
                회원정보에 등록한 전화번호와 입력한 전화번호가 같아야,
                인증번호를 받을 수 있습니다.
              </AlertLabel>
            </div>
          </form>
          <div onClick={clickNext} className="mt-[448px]">
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

export default FindIdPage;
