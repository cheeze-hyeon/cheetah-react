import { HeaderMenu } from "../../components/header/styled";
import { TextHeavy, TextLight } from "../../components/text/styled";
import today_cheetah from "../../asset/images/today_cheetah.png";
import cheetah_graph from "../../asset/images/cheetah_graph.png";
import cheetah_speed0 from "../../asset/images/cheetah_0.png";
import cheetah_speed1 from "../../asset/images/cheetah_1-30.png";
import cheetah_speed2 from "../../asset/images/cheetah_31-75.png";
import cheetah_speed3 from "../../asset/images/cheetah_76-100.png";
import cheetah_speed4 from "../../asset/images/cheetah_101-.png";

import userprofiles from "../../data/userprofiles";
import { Dealt, Progress } from "./styled";
import { HamburgerMenu, TodayTask } from "./index";
import { Modal } from "../goal/styled";
import { useEffect, useState } from "react";
import { getUserInfo, logOut } from "../../apis/api";
import { getCookie } from "../../utils/cookie";
import { TodayTabBar } from "../../components/tabBar";
import { getGoalsindate, updateGoaldaily } from "../../apis/api_calendar";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import * as s from "../calendar-detail/styled";
import { TodayGoalDetailLayout } from "./styled";
import {
  Task,
  CompletedTask,
  DueDateGoal,
  IncompletedTask,
} from "../calendar-detail/Task";
import {
  CalendarDetailHeader,
  HeaderMessage,
  TaskCompleteModal,
} from "../calendar-detail/.";
import { ModalOverlay } from "../../components/modal/styled";
import { GoalDetialModalLight } from "../calendar-detail/goal-detail/styled";
import { AnimationDiv, TodayCheetahAnimation } from "./styled";

