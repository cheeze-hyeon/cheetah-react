import { HeaderMenu } from "../../components/header/styled";
import { TextHeavy, TextLight } from "../../components/text/styled";
import today_cheetah from "../../asset/images/today_cheetah.png";
import cheetah_graph from "../../asset/images/cheetah_graph.png";
import userprofiles from "../../data/userprofiles";
import { Dealt, Progress } from "./styled";
import { HamburgerMenu, TodayTask } from "./index";
import { Modal } from "../goal/styled";
import { useEffect, useState } from "react";
import { getUserInfo, logOut } from "../../apis/api";
import { getCookie } from "../../utils/cookie";
import { TodayTabBar } from "../../components/tabBar";
import { getGoalsindate } from "../../apis/api_calendar";

import { useLocation } from "react-router-dom";
import { AnimationDiv } from "./styled";

const TodayPage = () => {
  // const [today, setToday] = useState();
  const [clickMenu, setClickMenu] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phone_num: "",
    nickname: "",
    max_speed: "",
  });
  const [totalHour, setTotalHour] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [todayComment, setTodayComment] = useState("");
  const [speedRate, setSpeedRate] = useState(0);
  // const location = useLocation();
  // console.log(location);

  // const today = new Date();
  // console.log(today);
  // var year = today.getFullYear();
  // var month = ("0" + (today.getMonth() + 1)).slice(-2);
  // var day = ("0" + today.getDate()).slice(-2);
  // const dateString = year + "-" + month + "-" + day;
  // console.log(dateString);

  useEffect(() => {
    const getUserInfoFromServer = async () => {
      try {
        const response = await getUserInfo();
        console.log(response);
        setFormData({
          username: response.data.user.username,
          password: response.data.user.password,
          phone_num: response.data.phone_num,
          nickname: response.data.nickname,
          max_speed: response.data.max_speed,
        });
      } catch (error) {
        console.error("Today page 에러", error);
      }
    };
    getUserInfoFromServer();
    console.log(formData);
  }, []);

  const onClickMenu = () => {
    console.log(clickMenu);
    return setClickMenu(!clickMenu);
  };

  const onClickLogOut = async (e) => {
    e.preventDefault();
    try {
      const token = getCookie("refresh_token");
      await logOut(token);
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
    console.log(formData);
  }, []);

  // today에 따라 숫자 바뀌어야 함!
  const dealt = Math.floor((3 / 4) * 100);

  return (
    <div className="w-[390px] relative">
      <HeaderMenu
        clickMenu={clickMenu}
        onClickMenu={onClickMenu}
        text="TODAY"
      ></HeaderMenu>
      <div className="flex flex-col items-center gap-[20px] pt-5">
        <img src={today_cheetah} className="w-[200px]" alt="face" />
        <div
          id="cheetah_dashboard"
          className="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 w-[319px] relative gap-6 px-[30px] py-5 rounded-[20px] bg-[#faf9f9] m-auto"
        >
          <div className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 relative gap-1 w-[227px] h-[40px]">
            <div className="flex flex-row">
              <TextHeavy>{formData.nickname}</TextHeavy>
              <TextHeavy>님은 오늘</TextHeavy>
            </div>
            <div className="flex flex-row">
              <TextHeavy className="text-[#f19a37]">{totalHour}</TextHeavy>
              <TextHeavy className="text-[#f19a37]">h/day </TextHeavy>
              <TextHeavy>속도로 달려야 해요 🔥</TextHeavy>
            </div>
          </div>
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
              <Dealt dealt={dealt - 8} className="" />
              {/* 바쁜 정도에 따라 치타 움직임 속도 달라지게! */}
              {/* 치타 모습과 같은 기준으로 변화하기 */}
              <AnimationDiv speedratio={totalHour / formData.max_speed}>
                <img src={cheetah_graph} alt="face" className="w-[45px]" />
              </AnimationDiv>
            </div>
            <Progress>
              <Dealt dealt={dealt} />
            </Progress>
          </div>
          {/* goals */}
          {/* <div>
                {goalList.map(
                  (goal) =>
                    isDueDateGoal(goal) && (
                      <TodayTask
                        key={goal.id}
                        goal={goal}
                        tag={getTagOfGoal(tags, goal)}
                        isGoalCompleted={isGoalCompleted(goal)}
                        isPastGoal={isPastGoal(goal)}
                        openGoalDetailModal={() => openGoalDetailModal(goal.id)}
                      />
                    )
                )}
              </div> */}
        </div>
      </div>
      {clickMenu ? (
        <HamburgerMenu
          clickMenu={clickMenu}
          onClickMenu={onClickMenu}
          onClickLogOut={onClickLogOut}
        />
      ) : (
        <></>
      )}
      <TodayTabBar className="z-50" />
    </div>
  );
};

export default TodayPage;
