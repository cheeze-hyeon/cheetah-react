import {
  HeaderBack,
  HeaderBackArrow,
  HeaderMenu,
  HeaderModal,
  HeaderMore,
} from "../components/header/styled";
import { TextNormal } from "../components/text/styled";
import {
  TextBtnSmall,
  CheckBox,
  LargeButtonNonActive,
  LargeButtonActive,
} from "../components/button/styled";
import { InputTextFieldActive, AlertLabel } from "../components/input/styled";
import { useEffect, useState } from "react";
import { signIn } from "../apis/api";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    autologin: true,
  });
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isValidAccount, setIsValidAccount] = useState("");
  const handleChangeID = (e) => { //아이디 입력창 관리
    const value = e.target.value.replace(/[^A-Za-z0-9]/gi, "").toLowerCase();
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: value,
    }));
  };
  const handleChangePassword = (e) => {//비밀번호 입력창 관리
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleAutoLoginChange = (e) => {//오토 로그인 여부 확인
    const { name, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  };
  const onSubmit = async (e) => {//로그인 실행
    e.preventDefault();
    try {
      await signIn(formData);
    } catch (error) {
      console.log("Form submission failed:", error);

      setIsValidAccount(false);
    }
  };

  useEffect(() => {// 로그인 버튼 활성화 여부 판단
    if (formData.username.length > 0 && formData.password.length > 0)
      setIsButtonActive(true);
  }, [formData]);
  return (
    <div className="flex flex-col">
      <HeaderBack text="로그인"></HeaderBack>
      <div className="flex w-[350px] flex-col gap-y-[20px] m-auto">
        <form>
          <div className="flex flex-col gap-y-[10px] mb-[20px]">
            <TextNormal>아이디</TextNormal>
            <InputTextFieldActive
              placeholder="아이디를 입력하세요"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChangeID}
            ></InputTextFieldActive>
          </div>
          <div className="flex flex-col gap-y-[10px]">
            <TextNormal>비밀번호</TextNormal>
            <InputTextFieldActive
              placeholder="비밀번호를 입력하세요"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChangePassword}
            ></InputTextFieldActive>
          </div>
        </form>
        <div className="flex flex-end items-end flex-row-reverse">
          <TextBtnSmall text="비밀번호 찾기" to="/findpw"></TextBtnSmall>
          <TextBtnSmall text="아이디 찾기" to="/findid"></TextBtnSmall>
        </div>
        <CheckBox
          text="자동 로그인"
          className="flex justify-start"
          checked={formData.autologin}
          name="autologin"
          onChange={handleAutoLoginChange}
        ></CheckBox>
        {isValidAccount === false ? (
          <AlertLabel>아이디 또는 비밀번호가 틀렸습니다.</AlertLabel>
        ) : (
          <AlertLabel></AlertLabel>
        )}
        {isButtonActive ? (
          <LargeButtonActive text="확인" onClick={onSubmit}></LargeButtonActive>
        ) : (
          <LargeButtonNonActive text="확인"></LargeButtonNonActive>
        )}
      </div>
    </div>
  );
};

export default SignInPage;
