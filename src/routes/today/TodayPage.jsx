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
import { format } from "date-fns";
import * as s from "../calendar-detail/styled";
import { Task, CompletedTask, DueDateGoal } from "../calendar-detail/Task";



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
  const [todayComment, setTodayComment] = useState("");

  const today = new Date();
  const [goalsListwithImpossibledates, setGoalsListwithImpossibledates] = useState([]);
  const [isCompleteModalOpen, setisCompleteModalOpen] = useState(false);
  const [isGoalDetailModalOpen, setisGoalDetailModalOpen] = useState(false); // 초기에는 false로 설정
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [incompleted_tasks, setincompleted_tasks] = useState([]);
  const [completed_tasks, setcompleted_tasks] = useState([]);
  
  const showCompleteModal = (e) => { //완료 모달창
    if (e.target === e.currentTarget) {
      setisCompleteModalOpen(!isCompleteModalOpen);
    }
  };
  const handleGoalClick = (goalId) => { // 목표 클릭시
    const selectedGoal = goalsListwithImpossibledates.find((goal) => goal.id === goalId);
    setSelectedGoal(selectedGoal);
  };
  
  const onCloseGoalDetailModal = (e) => {
    if (e.target === e.currentTarget) {
      setisGoalDetailModalOpen(false); // 모달을 닫을 때 false로 설정
    }
  };
  
  const openGoalDetailModal = (goalId) => {
    setisGoalDetailModalOpen(true); // 모달을 열 때 true로 설정하고
    handleGoalClick(goalId); // 선택한 목표 정보 설정
  };
  const isGoalCompleted = (goal) => {
    return goal.progress_rate === 100;
  };

  const isTaskCompleted = (task) => {
    var id = task.id;
    completed_tasks.forEach((goal) => {
      if (goal.id === id) {
        return true;
      }
    });
  };

  const getGoalsindateAPI = async() => { //오늘 날짜에 포함되는 목표 가져오기
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    // "yyyy-mm-dd" 형태의 문자열 생성
    const formattedDate = `${year}-${month}-${day}`;
    const goalsRaw = await getGoalsindate(formattedDate)
    const goalsProcessed = goalsRaw.map((goal) => {
      var id = goal.id;
      var title = goal.title;
      var finish_at = new Date(goal.finish_at);
      var residual_time = goal.residual_time
      var start_at = goal.start_at; //e.g "2023-07-18"
      var progress_rate = goal.progress_rate;
      var update_at = new Date(goal.update_at);
      var tag = goal.tag;
      var impossibledates_set = goal.impossibledates_set;

      if(progress_rate === 100){
        return{
          id: id,
          title: title,
          hoursperday: 0,
          finish_at: finish_at,
          update_at: update_at,
          progress_rate: 100,
          tag: tag,
        }
      };
      var impossibledates = 0;
      for(var i = 0; i < impossibledates_set.length; i++){
        if(impossibledates_set[i] > today) impossibledates++
      }
      var datedifference = Math.ceil((finish_at.getTime() - today.getTime())/(1000 * 60 * 60 * 24))
      var hoursperday = residual_time / (datedifference + impossibledates)

      return{
        id: id,
        title: title,
        hoursperday: hoursperday,
        finish_at: finish_at,
        update_at: update_at,
        progress_rate: 100,
        tag: tag,
        impossibledates_set: impossibledates_set,
      };
    });
    setGoalsListwithImpossibledates(goalsProcessed);
    console.log("goal Processed", goalsProcessed)


  }
  useEffect(() => { //전체 목표 리스트에서 완료된 목표, 미완료된 목표 나눠서 저장
    console.log(goalsListwithImpossibledates);
  
    // 임시 변수를 사용하여 완료 및 미완료 목표를 저장
    const tempCompletedTasks = [];
    const tempIncompletedTasks = [];
  
    for (var i = 0; i < goalsListwithImpossibledates.length; i++) {
      if (goalsListwithImpossibledates[i].update_at === today) {
        tempCompletedTasks.push(goalsListwithImpossibledates[i]);
      } else {
        tempIncompletedTasks.push(goalsListwithImpossibledates[i]);
      }
    }
  
    // 한 번에 상태를 업데이트
    setcompleted_tasks(tempCompletedTasks);
    setincompleted_tasks(tempIncompletedTasks);
  }, [goalsListwithImpossibledates]);

  useEffect(() => {
    var studyhour = 0;
    for (var i = 0; i < incompleted_tasks.length; i++) {
      if (!incompleted_tasks[i].impossibledates_set.some((date) => date === today)) {
        studyhour += incompleted_tasks[i].hoursperday;
      }
    }
    
    setTotalHour(studyhour);
  }, [today, incompleted_tasks]);


  const isDueDateGoal = (goal) => {
    return goal.is_finishdate;
  };

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

  // const getGoalList = () => {
  //   const goalList = goals.filter((goal) => {
  //     const calendarDate = startOfDay(new Date(selectedDate));
  //     const startDate = startOfDay(new Date(goal.start_at));
  //     const finishDate = startOfDay(new Date(goal.finish_at));

  //     return calendarDate >= startDate && calendarDate <= finishDate;
  //   });
  //   return goalList;
  // };

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
    console.log(formData);
  }, [formData]);

  // today에 따라 숫자 바뀌어야 함!
  const dealt = Math.floor((completed_tasks.length / incompleted_tasks.length + completed_tasks.length) * 100);

  return (
    <div>
      {clickMenu ? (
        <HamburgerMenu
          clickMenu={clickMenu}
          onClickMenu={onClickMenu}
          onClickLogOut={onClickLogOut}
        />
      ) : (
        <div>
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
                  <TextHeavy className="text-[#f19a37]">{parseInt(totalHour)}</TextHeavy>
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
                <div className="flex flex-row">
                  <TextLight>{incompleted_tasks.length + completed_tasks.length}</TextLight>
                  <TextLight>개 중 </TextLight>
                  <TextLight>{completed_tasks.length}</TextLight>
                  <TextLight>개 완료</TextLight>
                </div>
              </div>
              {/* cheetah graph */}
              {/* 전체 시간 중 얼마나 달렸는지에 따라 */}
              <div className="my-[20px]">
                <div className="flex flex-row w-[300px] mx-auto">
                  <Dealt dealt={dealt - 7.4} className="" />
                  <img src={cheetah_graph} alt="face" className="w-[45px]" />
                </div>
                <Progress>
                  <Dealt dealt={dealt} />
                </Progress>
              </div>
              <>
      <s.CalendarDetailLayout>
        <s.GoalCountWrapper>
          <s.GoalCount>
            {`${incompleted_tasks.length}개의 목표, ${completed_tasks.length}건 완료`}
          </s.GoalCount>
        </s.GoalCountWrapper>
        <s.TasksContainer>
          {
              incompleted_tasks.length +
              completed_tasks.length ===
              0 && <s.EmptyMessage text="달릴 목표가 없어요" />
          }
          {completed_tasks.map(
            (task) =>
              !isDueDateGoal(task) && (
                <CompletedTask
                  key={task.id}
                  goal={task}
                  tag={task.tag}
                  isGoalCompleted={isGoalCompleted(task)}
                  openGoalDetailModal={() => openGoalDetailModal(task.id)}
                />
              )
          )}
          {incompleted_tasks.map(
            (task) =>
              !isDueDateGoal(task) &&
              !isTaskCompleted(task) && (
                <Task
                  key={task.id}
                  goal={task}
                  tag={task.tag}
                  hidden={task.is_hidden}
                  openGoalDetailModal={() => openGoalDetailModal(task.id)}
                  currentdate={today}
                />
              )
          )}
        </s.TasksContainer>
      </s.CalendarDetailLayout>
    </>
            </div>
          </div>
          <TodayTabBar />
        </div>
      )}
    </div>
  );
};

export default TodayPage;
