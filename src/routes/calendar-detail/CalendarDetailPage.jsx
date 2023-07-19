import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  CalendarDetailHeader,
  HeaderMessage,
  Task,
  TaskCompleteModal,
} from ".";
import { parse } from "date-fns"; // parse 함수를 import 합니다.
import * as s from "./styled";

const CalendarDetailPage = () => {
  const { selectedDate } = useParams();
  const parsedDate = parse(selectedDate, "yyyy-MM-dd", new Date());
  const [isCompleteModalOpen, setisCompleteModalOpen] = useState(true);

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
        <s.modalOverlay onClick={showCompleteModal}>
          <TaskCompleteModal showCompleteModal={showCompleteModal} />
        </s.modalOverlay>
      )}
    </>
  );
};

export default CalendarDetailPage;
