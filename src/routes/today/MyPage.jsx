import { HeaderBack } from "../../components/header/styled";
import today_cheetah from "../../asset/images/today_cheetah.png";
import month_cheetah from "../../asset/images/month_cheetah.png";
import clock from "../../asset/images/clock.png";
import { TitleHeavy, TitleNormal } from "../../components/text/styled";
import { MySlimButtonActive } from "./index";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../apis/api";

const MyPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phone_num: "",
    nickname: "",
    max_speed: "",
  });

  useEffect(() => {
    const getUserInfoFromServer = async () => {
      try {
        const response = await getUserInfo();
        setFormData({
          username: response.data.user.username,
          password: response.data.user.password,
          phone_num: response.data.phone_num,
          nickname: response.data.nickname,
          max_speed: response.data.max_speed,
          monthly_hour: response.data.monthly_hour,
        });
      } catch (error) {
        console.error("Today page 에러", error);
      }
    };
    getUserInfoFromServer();
  }, []);

  console.log("mypage", formData);

  return (
    <div className="h-full bg-[#faf9f9]">
      <HeaderBack text="마이 페이지" to={"../"}></HeaderBack>
      <div className="flex flex-col gap-[20px]">
        <div className="bg-[#fff] w-[344px] h-[371px] m-auto rounded-[15px] py-[20px] px-[50px] flex flex-col gap-[25px]">
          <div className="flex flex-row m-auto">
            <TitleNormal>{formData.nickname}</TitleNormal>
            <TitleNormal>님의 치타</TitleNormal>
          </div>
          <img src={month_cheetah} alt="face" className="w-[150px] m-auto" />
          <div className="flex flex-row m-auto">
            <TitleNormal>이번 달 치타가</TitleNormal>
            <TitleNormal className="text-[#f19a37]">
              {" "}
              {formData.monthly_hour}시간
            </TitleNormal>
            <TitleNormal> 달렸어요!</TitleNormal>
          </div>
          <MySlimButtonActive
            color="#FFE39A"
            text="치타 꾸미러 가기😎"
          ></MySlimButtonActive>
        </div>
        <div className=" bg-[#fff] w-[344px] h-[232px] m-auto rounded-[15px] py-[20px] px-[50px] flex flex-col gap-[25px]">
          <img src={clock} alt="face" className="w-[93px] m-auto" />
          <div className="flex flex-row m-auto">
            <TitleNormal>현재 제한속도</TitleNormal>
            <TitleNormal className="text-[#f19a37]">
              {" "}
              {formData.max_speed}h/day
            </TitleNormal>
          </div>
          <MySlimButtonActive
            color="#EAEEF1"
            text="내 정보 수정하기"
            to="/edit"
          ></MySlimButtonActive>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