const TodayPage = () => {
  const [clickMenu, setClickMenu] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phone_num: "",
    nickname: "",
    max_speed: "",
  });
  const [totalHour, setTotalHour] = useState(0);
  const [todayComment, setTodayComment] = useState("");

  const today = new Date();
  const [goalsListwithImpossibledates, setGoalsListwithImpossibledates] =
    useState([]);
  const [isFinishModalOpen, setisFinishModalOpen] = useState(false);
  const [isGoalDetailModalOpen, setisGoalDetailModalOpen] = useState(false); // 초기에는 false로 설정
  const [isGoalFinishModalOpen, setisGoalFinishModalOpen] = useState(false); // 초기에는 false로 설정
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedFinishGoal, setSelectedFinishGoal] = useState(null);
  const [incompleted_tasks, setIncompleted_tasks] = useState([]);
  const [completed_tasks, setCompleted_tasks] = useState([]);
  const [impossible_tasks, setImpossible_tasks] = useState([]);
  const [finishedTasksCount, setFinishiedTasksCount] = useState(0);
  const [unfinishedTasksCount, setUnfinishiedTasksCount] = useState(0);
  const [progressRate, setProgressRate] = useState(0); // 진행률
  const [dailyHour, setDailyHour] = useState(0); //진행 시간

  const showFinishModal = (e) => {
    //완료 모달창
    if (e.target === e.currentTarget) {
      setisFinishModalOpen(!isFinishModalOpen);
    }
  };
  const handleGoalClick = (goalId) => {
    // 목표 클릭시
    const selectedGoal = goalsListwithImpossibledates.find(
      (goal) => goal.id === goalId
    );
    setSelectedGoal(selectedGoal);
  };
  const handleGoalFinishClick = (goalId) => {
    const selectedFinishGoal = goalsListwithImpossibledates.find(
      (goal) => goal.id === goalId
    );
    console.log(selectedFinishGoal);
    setSelectedFinishGoal(selectedFinishGoal);
  };

  const CompleteGoalAPI = async (goalId) => {
    const response = await updateGoaldaily(
      goalId,
      { daily_check: true },
      { daily_time: dailyHour, progress_rate: progressRate }
    );
    console.log(response);
  };

  const onCloseGoalDetailModal = (e) => {
    if (e.target === e.currentTarget) {
      setisGoalDetailModalOpen(false); // 모달을 닫을 때 false로 설정
    }
  };
  const onCloseGoalFinishModal = (e) => {
    if (e.target === e.currentTarget) {
      setisGoalFinishModalOpen(false); // 모달을 닫을 때 false로 설정
    }
  };
  const onCompleteGoalFinishModal = (e, goal) => {
    if (e.target === e.currentTarget) {
      console.log(goal);
      setisGoalFinishModalOpen(false); // 모달을 닫을 때 false로 설정
      CompleteGoalAPI(goal);
    }
  };

  const openGoalDetailModal = (goalId) => {
    setisGoalDetailModalOpen(true); // 모달을 열 때 true로 설정하고
    handleGoalClick(goalId); // 선택한 목표 정보 설정
  };
  const openGoalFinishModal = (goalId) => {
    setisGoalFinishModalOpen(true); // 모달을 열 때 true로 설정하고
    handleGoalFinishClick(goalId); // 선택한 목표 정보 설정
  };

  const isGoalCompleted = (goal) => {
    return goal.progress_rate === 100;
  };

  const getGoalsindateAPI = async () => {
    //오늘 날짜에 포함되는 목표 가져오기
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    // "yyyy-mm-dd" 형태의 문자열 생성
    const formattedDate = `${year}-${month}-${day}`;
    const goalsRaw = await getGoalsindate(formattedDate);
    const goalsProcessed = goalsRaw.map((goal) => {
      var id = goal.id;
      var title = goal.title;
      var finish_at = new Date(goal.finish_at);
      var residual_time = goal.residual_time;
      var start_at = goal.start_at; //e.g "2023-07-18"
      var progress_rate = goal.progress_rate;
      var update_at = new Date(goal.update_at);
      var tag = goal.tag;
      var impossibledates_set = goal.impossibledates_set;
      var todo_set = goal.todo_set;

      if (progress_rate === 100) {
        return {
          id: id,
          title: title,
          hoursperday: 0,
          start_at: start_at,
          finish_at: finish_at,
          update_at: update_at,
          progress_rate: 100,
          residual_time: residual_time,
          daily_time: 0,
          tag: tag,
          todo_set: todo_set,
        };
      }
      var impossibledates = 0;
      for (var i = 0; i < impossibledates_set.length; i++) {
        if (impossibledates_set[i] > today) impossibledates++;
      }
      var datedifference = Math.ceil(
        (finish_at.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (datedifference + impossibledates <= 0)
        var hoursperday = residual_time;
      else var hoursperday = residual_time / (datedifference + impossibledates);

      var impossible = isImpossible(impossibledates_set);
      return {
        id: id,
        title: title,
        hoursperday: hoursperday,
        start_at: start_at,
        finish_at: finish_at,
        update_at: update_at,
        progress_rate: progress_rate,
        residual_time: residual_time,
        daily_time: 0,
        tag: tag,
        impossible: impossible,
        todo_set: todo_set,
      };
    });
    setGoalsListwithImpossibledates(goalsProcessed);
    console.log("goal Processed", goalsProcessed);
  };

  useEffect(() => {
    //전체 목표 리스트에서 완료된 목표, 미완료된 목표 나눠서 저장
    console.log(goalsListwithImpossibledates);

    // 임시 변수를 사용하여 완료 및 미완료 목표를 저장
    const tempCompletedTasks = [];
    const tempIncompletedTasks = [];
    var finishedCount = 0;
    var unfinishedCount = 0;

    for (var i = 0; i < goalsListwithImpossibledates.length; i++) {
      if (goalsListwithImpossibledates[i].progress_rate === 100) {
        tempCompletedTasks.push(goalsListwithImpossibledates[i]);
      } else {
        console.log(today, goalsListwithImpossibledates[i].update_at);
        tempIncompletedTasks.push(goalsListwithImpossibledates[i]);
        if (isFinished(goalsListwithImpossibledates[i].update_at)) {
          finishedCount++;
        } else unfinishedCount++;
      }
    }
    // 한 번에 상태를 업데이트
    setCompleted_tasks(tempCompletedTasks);
    setIncompleted_tasks(tempIncompletedTasks);
    setFinishiedTasksCount(finishedCount);
    setUnfinishiedTasksCount(unfinishedCount);
  }, [goalsListwithImpossibledates]);

  useEffect(() => {
    console.log(incompleted_tasks);
    var studyhour = 0;
    for (var i = 0; i < incompleted_tasks.length; i++) {
      console.log("hi");
      if (
        !incompleted_tasks[i].impossible &&
        !isFinished(incompleted_tasks[i].update_at)
      ) {
        studyhour += incompleted_tasks[i].hoursperday;
        console.log(studyhour);
      }
    }
    setTotalHour(studyhour);
  }, [today, incompleted_tasks]);

  useEffect(() => {
    if (selectedFinishGoal) {
      setProgressRate(selectedFinishGoal.progress_rate);
    }
  }, [isGoalFinishModalOpen]);

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
    getGoalsindateAPI();
  }, []);

  const onClickMenu = () => {
    console.log(clickMenu);
    return setClickMenu(!clickMenu);
  };

  // 쿠키를 삭제하는 함수
  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };
  const isFinished = (date) => {
    return (
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()
    );
  };
  const isImpossible = (impossible_dates_set) => {
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    // "yyyy-mm-dd" 형태의 문자열 생성
    const formattedDate = `${year}-${month}-${day}`;
    for (var i = 0; i < impossible_dates_set.length; i++) {
      if (formattedDate === impossible_dates_set[i]) {
        return true;
      }
    }
    return false;
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
    console.log(formData);
  }, []);

  // today에 따라 숫자 바뀌어야 함!
  const dealt = Math.floor(
    ((finishedTasksCount + completed_tasks.length) /
      (finishedTasksCount + unfinishedTasksCount + completed_tasks.length)) *
      100
  );

  const speedratio = parseInt(totalHour) / formData.max_speed;

  return (
    <div className="w-[390px] relative">
      <div className="sticky top-0 bg-white z-10">
        <HeaderMenu
          clickMenu={clickMenu}
          onClickMenu={onClickMenu}
          text="TODAY"
        ></HeaderMenu>
        <div className="flex flex-col items-center gap-[20px] pt-5">
            <img
              src={
                speedratio > 1
                  ? cheetah_speed4
                  : speedratio > 0.75
                  ? cheetah_speed3
                  : speedratio > 0.3
                  ? cheetah_speed2
                  : speedratio > 0
                  ? cheetah_speed1
                  : cheetah_speed0
              }
              className="w-[200px]"
              alt="face"
            />
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
                <TextHeavy className="text-[#f19a37]">
                  {parseInt(totalHour)}
                </TextHeavy>
                <TextHeavy className="text-[#f19a37]">h/day </TextHeavy>
                <TextHeavy>속도로 달려야 해요 🔥</TextHeavy>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="today_goals"
        className="m-auto mt-[20px] z-30 sticky bg-white px-[10px] py-[15px] rounded-t-[25px] border-t-[3px] border-[#f5f5f5]"
      >
        <div className="flex flex-row px-[10px] mt-[20px] justify-between items-start ">
          <div>
            <TextHeavy>To Do List</TextHeavy>
          </div>
          <div className="flex flex-row">
            <TextLight>
              {finishedTasksCount +
                unfinishedTasksCount +
                completed_tasks.length}
            </TextLight>
            <TextLight>개 중 </TextLight>
            <TextLight>{finishedTasksCount + completed_tasks.length}</TextLight>
            <TextLight>개 완료</TextLight>
          </div>
        </div>
        {/* cheetah graph */}
        {/* 전체 시간 중 얼마나 달렸는지에 따라 */}
        <div className="my-[20px]">
          <div className="flex flex-row w-[300px] mx-auto">
            <Dealt dealt={dealt - 8} className="" />
            {/* 바쁜 정도에 따라 치타 움직임 속도 달라지게! */}
            {/* 치타 모습과 같은 기준으로 변화하기 */}
            <AnimationDiv speedratio={speedratio}>
              <img src={cheetah_graph} alt="face" className="w-[45px]" />
            </AnimationDiv>
          </div>
          <Progress>
            <Dealt dealt={dealt} />
          </Progress>
        </div>
        {/* goals */}
        <>
          <TodayGoalDetailLayout>
            <s.GoalCountWrapper>
              <s.GoalCount>
                {`${
                  finishedTasksCount +
                  unfinishedTasksCount +
                  completed_tasks.length
                }개의 목표, ${
                  finishedTasksCount + completed_tasks.length
                }건 완료`}
              </s.GoalCount>
            </s.GoalCountWrapper>
            <s.TasksContainer>
              {unfinishedTasksCount === 0 && (
                <s.EmptyMessage text="달릴 목표가 없어요" />
              )}
              {completed_tasks.map((task) => (
                <CompletedTask
                  key={task.id}
                  goal={task}
                  tag={task.tag}
                  isGoalCompleted={isGoalCompleted(task)}
                  openGoalDetailModal={() => openGoalDetailModal(task.id)}
                />
              ))}
              {incompleted_tasks.map((task) => (
                <IncompletedTask
                  key={task.id}
                  goal={task}
                  tag={task.tag}
                  hidden={task.impossible}
                  openGoalDetailModal={() => openGoalDetailModal(task.id)}
                  openGoalFinishModal={() => openGoalFinishModal(task.id)}
                  currentdate={today}
                />
              ))}
            </s.TasksContainer>
          </TodayGoalDetailLayout>
          {isGoalFinishModalOpen && (
            <ModalOverlay onClick={onCloseGoalFinishModal}>
              <TaskCompleteModal
                onCompleteGoalFinishModal={onCompleteGoalFinishModal}
                onCloseGoalCompleteModal={onCloseGoalFinishModal}
                goal={selectedFinishGoal}
                showCompleteModal={showFinishModal}
                progressRate={progressRate}
                setProgressRate={setProgressRate}
                dailyHour={dailyHour}
                setDailyHour={setDailyHour}
              />
            </ModalOverlay>
          )}
          {isGoalDetailModalOpen && (
            <ModalOverlay onClick={onCloseGoalDetailModal}>
              <GoalDetialModalLight
                onCloseGoalDetailModal={onCloseGoalDetailModal}
                goal={selectedGoal}
                todos={selectedGoal.todos}
              />
            </ModalOverlay>
          )}
        </>
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
      ;
      <TodayTabBar className="sticky z-50" />
    </div>
  );
};

export default TodayPage;
