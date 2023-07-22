import { useEffect, useState } from "react";
import { addMonths, subMonths, format } from "date-fns";

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
import {
  getGoalsinmonth,
  getHistoryinmonth,
  createGoal,
  createGoalwithCalendar,
} from "../../apis/api_calendar";

const CalendarMainPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isGoalCreateModalOpen, setisGoalCreateModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [goalsList, setGoalsList] = useState([]);
  const [speedwithDate, setSpeedwithDate] = useState([]);
  const [historywithDate, setHistorywithDate] = useState([]); //e.g [[date,history],[date,history]...

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

  function addOneday(date = new Date()) {
    date.setDate(date.getDate() + 1);
    return date;
  }
  function dateToString(date = new Date()) {
    var date_date = date.getDate();
    var date_month = date.getMonth() + 1;
    var date_year = date.getFullYear();
    return date_year + "-" + date_month + "-" + date_date;
  }

  // //초기 세팅
  // useEffect(() => {
  //   //----------API를 이용하여 캘린더에 표시할 goalsList를 불러온 후 가공한다----------------//
  //   const getGoalsinmonthAPI = async () => {
  //     const goalsRaw = await getGoalsinmonth(format(currentMonth, "yyyy-MM"));
  //     const goalsProcessed = goalsRaw.map((goal) => {
  //       var id = goal.id;
  //       var title = goal.title;
  //       var finish_at = goal.finish_at;
  //       var residual_time = goal.residual_time;
  //       var start_at = goal.start_at; //e.g "2023-07-18"
  //       var impossibledates_set = goal.impossibledates_set; //e.g ["2023-07-21","2023-07-22"]
  //       var today = new Date();
  //       var today_string = format(today, "yyyy-MM-dd");

  //       var dates_todo_rawset = [];
  //       if (today_string < start_at) {
  //         var begin = start_at;
  //         while (dateToString(begin) <= finish_at) {
  //           dates_todo_rawset.push(dateToString(begin));
  //           begin = addOneday(begin);
  //         }
  //       } else if (today_string <= finish_at && today_string >= start_at) {
  //         var begin = today;
  //         while (dateToString(begin) <= finish_at) {
  //           dates_todo_rawset.push(dateToString(begin));
  //           begin = addOneday(begin);
  //         }
  //       }
  //       var dates_todo = dates_todo_rawset.filter(
  //         (date) => impossibledates_set.includes(date) === false
  //       );
  //       var hoursperday = residual_time / dates_todo.length;
  //       return {
  //         id: goal.id,
  //         title: goal.title,
  //         hoursperday: hoursperday,
  //         dates_todo: dates_todo,
  //         finish_at: goal.finish_at,
  //       };
  //     });
  //     setGoalsList(goalsProcessed);
  //     return goalsProcessed;
  //   };
  //   var goalsList_temp = getGoalsinmonthAPI();

  //   ///------------------history API를 호출한 후 historywithDate를 업데이트 한다. -------------------//
  //   const getHistoryinmonthAPI = async () => {
  //     const historyRaw = await getHistoryinmonth(
  //       format(currentMonth, "yyyy-MM")
  //     );
  //     const historyProcessed = historyRaw.map((history) => {
  //       var date = history.date;
  //       var hours = history.hours;
  //       return [date, hours];
  //     });
  //     setHistorywithDate(historyProcessed);
  //   };
  //   getHistoryinmonthAPI();

  //   //--------------------불러온 goalsList를 바탕으로 speedwithDate를 업데이트 한다. ---------------------//
  //   let begin = currentMonth;
  //   begin = begin.setDate(1);
  //   let end = currentMonth;
  //   end = end.setDate(31);
  //   var speedwithDate_temp = [];
  //   while (begin < end && begin.getMonth() === end.getMonth()) {
  //     // 30일, 28일까지만 있는 달 처리
  //     speedwithDate_temp = speedwithDate_temp.push([begin, 0]);
  //     begin = addOneday(begin);
  //   }

  //   setSpeedwithDate(() =>
  //     speedwithDate_temp.map((date) => {
  //       var date_string = format(date[0], "yyyy-MM-dd");
  //       var hours = 0;
  //       goalsList_temp.forEach((goal) => {
  //         if (goal.dates_todo.includes(date_string)) {
  //           hours += goal.hoursperday;
  //         }
  //       });
  //       return [date[0], hours];
  //     })
  //   );
  // }, [currentMonth]);

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
          ></GoalCreateModal>
        </ModalOverlay>
      )}
    </>
  );
};

export default CalendarMainPage;
