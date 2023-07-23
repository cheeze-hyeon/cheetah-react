import { useState } from "react";
import { format } from "date-fns";
import MinusIcon from "../../asset/images/minus.svg";
import PlusIcon from "../../asset/images/plus.svg";
import CompletedIcon from "../../asset/images/completed.svg";
import * as s from "./styled";

export const CompletedTask = ({ goal, tag, isGoalCompleted }) => {
  const [isCompleted, setIsCompleted] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const formattedDueDate = format(new Date(goal.finish_at), "M월 d일");
  const completeDate = format(new Date(goal.update_at), "M월 d일");

  const onClickTaskBtn = () => {
    !isCompleted ? setIsHidden(!isHidden) : setIsCompleted(!isCompleted);
    console.log(isHidden);
  };

  return (
    <s.TaskLayout>
      <s.TaskTopFrame>
        <s.TaskTLeftFrame $isHidden={isHidden}>
          <s.TaskTitle>{goal.title}</s.TaskTitle>
          <s.TaskInfo>
            <s.Tag color={tag.color}>{tag.title}</s.Tag>
            <s.Speed>~h ~m/day</s.Speed>
            <s.Progress>현재까지 {goal.progress_rate * 100}%</s.Progress>
          </s.TaskInfo>
        </s.TaskTLeftFrame>
        <s.TaskBtnContainer onClick={onClickTaskBtn}>
          <img alt="button" src={CompletedIcon} />
        </s.TaskBtnContainer>
      </s.TaskTopFrame>
      <s.DueDateWrapper>
        <s.DueDate $isHidden={isHidden}>
          {isGoalCompleted
            ? `${completeDate}에 완주완료`
            : `${formattedDueDate}까지 달리기`}
        </s.DueDate>
      </s.DueDateWrapper>
    </s.TaskLayout>
  );
};

export const Task = ({ goal, tag }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const formattedDueDate = format(new Date(goal.finish_at), "M월 d일");

  const onClickTaskBtn = () => {
    !isCompleted ? setIsHidden(!isHidden) : setIsCompleted(!isCompleted);
    console.log(isHidden);
  };

  return (
    <s.TaskLayout>
      <s.TaskTopFrame>
        <s.TaskTLeftFrame $isHidden={isHidden}>
          <s.TaskTitle>{goal.title}</s.TaskTitle>
          <s.TaskInfo>
            <s.Tag color={tag.color}>{tag.title}</s.Tag>
            <s.Speed>~h ~m/day</s.Speed>
            <s.Progress>현재까지 {goal.progress_rate * 100}%</s.Progress>
          </s.TaskInfo>
        </s.TaskTLeftFrame>
        <s.TaskBtnContainer onClick={onClickTaskBtn}>
          <img
            alt="button"
            src={isCompleted ? CompletedIcon : isHidden ? PlusIcon : MinusIcon}
          />
        </s.TaskBtnContainer>
      </s.TaskTopFrame>
      <s.DueDateWrapper>
        <s.DueDate $isHidden={isHidden}>
          {formattedDueDate}까지 달리기
        </s.DueDate>
      </s.DueDateWrapper>
    </s.TaskLayout>
  );
};

export const DueDateGoal = ({ goal, tag, isGoalCompleted, isPastGoal }) => {
  const [isHidden, setIsHidden] = useState(false);
  const completeDate = format(new Date(goal.update_at), "M월 d일");

  return (
    <s.TaskLayout>
      <s.TaskTopFrame>
        <s.TaskTLeftFrame $isHidden={isHidden}>
          <s.TaskTitle>{goal.title}</s.TaskTitle>
          <s.TaskInfo>
            <s.Tag color={tag.color}>{tag.title}</s.Tag>
            <s.Speed>~h ~m/day</s.Speed>
            <s.Progress>현재까지 {goal.progress_rate * 100}%</s.Progress>
          </s.TaskInfo>
        </s.TaskTLeftFrame>
        <s.TaskBtnContainer></s.TaskBtnContainer>
      </s.TaskTopFrame>
      <s.DueDateWrapper>
        <s.DueDate $isHidden={isHidden}>
          {isGoalCompleted
            ? `${completeDate}에 완주완료`
            : isPastGoal
            ? "완주기한 초과"
            : "끝까지 달리는 날"}
        </s.DueDate>
      </s.DueDateWrapper>
    </s.TaskLayout>
  );
};
