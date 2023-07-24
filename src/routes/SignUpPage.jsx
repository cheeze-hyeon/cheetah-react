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
import { useEffect, useState, } from "react";

import { signUp, idDuplicationCheck, sendSMSAuth, SMSAuthCheck } from "../apis/api";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phone_num: "",
    nickname: "",
    max_speed: 6,
  });
  const [SMSAuthData, setSMSAuthData] = useState({
    phone_num: "",
    auth_number: "",
  });
  const [duplicationCheckData, setDuplicationCheckData] = useState({
    username: "",
  }); // 아이디(중복 체크 전) -> 중복 체크시 중복 아니면 formData로 전달
  const [isAvailableUsername, setIsAvailableUsername] = useState(""); // 사용가능한 아이디인지 알려주는 boolean값
  const [confirmPassword, setConfirmPassword] = useState({
    confirmPassword: "",
  }); // 재확인용 비밀번호
  const [isVaildAuthNumber, setIsValidAuthNumber] = useState("");
  const [isAvailablePassword, setIsAvailablePassword] = useState(false); //사용 가능한 비밀번호인지 알려주는 boolean값
  const [isAvailableNickname, setIsAvailableNickname] = useState(false);
  const [countdown, setCountdown] = useState(300);
  const [isSentSMS, setIsSentSMS] = useState(false);
  const [page, setPage] = useState(1);



  useEffect(() => {
    console.log(formData);
    //console.log(isAvailableUsername)
    console.log(isAvailablePassword);
  }, [formData, isAvailableUsername, isAvailablePassword]); //로그 찍어보는 용도.

  const [certification, setCertification] = useState(0);

  const handleChangeID = (e) => {
    // 아이디 입력값이 영문 소문자 + 숫자만 들어오도록 하는 함수
    const value = e.target.value.replace(/[^A-Za-z0-9]/gi, "").toLowerCase();
    setDuplicationCheckData({
      ...duplicationCheckData,
      [e.target.name]: value,
    });
    console.log(value);
  };

  const handleChangePassword = (e) => {
    // 비밀번호 입력 받는 함수 + 비밀번호 일치 및 형식 일치 확인
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/;
    if (value === confirmPassword.confirmPassword && regExp.test(value)) {
      setIsAvailablePassword(true);
    } else {
      setIsAvailablePassword(false);
    }
  };

  const handleChangeConfirmPassword = (e) => {
    //재확인용 비밀번호 입력 받는 함수 + 비밀번호 일치 및 형식 일치 확인
    const { name, value } = e.target;
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/;

    setConfirmPassword((prevConfirmPassword) => ({
      ...prevConfirmPassword,
      [name]: value,
    }));

    if (value === formData.password && regExp.test(value)) {
      setIsAvailablePassword(true);
    } else {
      setIsAvailablePassword(false);
    }
  };

  const handleChangePhoneNum = (e) => {
    const { name, value } = e.target;
    const filteredValue = value.replace(/[^0-9]/g, "");
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: filteredValue,
    }));
    setSMSAuthData((prevCertificationData) => ({
      ...prevCertificationData,
      [name]: filteredValue,
    }))
  };
  const handleChangeAuthNum = (e) => {
    const{name, value} = e.target;
    setSMSAuthData((prevCertificationData) => ({
      ...prevCertificationData,
      [name]: value,
    }))
  }

  const handleChangeNickname = (e) => {
    const{name, value} = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if(value.length >= 2){
      setIsAvailableNickname(true)
    }
  }

  const handleChangeMaxSpeed = (e) => {
    const{name, value} = e.target;
    if(value >= 0 && value <= 24){
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }))
      console.log(value)
    }
  }
  const ClickDuplicationCheck = async (e) => {
    e.preventDefault();
    const isDuplicated = await idDuplicationCheck(duplicationCheckData);
    if (!isDuplicated) {
      console.log("해당 아이디를 사용할 수 있습니다. ");
      setFormData((prevFormData) => ({
        ...prevFormData,
        username: duplicationCheckData.username,
      }));
      setIsAvailableUsername(true);
    } else {
      console.log("중복된 아이디입니다. ");
      setIsAvailableUsername(false);
    }
  }; //중복확인 버튼 눌렀을 때 중복 체크하여 중복 아닌 경우 formData에 해당 id 넣어줌

  const clickCertification = async (e) => {
    e.preventDefault();
    const isSentMessage = await sendSMSAuth({ phone_num: formData.phone_num });
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
    
    try{
      const isAuthenticated = await SMSAuthCheck(SMSAuthData);
      if(isAuthenticated.status === 200) {
        if(isAvailableUsername && isAvailablePassword){
          setPage(2);
          console.log(page);
        }
      }
    }catch (error){
      console.log("Form submission failed:", error);
      if(SMSAuthData.auth_number !== 0 && SMSAuthData.auth_number !== ""){
        setIsValidAuthNumber(false)
        console.log(SMSAuthData)
      }
        
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

  const onSubmit = async (e) => {
    e.preventDefault();
    try{
      await signUp(formData);
    }catch (error){
    }

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
                name="username"
                placeholder="아이디 입력"
                text="중복확인"
                type="text"
                onChange={handleChangeID}
                onClick={ClickDuplicationCheck}
                value={duplicationCheckData.username}
                maxLength={10}
              ></InputTextFieldButton>
              {isAvailableUsername === true ? (
                <AlertLabel>가능한 아이디입니다.</AlertLabel>
              ) : isAvailableUsername === false ? (
                <AlertLabel>중복된 아이디입니다.</AlertLabel>
              ) : (
                <AlertLabel>아이디를 입력해주세요.</AlertLabel>
              )}
            </div>
            <div className="flex flex-col gap-y-[10px]">
              <TextNormal>비밀번호</TextNormal>
              <InputTextFieldActive
                placeholder="8자 이상의 영문, 숫자 입력"
                type="password"
                name="password"
                onChange={handleChangePassword}
                value={formData.password}
              ></InputTextFieldActive>
            </div>
            <div className="flex flex-col gap-y-[10px]">
              <TextNormal>비밀번호 재확인</TextNormal>
              <InputTextFieldActive
                placeholder="비밀번호 다시 입력"
                type="password"
                name="confirmPassword"
                onChange={handleChangeConfirmPassword}
                value={confirmPassword.confirmPassword}
              ></InputTextFieldActive>
              {isAvailablePassword === true ? (
                <AlertLabel>비밀번호가 일치합니다.</AlertLabel>
              ) : isAvailablePassword === false ? (
                <AlertLabel>
                  비밀번호의 형식 또는 일치 여부를 확인해보세요.
                </AlertLabel>
              ) : (
                <AlertLabel></AlertLabel>
              )}
            </div>
            <div className="flex flex-col gap-y-[10px] mb-[20px]">
              <TextNormal>전화번호</TextNormal>
              <InputTextFieldButton
                placeholder="숫자만 입력"
                text="인증하기"
                type="text"
                name="phone_num"
                onChange={handleChangePhoneNum}
                onClick={clickCertification}
                value={formData.phone_num}
              ></InputTextFieldButton>
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
                  <TextNormal>{`남은 시간: ${Math.floor(countdown / 60)}:${(countdown % 60)
                    .toString()
                    .padStart(2, "0")}`}</TextNormal>
                </>
              )}
              {
                isVaildAuthNumber === false ? (
                  <AlertLabel>인증에 실패하였습니다.</AlertLabel>
                ) : (<AlertLabel></AlertLabel>)
              }
            </div>
          </form>
          {/* useState로 관리해서 formData가 적절히 채워졌을 때 활성화 버튼으로 변경 */}
          <div >
            <LargeButtonActive2
              text="다음으로"
              className="mb-[37px]"
              onClick={clickNext}
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
                name="nickname"
                onChange={handleChangeNickname}
                value={formData.nickname}
                maxLength={10}
              ></InputTextFieldActive>
            </div>
            <div className="flex flex-col gap-y-[10px]">
              <TextNormal>제한속도 (hour/day)</TextNormal>
              <InputTextFieldActive
                min="0"
                max="24"
                name="max_speed"
                value={formData.max_speed}
                onChange={handleChangeMaxSpeed}
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
            onClick={onSubmit}
          ></LargeButtonActive>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
