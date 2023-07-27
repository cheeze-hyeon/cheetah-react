import {
  getGoalsindate,
  deleteImpossibleDate,
  createImpossibleDate,
} from "../../apis/api_calendar";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { CalendarDetailHeader, HeaderMessage, TaskCompleteModal } from ".";
import { Task, CompletedTask, DueDateGoal } from "./Task";
import { parse, isSameDay, isPast, isToday, startOfDay, set } from "date-fns"; // parse 함수를 import 합니다.
import * as s from "./styled";
import { ModalOverlay } from "../../components/modal/styled";
import subDays from "date-fns/subDays";
import { GoalDetialModalLight } from "./goal-detail/styled";
import { taskBtnContainer } from "../today/styled";
import { cacheNames } from "workbox-core";
import { getUserInfo } from "../../apis/api";

const CalendarDetailPage = () => {
  const location = useLocation();

  const locationState = location.state || {}; // location.state가 null인 경우를 방지하기 위해 빈 객체로 초기화
  const goals = locationState.goalsindate || [];
  const histories =
    (locationState.historyindate && locationState.historyindate[0][1]) || [];
  const colorHistory = locationState.color_history || []; // 필요에 따라 초기값 설정

  const { selectedDate } = useParams();
  const parsedDate = parse(selectedDate, "yyyy-MM-d", new Date());
  const [isCompleteModalOpen, setisCompleteModalOpen] = useState(false);
  const [isGoalDetailModalOpen, setisGoalDetailModalOpen] = useState(false); // 초기에는 false로 설정
  const [selectedGoal, setSelectedGoal] = useState(null);
  //3개의 종류로 구분. incompleted_tasks, completed_tasks, finishdate_goals
  const [incompleted_tasks, setincompleted_tasks] = useState([]);
  const [finishdate_goals, setfinishdate_goals] = useState([]);
  const [completed_tasks, setcompleted_tasks] = useState([]);

  const [speedRate, setSpeedRate] = useState(0);
  const [maxSpeed, setMaxSpeed] = useState(0);
  const [headerText, setHeaderText] = useState("");
  const [historySpeedText, setHistorySpeedText] = useState("");

  // console.log("date", goals);
  // console.log("history", histories);

  // 제한속도 불러오기
  useEffect(() => {
    const getUserInfoAPI = async () => {
      const userInfo = await getUserInfo();
      setMaxSpeed(userInfo.data.max_speed);
    };
    getUserInfoAPI();
  }, []);

  useEffect(() => {
    let sum = 0;
    let hist_sum = 0;

    incompleted_tasks.forEach((task) => {
      if (
        !task.is_hidden &&
        !isSameDay(new Date(task.finish_at), new Date(selectedDate))
      ) {
        sum += task.hoursperday;
      }
    });

    finishdate_goals.forEach((goal) => {
      sum += goal.hoursperday;
    });

    const hours = Math.floor(sum); // 소수점 아래를 버림하여 시간 구하기
    const minutes = Math.floor((sum - hours) * 60); // 소수점 아래로 남은 분 계산

    completed_tasks.forEach((task) => {
      hist_sum += task.hoursperday;
    });
    const hist_hours = Math.floor(hist_sum); // 소수점 아래를 버림하여 시간 구하기
    const hist_minutes = Math.floor((hist_sum - hours) * 60); // 소수점 아래로 남은 분 계산

    // 제한속도 대비 치타속도
    setSpeedRate(sum);
    // 달린 속도
    if (hist_hours && hist_minutes === 0) {
      setHistorySpeedText("0min /Day");
    } else if (hist_hours === 0) {
      setHistorySpeedText(hist_minutes + "min/Day");
    } else if (hist_minutes === 0) {
      setHistorySpeedText(hist_hours + "h " + "/Day");
    } else {
      setHistorySpeedText(hist_hours + "h " + hist_minutes + "min /Day");
    }

    // 제한속도에 따른 헤더 텍스트
    setHeaderText(hours + "h " + minutes + "min");
  }, [incompleted_tasks, completed_tasks]);

  useEffect(() => {
    var incompleted_tasks_temp = goals.filter((goal) => !goal.is_finishdate);
    incompleted_tasks_temp = incompleted_tasks_temp.map((goal) => {
      var is_hidden = goal.is_hidden;
      var data = goal.goal;
      data.is_hidden = is_hidden;
      return data;
    });
    setincompleted_tasks(incompleted_tasks_temp);
    var finishdate_goals_temp = goals.filter((goal) => goal.is_finishdate);
    setfinishdate_goals(finishdate_goals_temp.map((goal) => goal.goal));
    setcompleted_tasks(histories.map((history) => history[0]));
  }, []);

  console.log("finishdate_goals!", finishdate_goals);
  console.log("incompleted_tasks!", incompleted_tasks);
  console.log("completed_taks!", completed_tasks);

  // 투데이 페이지용
  const showCompleteModal = (e) => {
    if (e.target === e.currentTarget) {
      setisCompleteModalOpen(!isCompleteModalOpen);
    }
  };

  const onCloseGoalDetailModal = (e) => {
    if (e.target === e.currentTarget) {
      setisGoalDetailModalOpen(false); // 모달을 닫을 때 false로 설정
    }
  };

  const openGoalDetailModal = (goalId) => {
    const selectedGoal = goals.find((goal) => goal.goal.id === goalId);
    setSelectedGoal(selectedGoal || null); // selectedGoal이 존재하지 않으면 null로 설정
    setisGoalDetailModalOpen(true);
  };
  // 목표의 진행률이 100%인 경우 true
  const isGoalCompleted = (goal) => {
    return goal.progress_rate === 100;
  };

  // 목표의 종료일이 현재보다 과거인 경우 true
  const isPastGoal = (goal) => {
    return new Date(goal.finish_at) < subDays(new Date(), 1);
  };

  // 선택한 날짜가 마감기한인 경우 true
  const isDueDateGoal = (goal) => {
    return goal.is_finishdate;
  };

  const isTaskCompleted = (task) => {
    var id = task.id;
    completed_tasks.forEach((goal) => {
      if (goal.id === id) {
        return true;
      }
    });
  };

  //+버튼을 눌렀을 때 실행되는 함수
  const plusDateAPI = async (goalId, date) => {
    try {
      await deleteImpossibleDate(goalId, { date: date });
    } catch (error) {
      console.log(error);
    }
    //incompleted task에서 id 가 일치하는 것이 있으면 is_hidden을 false로 바꿔주고 setincompleted_tasks
    var incompleted_tasks_temp = incompleted_tasks.map((task) => {
      if (task.id === goalId) {
        task.is_hidden = false;
        var task_temp = task.impossibledates_set.filter(
          (date) => date.date !== selectedDate
        );
        task.impossibledates_set = task_temp;
        var newhours =
          task.residual_time /
          (task.dates_task.length - task.impossibledates_set.length);
        console.log("the hours changed to", newhours, "from", task.hoursperday);
        console.log("chaged task!!", task);
      }
      return task;
    });
    setincompleted_tasks(incompleted_tasks_temp);
  };

  //- 버튼을 눌렀을 때 실행되는 함수
  const minusDateAPI = async (goalId, date) => {
    try {
      await createImpossibleDate(goalId, { date: date });
    } catch (error) {
      console.log(error);
    }
    var incompleted_tasks_temp = incompleted_tasks.map((task) => {
      if (task.id === goalId) {
        task.is_hidden = true;
        console.log(selectedDate);
        var newimpossibledate = { date: selectedDate };
        task.impossibledates_set.push(newimpossibledate);
        var newhours =
          task.residual_time /
          (task.dates_task.length - task.impossibledates_set.length);
        console.log("the hours changed to", newhours, "from", task.hoursperday);
        task.hoursperday = newhours;
        console.log("chaged task!", task);
      }
      return task;
    });
    setincompleted_tasks(incompleted_tasks_temp);
  };

  const getTaskCount = () => {
    const incompleted_task_count = incompleted_tasks.filter(
      (task) => task.is_hidden === false
    ).length;
    const completed_task_count = completed_tasks.filter(
      (task) => !isDueDateGoal(task)
    ).length;
    const goal_count = finishdate_goals.length;

    return incompleted_task_count + completed_task_count + goal_count;
  };

  const taskCount = getTaskCount();

  return (
    <>
      <s.calendarDetailRoot>
        <s.headerContainer>
          <CalendarDetailHeader selectedDate={parsedDate} />
          <HeaderMessage
            textOrange={
              !isPast(new Date(selectedDate))
                ? "[치타속도 " + Math.floor((speedRate / maxSpeed) * 100) + "%]"
                : historySpeedText
            }
            textGray={
              !isPast(new Date(selectedDate))
                ? headerText + " 달리기💨"
                : "속도로 달린 날"
            }
          />
        </s.headerContainer>
        <s.CalendarDetailLayout>
          <s.GoalCountWrapper>
            <s.GoalCount>
              {!isToday(new Date(selectedDate)) &&
              isPast(new Date(selectedDate))
                ? `${completed_tasks.length}건 완료`
                : isToday(new Date(selectedDate))
                ? `${taskCount}개의 목표, ${completed_tasks.length}건 완료`
                : `${taskCount}개의 목표`}
            </s.GoalCount>
          </s.GoalCountWrapper>
          <s.TasksContainer>
            {!isToday(new Date(selectedDate)) &&
            isPast(new Date(selectedDate)) &&
            completed_tasks.length === 0 ? (
              <s.EmptyMessage text="달린 목표가 없어요" />
            ) : (
              finishdate_goals.length +
                incompleted_tasks.length +
                completed_tasks.length ===
                0 && <s.EmptyMessage text="달릴 목표가 없어요" />
            )}
            {finishdate_goals.map((goal) => (
              <DueDateGoal
                key={goal.id}
                goal={goal}
                tag={goal.tag}
                isGoalCompleted={isGoalCompleted(goal)}
                isPastGoal={isPastGoal(goal)}
                openGoalDetailModal={() => openGoalDetailModal(goal.id)}
              />
            ))}
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
                !task.is_hidden &&
                !isDueDateGoal(task) &&
                !isTaskCompleted(task) && (
                  <Task
                    key={task.id}
                    goal={task}
                    tag={task.tag}
                    hidden={task.is_hidden}
                    openGoalDetailModal={() => openGoalDetailModal(task.id)}
                    plusDateAPI={plusDateAPI}
                    minusDateAPI={minusDateAPI}
                    currentdate={selectedDate}
                  />
                )
            )}
            {incompleted_tasks.map(
              (task) =>
                task.is_hidden &&
                !isDueDateGoal(task) &&
                !isTaskCompleted(task) && (
                  <Task
                    key={task.id}
                    goal={task}
                    tag={task.tag}
                    hidden={task.is_hidden}
                    openGoalDetailModal={() => openGoalDetailModal(task.id)}
                    plusDateAPI={plusDateAPI}
                    minusDateAPI={minusDateAPI}
                    currentdate={selectedDate}
                  />
                )
            )}
          </s.TasksContainer>
        </s.CalendarDetailLayout>
      </s.calendarDetailRoot>
      {isCompleteModalOpen && (
        <ModalOverlay onClick={showCompleteModal}>
          <TaskCompleteModal showCompleteModal={showCompleteModal} />
        </ModalOverlay>
      )}
      {isGoalDetailModalOpen && (
        <ModalOverlay onClick={onCloseGoalDetailModal}>
          <GoalDetialModalLight
            onCloseGoalDetailModal={onCloseGoalDetailModal}
            goal={selectedGoal}
          />
        </ModalOverlay>
      )}
    </>
  );
};

export default CalendarDetailPage;
