import { useEffect, useState } from "react";
import { HeaderBack } from "../../components/header/styled";
import userprofiles from "../../data/userprofiles";
import { TextNormal } from "../../components/text/styled";
import { InputTextFieldActive } from "../../components/input/styled";
import { LargeButtonActive } from "../../components/button/styled";
import { AlertLabel } from "../../components/input/styled";

const InfoEditPage = () => {
  const [profile, setProfile] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    // 참고 : api 연결은 아래처럼!!
    // createPost(formData, navigate);
  };
  return (
    <div>
      <HeaderBack text="내 정보 수정"></HeaderBack>
      <div className="w-[350px] m-auto flex flex-col gap-[435px]">
        <form className="flex flex-col gap-y-[20px]" onSubmit={onSubmit}>
          <div className="flex flex-col gap-y-[10px]">
            <TextNormal>닉네임</TextNormal>
            <InputTextFieldActive
              placeholder="오민"
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
          text="저장"
          className="mb-[37px]"
          to="/today"
        ></LargeButtonActive>
      </div>
    </div>
  );
};

export default InfoEditPage;
