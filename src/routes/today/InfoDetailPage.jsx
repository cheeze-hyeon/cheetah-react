import { useEffect, useState } from "react";
import { HeaderBack } from "../../components/header/styled";
import userprofiles from "../../data/userprofiles";
import { TextNormal } from "../../components/text/styled";
import { InputTextFieldActive } from "../../components/input/styled";
import { LargeButtonActive } from "../../components/button/styled";

const InfoDetailPage = () => {
  const [profile, setProfile] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    // 참고 : api 연결은 아래처럼!!
    // createPost(formData, navigate);
  };
  return (
    <div>
      <HeaderBack text="계정 정보"></HeaderBack>
      <div className="w-[350px] m-auto flex flex-col gap-[435px] pointer-events-none">
        <form className="flex flex-col gap-y-[20px]" onSubmit={onSubmit}>
          <div className="flex flex-col gap-y-[10px]">
            <TextNormal>아이디</TextNormal>
            <InputTextFieldActive
              value="cheetah"
              type="text"
            ></InputTextFieldActive>
          </div>
          <div className="flex flex-col gap-y-[10px]">
            <TextNormal>전화번호</TextNormal>
            <InputTextFieldActive
              value="010-1234-5678"
              type="text"
            ></InputTextFieldActive>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InfoDetailPage;
