import { useState } from "react";
import { useParams } from "react-router-dom";
import { CalendarDetailHeader, HeaderMessage, TaskCompleteModal } from ".";
import { Task } from "./Task";
import { parse, isSameDay } from "date-fns"; // parse 함수를 import 합니다.
import * as s from "./styled";
import { ModalOverlay } from "../../components/modal/styled";
import goals from "../../data/goals";
import tags from "../../data/tags";
import dailyHourOfGoals from "../../data/dailyHourOfGoals";
import { CompletedTask } from "./Task";
import subDays from "date-fns/subDays";

const CalendarDetailPage = () => {
  const { selectedDate } = useParams();
  const parsedDate = parse(selectedDate, "yyyy-MM-d", new Date());
  const [isCompleteModalOpen, setisCompleteModalOpen] = useState(false);
  const today = new Date();

  // 투데이 페이지용
  const showCompleteModal = (e) => {
    if (e.target === e.currentTarget) {
      setisCompleteModalOpen(!isCompleteModalOpen);
    }
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
    return goal.progress_rate >= 100;
  };

  // 선택한 날짜가 마감기한인 경우 true
  const isDueDateGoal = (goal, selectedDate) => {
    const goalDueDate = new Date(goal.finish_at);
    return isSameDay(goalDueDate, selectedDate);
  };

  // 선택한 날짜에 대한 미완료 과제를 반환하는 함수
  const filterGoalList = () => {
    const filteredGoals = goals.filter((goal) => {
      const calendarDate = new Date(selectedDate);
      const startDate = new Date(goal.start_at);
      const finishDate = new Date(goal.finish_at);
      const currentDate = new Date();

      if (isCurrentOrFuture(goal.start_at)) {
        return calendarDate >= startDate && calendarDate <= finishDate;
      } else {
        return (
          calendarDate >= subDays(currentDate, 1) && calendarDate <= finishDate
        );
      }
    });
    return filteredGoals;
  };

  // 과제에 대한 완료 여부를 판단하는 함수
  const isTaskNotCompleted = goals.some((goal) => {
    const calendarDate = new Date(selectedDate);
    const foundData = dailyHourOfGoals.find(
      (data) =>
        isSameDay(calendarDate, new Date(data.date)) && data.goal === goal.id
    );
    return !foundData; // 일치하는 데이터가 없으면 true를 반환, 있으면 false를 반환
  });

  // 선택한 날짜에 대한 완료 과제를 반환하는 함수
  const isGoalInDailyHourOfGoals = (dailyHourOfGoals) => {
    const calendarDate = new Date(selectedDate);
    const completedGoals = goals.filter((goal) => {
      const foundData = dailyHourOfGoals.find((data) => {
        const goalDate = new Date(data.date);
        return isSameDay(calendarDate, goalDate) && data.goal === goal.id;
      });
      return !!foundData; // Return true if a matching data was found, otherwise false.
    });

    return completedGoals;
  };

  // 선택한 날짜에 대한 미완료 목표 리스트를 반환
  const isNotCompletedGoals = (goals) => {
    const notCompletedGoals = goals.filter((goal) => !isGoalCompleted(goal));
    return notCompletedGoals;
  };

  // 개별 목표에 대한 태그를 반환
  const getTagOfGoal = (tags, goal) => {
    return tags.find((tag) => tag.id === goal.tag_id);
  };

  // 선택한 날짜에 해당하는 모든 Task, Goal 리스트
  const filteredGoalList = filterGoalList();

  // 선택한 날짜에 해당하는 모든 완료 과제
  const completedTaskList = isGoalInDailyHourOfGoals(dailyHourOfGoals);

  return (
    <>
      <s.calendarDetailRoot>
        <s.headerContainer>
          <CalendarDetailHeader selectedDate={parsedDate} />
          <HeaderMessage />
        </s.headerContainer>
        <s.Container>
          <s.textContainer>
            <s.goalCount>{filteredGoalList.length}개의 목표</s.goalCount>
          </s.textContainer>
          <s.tasksContainer>
            {completedTaskList.map((task) => (
              <CompletedTask
                key={task.id}
                goal={task}
                tag={getTagOfGoal(tags, task)}
              />
            ))}
            {filteredGoalList.map((task) =>
              isTaskNotCompleted ? (
                <Task
                  key={task.id}
                  goal={task}
                  tag={getTagOfGoal(tags, task)}
                />
              ) : (
                <div key={task.id}></div>
              )
            )}
          </s.tasksContainer>
        </s.Container>
      </s.calendarDetailRoot>
      {isCompleteModalOpen && (
        <ModalOverlay onClick={showCompleteModal}>
          <TaskCompleteModal showCompleteModal={showCompleteModal} />
        </ModalOverlay>
      )}
    </>
  );
};

export default CalendarDetailPage;
