import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  CalendarDetailHeader,
  HeaderMessage,
  Task,
  TaskCompleteModal,
} from ".";
import { parse } from "date-fns"; // parse 함수를 import 합니다.
import * as s from "./styled";
import { ModalOverlay } from "../../components/modal/styled";
import { getGoalsindate } from "../../apis/api_calendar";

const CalendarDetailPage = () => {
  const location = useLocation();
  const goals = location.state.goalsindate;
  const histories = location.state.historyindate[0][1];
  const { selectedDate } = useParams();
  const parsedDate = parse(selectedDate, "yyyy-MM-dd", new Date());
  const [isCompleteModalOpen, setisCompleteModalOpen] = useState(true);
  console.log("date", goals);
  console.log("history", histories);

  const showCompleteModal = (e) => {
    if (e.target === e.currentTarget) {
      setisCompleteModalOpen(!isCompleteModalOpen);
    }
  };

  return (
    <>
      <s.calendarDetailRoot>
        <s.headerContainer>
          <CalendarDetailHeader selectedDate={parsedDate} />
          <HeaderMessage />
        </s.headerContainer>
        <s.Container>
          <s.textContainer>
            <s.goalCount>4개의 목표</s.goalCount>
          </s.textContainer>
          <s.tasksContainer>
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
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
