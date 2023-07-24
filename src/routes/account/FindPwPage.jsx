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
import { sendSMSAuth, SMSAuthCheck, findPassword, changePassword } from "../../apis/api";

const FindPwPage = () => {
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
  const [isVaildAccount, setIsValidAccount] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAvailablePassword, setIsAvailablePassword] = useState("");
  const handleChangeUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
  };
  const handleChangePhoneNum = (e) => {
    const { name, value } = e.target;
    const filteredValue = value.replace(/[^0-9]/g, "");
    setSMSAuthData((prevSMSAuthData) => ({
      ...prevSMSAuthData,
      [name]: filteredValue,
    }));
  };
  const handleChangeAuthNum = (e) => {
    const { id, value } = e.target;
    setSMSAuthData((prevSMSAuthData) => ({
      ...prevSMSAuthData,
      [id]: value,
    }));
  };

  const handleChangePassword = (e) => {
    // 비밀번호 입력 받는 함수 + 비밀번호 일치 및 형식 일치 확인
    const value = e.target.value;
    setPassword(value);
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/;
    if (value === confirmPassword && regExp.test(value)) {
      setIsAvailablePassword(true);
    } else {
      setIsAvailablePassword(false);
    }
  };

  const handleChangeConfirmPassword = (e) => {
    //재확인용 비밀번호 입력 받는 함수 + 비밀번호 일치 및 형식 일치 확인
    const value = e.target.value;
    setConfirmPassword(value);
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/;

    if (value === password && regExp.test(value)) {
      setIsAvailablePassword(true);
    } else {
      setIsAvailablePassword(false);
    }
  };

  const clickCertification = async (e) => {
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
    e.preventDefault();

    try {
      const isAuthenticated = await SMSAuthCheck(SMSAuthData);
      if (isAuthenticated.status === 200) {
        setIsValidAuthNumber(true)
        const response = await findPassword({
          phone_num: SMSAuthData.phone_num,
          username: username,
        });
        if (response.status === 200) {
          setPage(1);
          setIsValidAccount(true);
        } else {
          setIsValidAccount(false);
        }
      }
    } catch (error) {
      if (isSentSMS === "") setIsSentSMS(false);
      console.log("Form submission failed:", error);
      if (error.response.status === 401){
        setIsValidAuthNumber(false);
      }else if(error.response.status === 404){
        setIsValidAccount(false);
      }
      
    }
  };
  
  const clickChangePassword = async(e) => {
    e.preventDefault();
    if(isAvailablePassword){
      const response = await changePassword({
        username: username,
        new_password: password,
      });
      if(response.status === 200){
        window.location.href = "signin";
      }
    }
    
  }

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
      <HeaderBack text="비밀번호 찾기"></HeaderBack>
      {page === 1 ? (
        <div className="m-auto">
          <form className="flex flex-col m-auto">
            <div className="flex flex-col m-auto gap-y-[10px] mb-[20px]">
              <TextNormal>새로운 비밀번호</TextNormal>
              <InputTextFieldActive
                placeholder="8자 이상의 영문, 숫자 입력"
                type="password"
                value={password}
                onChange={handleChangePassword}
              ></InputTextFieldActive>
            </div>
            <div className="flex flex-col m-auto gap-y-[10px] mb-[20px]">
              <TextNormal>새로운 비밀번호 재확인</TextNormal>
              <InputTextFieldActive
                placeholder="비밀번호 다시 입력"
                type="password"
                value={confirmPassword}
                onChange={handleChangeConfirmPassword}
              ></InputTextFieldActive>
              {isAvailablePassword ? (
                <div></div>
              ) : (
                <AlertLabel>비밀번호를 다시 입력해주세요</AlertLabel>
              )}
            </div>
          </form>
          <div className="mt-[435px]">
            <LargeButtonActive text="완료" onClick = {clickChangePassword}></LargeButtonActive>
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
                value={username}
                onChange={handleChangeUsername}
              ></InputTextFieldActive>
            </div>
            <div className="flex flex-col m-auto gap-y-[10px] mb-[20px]">
              <TextNormal>전화번호</TextNormal>
              <InputTextFieldButton
                placeholder="숫자만 입력"
                text="인증하기"
                type="text"
                name="phone_num"
                onClick={clickCertification}
                value={SMSAuthData.phone_num}
                onChange={handleChangePhoneNum}
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
                    value={SMSAuthData.auth_number}
                    onChange={handleChangeAuthNum}
                  ></InputTextFieldActive>
                  <TextNormal>{`남은 시간: ${Math.floor(countdown / 60)}:${(
                    countdown % 60
                  )
                    .toString()
                    .padStart(2, "0")}`}</TextNormal>
                </>
              )}
              {
                isSentSMS === false?(
                  <AlertLabel className="w-[350px]">
                전화번호를 확인해주세요.
                </AlertLabel>
                ):
                isVaildAuthNumber === false ? (
                <AlertLabel className="w-[350px]">
                  인증번호가 틀렸습니다.
                </AlertLabel>
                ): isVaildAccount === false?(
                <AlertLabel>입력하신 정보와 일치하는 계정이 존재하지 않습니다.</AlertLabel>
                ):(<AlertLabel></AlertLabel>)
              }
            </div>
          </form>
          <div onClick={clickNext} className="mt-[351px]">
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
