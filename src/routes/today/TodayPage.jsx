import { HeaderMenu } from "../../components/header/styled";
import { TextHeavy, TextLight } from "../../components/text/styled";
import today_cheetah from "../../asset/images/today_cheetah.png";
import cheetah_graph from "../../asset/images/cheetah_graph.png";
import userprofiles from "../../data/userprofiles";
import { Dealt, HamburgerMenu, Progress, dealt } from "./styled";
import { Modal } from "../goal/styled";
import { useEffect, useState } from "react";
import { getUserInfo, logOut } from "../../apis/api";
import { getCookie } from "../../utils/cookie";

const TodayPage = () => {
  // useEffect = (()=>{
  //   // const [userProfile, setUserProfile] = useState("");
  //   // user 닉네임 건네주는 API 사용 ("api/today/account")
  // }, [])
  const [today, setToday] = useState()
  const [clickMenu, setClickMenu] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phone_num: "",
    nickname: "",
    max_speed: "",
  });

  useEffect(() => {
    const getUserInfoFromServer = async () => {
      try{
        const response = await getUserInfo();
        setFormData({
          "username": response.data.user.username,
          "password": response.data.user.password,
          "phone_num": response.data.phone_num,
          "nickname": response.data.nickname,
          "max_speed": response.data.max_speed,
        });
      }  catch (error){
        console.error("Today page 에러", error);
      }
    };
    getUserInfoFromServer();
    console.log(formData)
  }, []);

  const onClickMenu = () => {
    console.log(clickMenu);
    return setClickMenu(!clickMenu);
  };

// 쿠키를 삭제하는 함수
const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// onClickLogOut 함수에서 호출하여 쿠키들을 삭제
const onClickLogOut = async (e) => {
  e.preventDefault();
  try {
    const token = getCookie("refresh_token");
    await logOut(token);

    // 쿠키들을 삭제
    deleteCookie("refresh_token");
    deleteCookie("access_token");
    //deleteCookie("csrftoken");

    setFormData({
      username: "",
      password: "",
      phone_num: "",
      nickname: "",
      max_speed: "",
    });
    console.log(formData);
    window.location.href = "/";
  } catch (error) {
    console.log("Log Out failed:", error);
  }
};


  useEffect(() => {
    console.log(formData)
  },[formData])
  return (
    <div>
      {clickMenu ? (
        <HamburgerMenu clickMenu={clickMenu} onClickMenu={onClickMenu} onClickLogOut = {onClickLogOut}/>
      ) : (
        <div>
          <HeaderMenu
            clickMenu={clickMenu}
            onClickMenu={onClickMenu}
            text="TODAY"
          ></HeaderMenu>
          <div className="flex flex-col gap-[20px]">
            <div
              id="cheetah_dashboard"
              className="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 w-[319px] relative gap-6 px-[30px] py-5 rounded-[20px] bg-[#faf9f9] m-auto"
            >
              <div className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 relative gap-1 w-[227px] h-[50px]">
                <div className="flex flex-row">
                  <TextHeavy >{formData.nickname}</TextHeavy>
                  <TextHeavy>님은 오늘</TextHeavy>
                </div>
                <div className="flex flex-row">
                  <TextHeavy className="text-[#f19a37]">10h/day </TextHeavy>
                  <TextHeavy>속도로 달려야 해요 🔥</TextHeavy>
                </div>
              </div>
              <img src={today_cheetah} alt="face" />
            </div>
            <div id="today_goals" className="w-[330px] m-auto">
              <div className="flex flex-row px-[10px] mt-[20px] justify-between items-start ">
                <div>
                  <TextHeavy>To Do List</TextHeavy>
                </div>
                <div>
                  <TextLight>4개 중 3개 완료</TextLight>
                </div>
              </div>
              {/* cheetah graph */}
              {/* 전체 시간 중 얼마나 달렸는지에 따라 */}
              <div className="my-[20px]">
                <div className="flex flex-row w-[300px] mx-auto">
                  <Dealt dealt={dealt - 7.4} className="" />
                  <img src={cheetah_graph} alt="face" className="" />
                </div>
                <div>
                  <Progress>
                    <Dealt dealt={dealt} />
                  </Progress>
                </div>
              </div>
              {/* goals */}
              <div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayPage;
