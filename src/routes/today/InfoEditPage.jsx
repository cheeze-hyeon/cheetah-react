import { useEffect, useState } from "react";
import { HeaderBack } from "../../components/header/styled";
import userprofiles from "../../data/userprofiles";
import { TextNormal } from "../../components/text/styled";
import { InputTextFieldActive } from "../../components/input/styled";
import { LargeButtonActive } from "../../components/button/styled";
import { AlertLabel } from "../../components/input/styled";
import { getUserInfo, patchUserInfo } from "../../apis/api";

const InfoEditPage = () => {
  const [formData, setFormData] = useState({
    nickname: "",
    max_speed: "",
  });
  const [isAvailableNickname, setIsAvailableNickname] = useState(true);
  useEffect(() => {
    const getUserInfoFromServer = async () => {
      try{
        const response = await getUserInfo();
        setFormData({
          "nickname": response.data.nickname,
          "max_speed": response.data.max_speed,
        });
      }  catch (error){
        console.error("InfoEdit page 에러", error);
      }
    };
    getUserInfoFromServer();
    console.log(formData)
  }, []);
  const handleChangeNickname = (e) => {
    const{name, value} = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if(value.length >= 2){
      setIsAvailableNickname(true)
    }else{
      setIsAvailableNickname(false)
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
  const onClick = async(e) => {
    e.preventDefault();
    if(isAvailableNickname){
      try{
        await patchUserInfo(formData);
        window.location.href = "/today/mypage/";

      }catch (error){
        console.log("Form submission failed:", error);
      }
    }
  };
  return (
    <div>
      <HeaderBack text="내 정보 수정"></HeaderBack>
      <div className="w-[350px] m-auto flex flex-col gap-[435px]">
        <form className="flex flex-col gap-y-[20px]" >
          <div className="flex flex-col gap-y-[10px]">
            <TextNormal>닉네임</TextNormal>
            <InputTextFieldActive
              type="text"
              name="nickname"
              defaultvalue = {formData.nickname}
              onChange = {handleChangeNickname}
            ></InputTextFieldActive>
          </div>
          <div className="flex flex-col gap-y-[10px]">
            <TextNormal>제한속도 (hour/day)</TextNormal>
            <InputTextFieldActive
              type="number"
              name="max_speed"
              defaultvalue = {formData.max_speed}
              onChange = {handleChangeMaxSpeed}
            ></InputTextFieldActive>
            <AlertLabel>
              *하루에 투자할 수 있는 최대 시간을 입력해주세요
            </AlertLabel>
          </div>
        </form>
        <LargeButtonActive
          text="저장"
          className="mb-[37px]"
          onClick = {onClick}
        ></LargeButtonActive>
      </div>
    </div>
  );
};

export default InfoEditPage;
