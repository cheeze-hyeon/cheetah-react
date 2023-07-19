import { HeaderBack, HeaderBackArrow } from "../components/header/styled";
import { TextNormal } from "../components/text/styled";
import {
  TextBtnSmall,
  CheckBox,
  LargeButtonNonActive
} from "../components/button/styled";
import { InputTextFieldActive } from "../components/input/styled";

const SignInPage = () => {
  return (
    <div className="flex flex-col m-auto">
      <HeaderBack text="로그인"></HeaderBack>
      <div className="flex w-[350px] flex-col gap-y-[20px] m-auto">
        <form>
          <div className="flex flex-col gap-y-[10px] mb-[20px]">
            <TextNormal>아이디</TextNormal>
            <InputTextFieldActive placeholder="아이디를 입력하세요" type="text"></InputTextFieldActive>
          </div>
          <div className="flex flex-col gap-y-[10px]">
            <TextNormal>비밀번호</TextNormal>
            <InputTextFieldActive placeholder="비밀번호를 입력하세요" type="password"></InputTextFieldActive>
          </div>
        </form>
        <div className="flex flex-end items-end flex-row-reverse">
          <TextBtnSmall text="비밀번호 찾기" /* to="/findpw" */></TextBtnSmall>
          <TextBtnSmall text="아이디 찾기" /* to="/findid" */></TextBtnSmall>
        </div>
        <CheckBox text="자동 로그인"></CheckBox>
        {/* useState로 관리해서 formData가 적절히 채워졌을 때 활성화 버튼으로 변경 */}
        <LargeButtonNonActive text="확인" to="../today"></LargeButtonNonActive>
      </div>
    </div>
  );
};

export default SignInPage;
