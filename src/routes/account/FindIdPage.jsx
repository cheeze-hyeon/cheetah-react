import { useState, useEffect } from "react";
import { TextHeavy, TextNormal } from "../../components/text/styled";
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
import { sendSMSAuth, SMSAuthCheck, findId } from "../../apis/api";

const FindIdPage = () => {
  const [SMSAuthData, setSMSAuthData] = useState({
    phone_num: "",
    auth_number: "",
  });

  const [isSentSMS, setIsSentSMS] = useState("");
  const [isValidPhoneNum, setIsValidPhoneNum] = useState("");
  const [certification, setCertification] = useState(0);
  const [countdown, setCountdown] = useState(300);
  const [page, setPage] = useState(0);
  const [isVaildAuthNumber, setIsValidAuthNumber] = useState("");
  const [username, setUsername] = useState("");
  const [isVaildAccount, setIsValidAccount] = useState(false);

  const handleChangePhoneNum = (e) => {
    //전화번호 입력 관리 및 숫자만 입력 가능하도록 지정
    const { name, value } = e.target;
    const filteredValue = value.replace(/[^0-9]/g, "");
    setSMSAuthData((prevCertificationData) => ({
      ...prevCertificationData,
      [name]: filteredValue,
    }));
  };

  const handleChangeAuthNum = (e) => {
    //인증번호 입력 관리
    const { name, value } = e.target;
    const filteredValue = value.replace(/[^0-9]/g, "");

    setSMSAuthData((prevSMSAuthData) => ({
      ...prevSMSAuthData,
      [name]: filteredValue,
    }));
  };

  const clickCertification = async (e) => {
    //인증번호 발송. 전화번호가 11자가 아니면 발송 안함.
    e.preventDefault();
    if (SMSAuthData.phone_num.length != 11) {
      setIsValidPhoneNum(false);
      setCertification(false);
      return;
    } else setIsValidPhoneNum(true);
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
    // 0페이지에서 1페이지로 넘어감. 이 때 전화번호와 인증번호가 일치해야함. 전화번호와 인증번호가 일치하는데 일치하는 계정이 없을 경우도 고려.
    e.preventDefault();

    try {
      if(isSentSMS === "" || isSentSMS === false){
        return
      }
      if(SMSAuthData.auth_number === ""){
        setIsValidAccount(false);
        setIsValidAuthNumber(false);
        return
      }
      const isAuthenticated = await SMSAuthCheck(SMSAuthData);
      if (isAuthenticated.status === 200) {
        setPage(1);
        const response = await findId({ phone_num: SMSAuthData.phone_num });
        if (response.status === 200) {
          setUsername(response.data.username);
          setIsValidAccount(true);
        } else {
          setIsValidAccount(false);
        }
      }
    } catch (error) {
      if (isSentSMS === "") setIsSentSMS(false);
      console.log("Form submission failed:", error);

      setIsValidAuthNumber(false);
    }
  };

  useEffect(() => {
    //남은 시간 계산
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
              {isVaildAccount === true ? (
                <>
                  <TextNormal>회원님의 아이디는 </TextNormal>
                  <TextNormal className="text-[#f19a37]">
                    {username}{" "}
                  </TextNormal>
                  <TextNormal>입니다</TextNormal>
                </>
              ) : (
                <TextHeavy>일치하는 계정이 없습니다. </TextHeavy>
              )}
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
                id="phone_num"
                name="phone_num"
                value={SMSAuthData.phone_num}
                onChange={handleChangePhoneNum}
              ></InputTextFieldButton>
              {!certification && isValidPhoneNum === false ? (
                <AlertLabel className="w-[350px]">
                  유효한 전화번호가 아닙니다.
                </AlertLabel>
              ) : (
                <AlertLabel className="w-[350px]"></AlertLabel>
              )}
              {/* 인증하기 누르면 활성화로 바꾸기 */}
              {!certification ? (
                <InputTextFieldNonActive text="인증번호 입력"></InputTextFieldNonActive>
              ) : (
                <>
                  <InputTextFieldActive
                    placeholder="인증번호 입력"
                    type="text"
                    name="auth_number"
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
              {isSentSMS === false ? (
                <AlertLabel className="w-[350px]">
                  전화번호를 확인해주세요.
                </AlertLabel>
              ) : isVaildAuthNumber === false ? (
                <AlertLabel className="w-[350px]">
                  인증번호가 틀렸습니다.
                </AlertLabel>
              ) : (
                <AlertLabel></AlertLabel>
              )}
            </div>
          </form>
          <div className="mt-[448px]">
            <LargeButtonActive2
              text="다음으로"
              className="mb-[37px]"
              onClick={clickNext}
            ></LargeButtonActive2>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindIdPage;
