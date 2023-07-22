import { useState } from "react";
import { addMonths, subMonths } from "date-fns";

import * as s from "./styled";
import * as t from "../../components/text/styled";

import { CalendarTabBar } from "../../components/tabBar";
import {
  SpeedButton,
  CalendarHeader,
  CalendarDays,
  CalendarCells,
} from "./index";
import { ModalOverlay } from "../../components/modal/styled";
import { GoalCreateModal } from ".";
import goals from "../../data/goals";
import tags from "../../data/tags";

const CalendarMainPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isGoalCreateModalOpen, setisGoalCreateModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);

  const showGoalCreateModal = (e) => {
    if (e.target === e.currentTarget) {
      setisGoalCreateModalOpen(!isGoalCreateModalOpen);
      setModalStep(1);
    }
    console.log(isGoalCreateModalOpen);
  };

  const addModalStep = () => {
    setModalStep(2);
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <>
      <s.calendarMainRoot>
        <s.headerContainer>
          <CalendarHeader
            currentMonth={currentMonth}
            prevMonth={prevMonth}
            nextMonth={nextMonth}
          />
          <s.buttonContainer>
            <t.TextNormal>치타 속도 보기 (hour/day)</t.TextNormal>
            <SpeedButton />
          </s.buttonContainer>
          <CalendarDays />
        </s.headerContainer>
        <CalendarCells
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          goals={goals}
          tags={tags}
        />
        <CalendarTabBar />
        <s.floatingBtnContainer onClick={showGoalCreateModal} />
      </s.calendarMainRoot>
      {isGoalCreateModalOpen && (
        <ModalOverlay onClick={showGoalCreateModal}>
          <GoalCreateModal
            to1={showGoalCreateModal}
            to2={addModalStep}
            step={modalStep}
            clickBtn={showGoalCreateModal}
            clickCompleteBtn={showGoalCreateModal}
            tags={tags}
          />
        </ModalOverlay>
      )}
    </>
  );
};

export default CalendarMainPage;
