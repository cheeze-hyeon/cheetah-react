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
  TwoInputDateField,
  InputTimeField,
} from "../../components/input/styled";
import {
  TagDefault,
  TagSelect,
  TextBtnSmall,
  TwoButton,
  LargeButtonActive,
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

export const CalendarCells = ({
  currentMonth,
  selectedDate,
  goalsList,
  historywithDate,
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const navigate = useNavigate();
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";
  //onDateClick에는 선택한 day를 기반으로 finish_at이 day이면 무조건 포함하고 그렇지 않으면 impossible date에 해당하는 경우 true로 아닌 경우 false로 반환하도록 한다.
  const onDateClick = (day) => {
    const formattedDate = format(day, "yyyy-MM-dd");
    var goalsindate = goalsList.filter((goal) =>
      goal.dates_task.includes(formattedDate)
    );
    goalsindate = goalsindate.map((goal) => {
      var is_hidden = false;
      var is_finishdate = false;
      goal.impossibledates_set.forEach((element) => {
        if (element.date === formattedDate) {
          is_hidden = true;
        }
      });
      if (goal.finish_at === formattedDate) {
        is_finishdate = true;
      }
      return {
        goal: goal,
        is_hidden: is_hidden,
        is_finishdate: is_finishdate,
      };
    });
    var historyindate = historywithDate.filter(
      (history) => history[0] === formattedDate
    );
    console.log(
      "dateclick! goalsindate: ",
      goalsindate,
      "historyindate: ",
      historyindate
    );

    navigate(`/calendar/${formattedDate}`, {
      state: { goalsindate: goalsindate, historyindate: historyindate },
    });
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

export const GoalCreateModal = ({
  clickBtn,
  step,
  to1,
  to2,
  clickCompleteBtn,
}) => {
  return (
    <s.GoalCreateModalContainer>
      <s.GoalCreateModalElementContainer>
        {step === 1 ? (
          <HeaderModal text="목표추가" clickBtn={clickBtn} />
        ) : (
          <HeaderModal text="캘린더에 추가" clickBtn={clickBtn} />
        )}
        <s.InputContainer>
          {step === 1 ? (
            <>
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
            </>
          ) : (
            <>
              <FieldWithLabel label="시작일/종료일">
                <TwoInputDateField />
              </FieldWithLabel>
              <FieldWithLabel label="달릴 요일">
                <s.RunDayWrapper>
                  <TagDefault text="월" />
                  <TagDefault text="화" />
                  <TagDefault text="수" />
                  <TagDefault text="목" />
                  <TagDefault text="금" />
                  <TagDefault text="토" />
                  <TagDefault text="일" />
                </s.RunDayWrapper>
              </FieldWithLabel>
              <FieldWithLabel label="예상 소요시간">
                <InputTimeField />
              </FieldWithLabel>
            </>
          )}
        </s.InputContainer>
        {step === 1 ? (
          <TwoButton
            text1="완료하기"
            text2="캘린더에도 추가하기"
            to1={to1}
            to2={to2}
          />
        ) : (
          <LargeButtonActive text="완료하기" to={clickCompleteBtn} />
        )}
      </s.GoalCreateModalElementContainer>
    </s.GoalCreateModalContainer>
  );
};
