import { useState, useEffect, React } from "react";
import back from "../../asset/images/back.png";
import forward from "../../asset/images/forward.png";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isToday,
} from "date-fns";
import { isSameMonth, isSameDay, addDays } from "date-fns";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import * as s from "./styled";
import * as t from "../../components/text/styled";
import isPast from "date-fns/isPast";

import "@mobiscroll/react/dist/css/mobiscroll.min.css";

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
  speedwithDate,
  speedhistorywithDate,
  isSpeedOff,
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
    if (historyindate.length === 0) {
      historyindate = [[formattedDate, []]];
    }
    console.log(
      "dateclick! goalsindate: ",
      goalsindate,
      "historyindate: ",
      historyindate
    );

    var color_speed = speedwithDate.filter((speed) => {
      return speed !== undefined && speed[0] === formattedDate;
    });
    if (color_speed.length > 0) color_speed = color_speed[0][1];

    var color_history = speedhistorywithDate.filter((speed) => {
      return speed != undefined && speed[0] === formattedDate;
    });

    if (color_history.length > 0) color_history = color_history[0][1];
    console.log("color_speed: ", color_speed, "color_history: ", color_history);
    navigate(`/calendar/${formattedDate}`, {
      state: {
        goalsindate: goalsindate,
        historyindate: historyindate,
        color_speed: color_speed,
        color_history: color_history,
      },
    });
  };

  const getSpeedColor = (day) => {
    const formattedDate = format(new Date(day), "yyyy-MM-dd");

    var color_speed = speedwithDate.filter((speed) => {
      return speed !== undefined && speed[0] === formattedDate;
    });
    if (color_speed.length > 0) color_speed = color_speed[0][1];

    var color_history = speedhistorywithDate.filter((speed) => {
      return speed !== undefined && speed[0] === formattedDate;
    });

    if (color_history.length > 0) color_history = color_history[0][1];

    const speedOfDate =
      isPast(day) && !isToday(day) ? color_history : color_speed;

    console.log(speedOfDate);
    return speedOfDate;
  };

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;
      const isSunday = i === 0; // 첫 번째 요일이 일요일이고 이번 달인지 확인
      const isCurrentMonth = isSameMonth(day, monthStart);
      const getEventsForDay = (day) => {
        return goalsList.filter(
          (goal) => goal.finish_at === format(day, "yyyy-MM-dd")
        );
      };
      const eventsForDay = getEventsForDay(day);
      const threeEvents = eventsForDay.slice(0, 3);

      days.push(
        <s.DateContainer
          key={day}
          onClick={() => onDateClick(cloneDay)}
          $isPastTask={isPast(day) && !isToday(day)}
          $colorSpeed={getSpeedColor(day)}
          $isSpeedOff={isSpeedOff}
          $isCurrentMonth={isCurrentMonth}
        >
          <s.EventsWrapper>
            <s.DateWrapper>
              <s.IconWrapper>
                {getSpeedColor(day) === 6 && !isSpeedOff && "🔥"}
              </s.IconWrapper>
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
              color={goal.tag.color}
              $isCurrentMonth={isCurrentMonth}
            />
          ))}
          {eventsForDay.length > 3 ? (
            <s.MoreEventText>+{eventsForDay.length - 3}</s.MoreEventText>
          ) : (
            <s.MoreEventText></s.MoreEventText>
          )}
        </s.DateContainer>
      );
      day = addDays(day, 1);
    }
    rows.push(<s.week key={day}>{days}</s.week>);
    days = [];
  }
  return <s.month>{rows}</s.month>;
};
