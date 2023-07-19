import { useState } from "react";
import { addMonths, subMonths } from "date-fns";

import * as s from "./styled";
import * as t from "../../components/text/styled";

import { CalendarTabBar } from "../../components/tabBar";
import {
  SpeedButton,
  FloatingBtn,
  CalendarHeader,
  CalendarDays,
  CalendarCells,
} from "./index";

const CalendarMainPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

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
        />
        <CalendarTabBar />
        <FloatingBtn />
      </s.calendarMainRoot>
    </>
  );
};

export default CalendarMainPage;
