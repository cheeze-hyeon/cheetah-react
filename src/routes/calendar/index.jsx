import { useState, React } from "react";
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
  TextBtnSmall,
  TwoButton,
  LargeButtonActive,
} from "../../components/button/styled";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Datepicker, Button, Page } from "@mobiscroll/react";

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

export const CalendarCells = ({ currentMonth, selectedDate, goals, tags }) => {
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
      const getEventsForDay = (day) => {
        return goals.filter((goal) => {
          const goalDate = new Date(goal.finish_at);
          return isSameDay(goalDate, day); // 날짜만 비교
        });
      };

      const getTagForDay = (tags, goal) => {
        return tags.find((tag) => tag.id === goal.tag_id);
      };

      const eventsForDay = getEventsForDay(day);
      const threeEvents = eventsForDay.slice(0, 3);

      days.push(
        <s.dateContainer key={day} onClick={() => onDateClick(cloneDay)}>
          <s.EventsWrapper>
            <s.DateWrapper>
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
            </s.DateWrapper>
          </s.EventsWrapper>
          {threeEvents.map((goal) => (
            <s.EventElement
              key={goal.id}
              title={goal.title}
              color={getTagForDay(tags, goal).color}
            />
          ))}
          {eventsForDay.length > 3 ? (
            <s.MoreEventText>+{eventsForDay.length - 3}</s.MoreEventText>
          ) : (
            <s.MoreEventText></s.MoreEventText>
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
  tags,
}) => {
  const [selectedTagId, setSelectedTagId] = useState(null);
  const [selectedDays, setSelectedDays] = useState({
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: true,
    sun: true,
  });

  const handleTagClick = (tagId) => {
    setSelectedTagId(tagId);
    console.log(tagId);
  };

  const handleDayClick = (dayId) => {
    setSelectedDays((prevSelectedDays) => ({
      ...prevSelectedDays,
      [dayId]: !prevSelectedDays[dayId],
    }));
  };

  const isSelected = (tag) => {
    return selectedTagId === tag.id;
  };

  const [openPicker, setOpenPicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const show = () => {
    setOpenPicker(true);
  };

  const onClose = () => {
    setOpenPicker(false);
  };

  const boxInputProps = {
    className: "w-full",
    inputStyle: "box",
    placeholder: "기간 선택하기",
  };
  const boxInputProps2 = {
    className: "w-full",
    inputStyle: "box",
    placeholder: "시간 선택하기",
  };

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
                  {tags.map((tag) => (
                    <TagDefault
                      key={tag.id}
                      color={tag.color}
                      text={tag.title}
                      isSelected={isSelected(tag)}
                      onClick={() => handleTagClick(tag.id)}
                    />
                  ))}
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
                <s.DatepickerWrapper>
                  <Datepicker
                    controls={["calendar"]}
                    select="range"
                    inputProps={boxInputProps}
                    className="w-5/6"
                  />
                </s.DatepickerWrapper>
              </FieldWithLabel>
              <FieldWithLabel label="달릴 요일">
                <s.DaysWrapper>
                  <TagDefault
                    key="mon"
                    color="var(--light-gray)"
                    text="월"
                    isSelected={selectedDays["mon"]}
                    onClick={() => handleDayClick("mon")}
                  />
                  <TagDefault
                    key="tue"
                    color="var(--light-gray)"
                    text="화"
                    isSelected={selectedDays["tue"]}
                    onClick={() => handleDayClick("tue")}
                  />
                  <TagDefault
                    key="wed"
                    color="var(--light-gray)"
                    text="수"
                    isSelected={selectedDays["wed"]}
                    onClick={() => handleDayClick("wed")}
                  />
                  <TagDefault
                    key="thu"
                    color="var(--light-gray)"
                    text="목"
                    isSelected={selectedDays["thu"]}
                    onClick={() => handleDayClick("thu")}
                  />
                  <TagDefault
                    key="fri"
                    color="var(--light-gray)"
                    text="금"
                    isSelected={selectedDays["fri"]}
                    onClick={() => handleDayClick("fri")}
                  />
                  <TagDefault
                    key="sat"
                    color="var(--light-gray)"
                    text="토"
                    isSelected={selectedDays["sat"]}
                    onClick={() => handleDayClick("sat")}
                  />
                  <TagDefault
                    key="sun"
                    color="var(--light-gray)"
                    text="일"
                    isSelected={selectedDays["sun"]}
                    onClick={() => handleDayClick("sun")}
                  />
                </s.DaysWrapper>
              </FieldWithLabel>
              <FieldWithLabel label="예상 소요시간">
                <s.DatepickerWrapper>
                  <Datepicker
                    controls={["time"]}
                    timeFormat="HH:mm"
                    headerText="hour minutes"
                    inputProps={
                      // label: "Hour, Min",
                      boxInputProps2
                    }
                  />
                </s.DatepickerWrapper>
                {/* <InputTimeField /> */}
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
