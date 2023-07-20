import { useState } from "react";
import back from "../../asset/images/back.png";
import forward from "../../asset/images/forward.png";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays } from "date-fns";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import * as s from "./styled";
import * as t from "../../components/text/styled";
import { HeaderModal } from "../../components/header/styled";
import {
  FieldWithLabel,
  InputTextFieldActive,
  TodoWithCloseBtn,
} from "../../components/input/styled";
import {
  TagDefault,
  TagSelect,
  TextBtnSmall,
  TwoButton,
} from "../../components/button/styled";

export const SpeedButton = () => {
  const [isOff, setIsOff] = useState(true);

  return (
    <s.switchFrame onClick={() => setIsOff(!isOff)}>
      <s.track $isOff={isOff} />
      <s.onOffCircle $isOff={isOff}>
        <s.onOffText $isOff={isOff}>{isOff ? "OFF" : "ON"}</s.onOffText>
      </s.onOffCircle>
    </s.switchFrame>
  );
};

export const CalendarHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <s.calendarHeader>
      <s.headerIcon src={back} alt="back" onClick={prevMonth} />
      <s.headerTitle>
        <t.TitleNormal>{format(currentMonth, "M")}월,</t.TitleNormal>
        <t.TitleNormal>{format(currentMonth, "yyyy")}</t.TitleNormal>
      </s.headerTitle>
      <s.headerIcon src={forward} alt="forward" onClick={nextMonth} />
    </s.calendarHeader>
  );
};

export const CalendarDays = () => {
  const days = [];
  const date = ["일", "월", "화", "수", "목", "금", "토"];

  for (let i = 0; i < 7; i++) {
    const isSunday = i === 0; // 첫 번째 요일이 일요일인지 확인

    days.push(
      <s.day key={i} $isSunday={isSunday}>
        {date[i]}
      </s.day>
    );
  }

  return <s.daysOfWeek>{days}</s.daysOfWeek>;
};

export const CalendarCells = ({ currentMonth, selectedDate }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const navigate = useNavigate();

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  const onDateClick = (day) => {
    const formattedDate = format(day, "yyyy-MM-dd");
    navigate(`/calendar/${formattedDate}`);
  };

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;
      const isSunday = i === 0; // 첫 번째 요일이 일요일이고 이번 달인지 확인
      const isCurrentMonth = isSameMonth(day, monthStart);

      days.push(
        <s.dateContainer key={day} onClick={() => onDateClick(cloneDay)}>
          {isSameDay(day, selectedDate) ? (
            <s.dateToday>{formattedDate}</s.dateToday>
          ) : (
            <s.dateNotToday
              $isSunday={isSunday}
              $isCurrentMonth={isCurrentMonth}
            >
              {formattedDate}
            </s.dateNotToday>
          )}
        </s.dateContainer>
      );
      day = addDays(day, 1);
    }
    rows.push(<s.week key={day}>{days}</s.week>);
    days = [];
  }
  return <s.month>{rows}</s.month>;
};

export const GoalCreateModal = ({ clickBtn }) => {
  return (
    <s.GoalCreateModalContainer>
      <s.GoalCreateModalElementContainer>
        <HeaderModal text="목표추가" clickBtn={clickBtn} />
        <s.InputContainer>
          <FieldWithLabel label="태그 선택">
            <s.TagsWrapper>
              <TagSelect text="선택한태그" />
              <TagDefault text="태그2" />
              <TagDefault text="태그3" />
              <TagDefault text="태그3" />
              <TagDefault text="태그3" />
              <TagDefault text="태그3" />
            </s.TagsWrapper>
          </FieldWithLabel>
          <FieldWithLabel label="일정 제목">
            <InputTextFieldActive placeholder="제목 입력" />
          </FieldWithLabel>
          <FieldWithLabel label="하위 투두">
            <s.TodosWrapper>
              <TodoWithCloseBtn defaultvalue="투두1" />
              <TodoWithCloseBtn defaultvalue="투두1" />
              <TodoWithCloseBtn defaultvalue="투두1" />
              <TextBtnSmall text="+ 투두 추가하기" />
            </s.TodosWrapper>
          </FieldWithLabel>
        </s.InputContainer>
        <TwoButton text1="완료하기" text2="캘린더에도 추가하기" />
      </s.GoalCreateModalElementContainer>
    </s.GoalCreateModalContainer>
  );
};
