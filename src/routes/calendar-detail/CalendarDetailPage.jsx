import { getGoalsindate } from "../../apis/api_calendar";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { CalendarDetailHeader, HeaderMessage, TaskCompleteModal } from ".";
import { Task, CompletedTask, DueDateGoal } from "./Task";
import { parse, isSameDay, isPast, isToday, startOfDay } from "date-fns"; // parse 함수를 import 합니다.
import * as s from "./styled";
import { ModalOverlay } from "../../components/modal/styled";
//import tags from "../../data/tags";
import dailyHourOfGoals from "../../data/dailyHourOfGoals";
import subDays from "date-fns/subDays";
import { GoalDetialModalLight } from "./goal-detail/styled";
//import todos from "../../data/todos";

const CalendarDetailPage = () => {
  const location = useLocation();
  const goals = location.state.goalsindate;
  const histories = location.state.historyindate[0][1];
  const { selectedDate } = useParams();
  const parsedDate = parse(selectedDate, "yyyy-MM-d", new Date());
  const [isCompleteModalOpen, setisCompleteModalOpen] = useState(false);
  const [isGoalDetailModalOpen, setisGoalDetailModalOpen] = useState(false); // 초기에는 false로 설정
  const [selectedGoal, setSelectedGoal] = useState(null);
  console.log("date", goals);
  console.log("history", histories);

  //3개의 종류로 구분. incompleted_tasks, completed_tasks, finishdate_goals
  var incompleted_tasks = goals.filter((goal) => !goal.is_finishdate);
  incompleted_tasks = incompleted_tasks.map((goal) => {
    var is_hidden = goal.is_hidden;
    var data = goal.goal;
    data.is_hidden = is_hidden;
    return data;
  });
  var finishdate_goals = goals.filter((goal) => goal.is_finishdate);
  finishdate_goals = finishdate_goals.map((goal) => goal.goal);
  var completed_tasks = histories.map((history) => history[0]);

  console.log("finishdate_goals", finishdate_goals);
  console.log("incompleted_tasks", incompleted_tasks);
  console.log("completed_taks", completed_tasks);

  // 투데이 페이지용
  const showCompleteModal = (e) => {
    if (e.target === e.currentTarget) {
      setisCompleteModalOpen(!isCompleteModalOpen);
    }
  };
  const handleGoalClick = (goalId) => {
    const selectedGoal = goals.find((goal) => goal.id === goalId);
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

  // 목표의 시작일이 오늘보다 현재 혹은 미래인 경우 true
  const isCurrentOrFuture = (startDate) => {
    const today = new Date();
    const due = new Date(startDate);
    if (isSameDay(today, due)) {
      return true;
    } else if (today < due) {
      return true;
    } else {
      return false;
    }
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

  // 선택한 날짜에 대한 완료 과제를 반환하는 함수

  return (
    <>
      <s.calendarDetailRoot>
        <s.headerContainer>
          <CalendarDetailHeader selectedDate={parsedDate} />
          <HeaderMessage />
        </s.headerContainer>
        <s.CalendarDetailLayout>
          <s.GoalCountWrapper>
            <s.GoalCount>
              {isPast(new Date(selectedDate))
                ? `${completed_tasks.length}건 완료`
                : isToday(new Date(selectedDate))
                ? `${incompleted_tasks.length}개의 목표, ${completed_tasks.length}건 완료`
                : `${incompleted_tasks.length}개의 목표`}
            </s.GoalCount>
          </s.GoalCountWrapper>
          <s.TasksContainer>
            {isPast(new Date(selectedDate)) && completed_tasks.length === 0 ? (
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
                !isDueDateGoal(task) &&
                !isTaskCompleted(task) && (
                  <Task
                    key={task.id}
                    goal={task}
                    tag={task.tag}
                    hidden={task.is_hidden}
                    openGoalDetailModal={() => openGoalDetailModal(task.id)}
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
            todos={selectedGoal.todos}
          />
        </ModalOverlay>
      )}
    </>
  );
};

export default CalendarDetailPage;
