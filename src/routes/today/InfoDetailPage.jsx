import { useEffect, useState } from "react";
import { HeaderBack } from "../../components/header/styled";
import userprofiles from "../../data/userprofiles";
import { TextNormal } from "../../components/text/styled";
import { InputTextFieldActive } from "../../components/input/styled";
import { LargeButtonActive } from "../../components/button/styled";
import { getUserInfo } from "../../apis/api";

const InfoDetailPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    phone_num: "",
  });
  useEffect(() => {
    const getUserInfoFromServer = async () => {
      try {
        const response = await getUserInfo();
        const user = response.data.user; // 확인: user가 올바르게 구조화되어 있는지
        const phoneNum = response.data.phone_num; // 확인: phone_num이 올바르게 구조화되어 있는지

        if (user && phoneNum) {
          setFormData({
            username: user.username,
            phone_num: `${phoneNum.slice(0, 3)}-${phoneNum.slice(3, 7)}-${phoneNum.slice(7)}`,
          });
        } else {
          console.error("getUserInfo API 응답 데이터 구조가 올바르지 않습니다.");
        }
      } catch (error) {
        console.error("InfoDetail page 에러", error);
      }
    };
    getUserInfoFromServer();
  }, []);

  return (
    <div>
      <HeaderBack text="계정 정보"></HeaderBack>
      <div className="w-[350px] m-auto flex flex-col gap-[435px] pointer-events-none">
        <form className="flex flex-col gap-y-[20px]">
          <div className="flex flex-col gap-y-[10px]">
            <TextNormal>아이디</TextNormal>
            <InputTextFieldActive
              value= {formData.username}
              type="text"
            ></InputTextFieldActive>
          </div>
          <div className="flex flex-col gap-y-[10px]">
            <TextNormal>전화번호</TextNormal>
            <InputTextFieldActive
              value={formData.phone_num}
              type="text"
            ></InputTextFieldActive>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InfoDetailPage;
