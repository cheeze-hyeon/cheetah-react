import { useEffect, useState } from "react";
import { addMonths, subMonths, format, set } from "date-fns";

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
  getGoalsindate,
  getGoaldetail,
  getAllGoals,
  getHistoryinmonth,
  createGoal,
  createGoalwithCalendar,
} from "../../apis/api_calendar";

//캘린더 작업을 위한 임시//
import axios from "axios";
import { getCookie } from "../../utils/cookie";
import { type } from "@testing-library/user-event/dist/type";
import { fi } from "date-fns/locale";
import { create } from "@mui/material/styles/createTransitions";

const CalendarMainPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isGoalCreateModalOpen, setisGoalCreateModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [goalsList, setGoalsList] = useState([]); //캘린더에 표시할 processed된 목표들
  const [goalsListwithImpossibledates, setGoalsListwithImpossibledates] =
    useState([]); //캘린더 디테일에 표시할 impossible dates를 포함한 목표들
  const [speedwithDate, setSpeedwithDate] = useState([]);
  const [speedhistorywithDate, setSpeedhistorywithDate] = useState([]);
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
    setSpeedwithDate([]);
    setHistorywithDate([]);
    setGoalsList([]);
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
    setSpeedwithDate([]);
    setHistorywithDate([]);
    setGoalsList([]);
  };

  const getGoalsinmonthAPI = async () => {
    const goalsRaw = await getGoalsinmonth(format(currentMonth, "yyyy-MM"));
    console.log("goalsRaw", goalsRaw);
    const goalsProcessed = goalsRaw.map((goal) => {
      var id = goal.id;
      var title = goal.title;
      var finish_at = goal.finish_at;
      var residual_time = goal.residual_time;
      var start_at = goal.start_at; //e.g "2023-07-18"
      var progress_rate = goal.progress_rate;
      var update_at = goal.update_at;
      var impossibledates_set = goal.impossibledates_set; //e.g ["2023-07-21","2023-07-22"]
      var today = new Date();
      var today_string = format(today, "yyyy-MM-dd");

      if (progress_rate === 100) {
        return {
          id: id,
          title: title,
          hoursperday: 0,
          dates_todo: [],
          finish_at: finish_at,
          update_at: update_at,
          progress_rate: 100,
        };
      }

      var dates_todo_rawset = [];
      if (today_string < start_at) {
        var begin_date = new Date(start_at);
        begin_date = format(begin_date, "yyyy-MM-dd");
        while (begin_date <= finish_at) {
          dates_todo_rawset.push(begin_date);
          begin_date = new Date(begin_date);
          begin_date.setDate(begin_date.getDate() + 1);
          begin_date = format(begin_date, "yyyy-MM-dd");
        }
      } else if (today_string <= finish_at && today_string >= start_at) {
        today = format(today, "yyyy-MM-dd");
        while (today <= finish_at) {
          dates_todo_rawset.push(today);
          today = new Date(today);
          today.setDate(today.getDate() + 1);
          today = format(today, "yyyy-MM-dd");
        }
      }
      var dates_todo = dates_todo_rawset.filter((date) => {
        for (var i = 0; i < impossibledates_set.length; i++) {
          console.log("try");
          if (date === impossibledates_set[i]["date"]) {
            console.log("impossible date", date);
            return false;
          }
        }
        return true;
      });
      var hoursperday = residual_time / dates_todo.length;
      return {
        id: id,
        title: title,
        hoursperday: hoursperday,
        dates_todo: dates_todo,
        finish_at: finish_at,
        update_at: update_at,
        progress_rate: progress_rate,
      };
    });
    setGoalsList(goalsProcessed);
    console.log("goal Processed", goalsProcessed);
  };

  const getGoalswithImpossibledatesinmonthAPI = async () => {
    const goalsRaw = await getGoalsinmonth(format(currentMonth, "yyyy-MM"));
    console.log("goalsRaw", goalsRaw);
    const goalsProcessed = goalsRaw.map((goal) => {
      var id = goal.id;
      var title = goal.title;
      var finish_at = goal.finish_at;
      var residual_time = goal.residual_time;
      var start_at = goal.start_at; //e.g "2023-07-18"
      var progress_rate = goal.progress_rate;
      var update_at = goal.update_at;
      var impossibledates_set = goal.impossibledates_set; //e.g ["2023-07-21","2023-07-22"]
      var today = new Date();
      var today_string = format(today, "yyyy-MM-dd");

      if (progress_rate === 100) {
        return {
          id: id,
          title: title,
          hoursperday: 0,
          dates_todo: [],
          finish_at: finish_at,
          update_at: update_at,
          progress_rate: 100,
        };
      }
      var dates_todo_rawset = [];
      if (today_string < start_at) {
        var begin_date = new Date(start_at);
        begin_date = format(begin_date, "yyyy-MM-dd");
        while (begin_date <= finish_at) {
          dates_todo_rawset.push(begin_date);
          begin_date = new Date(begin_date);
          begin_date.setDate(begin_date.getDate() + 1);
          begin_date = format(begin_date, "yyyy-MM-dd");
        }
      } else if (today_string <= finish_at && today_string >= start_at) {
        today = format(today, "yyyy-MM-dd");
        while (today <= finish_at) {
          dates_todo_rawset.push(today);
          today = new Date(today);
          today.setDate(today.getDate() + 1);
          today = format(today, "yyyy-MM-dd");
        }
      }
      var dates_todo = dates_todo_rawset.filter((date) => {
        for (var i = 0; i < impossibledates_set.length; i++) {
          console.log("try");
          if (date === impossibledates_set[i]["date"]) {
            console.log("impossible date", date);
            return false;
          }
        }
        return true;
      });
      var hoursperday = residual_time / dates_todo.length;
      return {
        id: id,
        title: title,
        hoursperday: hoursperday,
        dates_todo: dates_todo_rawset,
        finish_at: finish_at,
        update_at: update_at,
        progress_rate: progress_rate,
        impossibledates_set: impossibledates_set,
      };
    });
    setGoalsListwithImpossibledates(goalsProcessed);
    console.log("goal with impossibledates", goalsProcessed);
  };
  const getHistoryinmonthAPI = async () => {
    const historyRaw = await getHistoryinmonth(format(currentMonth, "yyyy-MM"));
    var historyProcessed = [];
    var begin = new Date(currentMonth);
    var end = new Date(currentMonth);
    begin.setDate(1);
    end.setMonth(end.getMonth() + 1);
    end.setDate(0);
    while (begin <= end && begin.getMonth() === end.getMonth()) {
      var begin_string = format(begin, "yyyy-MM-dd");
      historyProcessed.push([begin_string, []]);
      begin.setDate(begin.getDate() + 1);
    }
    historyRaw.forEach((history) => {
      var date = history.date;
      var hour = history.hour;
      var goal = history.goal;
      var goal_title = goal.title;
      var goal_progress_rate = goal.progress_rate;
      var goal_finish_at = goal.finish_at;
      var goal_update_at = goal.update_at;
      var goal_tag = goal.tag;
      var goal_id = goal.id;
      var goal_color = goal_tag.color;
      historyProcessed.forEach((history) => {
        if (history[0] === date) {
          history[1].push([
            {
              goal_id: goal_id,
              goal_title: goal_title,
              progress_rate: goal_progress_rate,
              finish_at: goal_finish_at,
              update_at: goal_update_at,
              color: goal_color,
              tag_title: goal_tag.title,
              tag_id: goal_tag.id,
              hours: hour,
            },
          ]);
        }
      });
    });
    console.log("historyProcessed", historyProcessed);
    setHistorywithDate(historyProcessed);
  };

  // 메인 달력 페이지에서 해당 달에 불러와야할 goalsList와 hisotry List를 불러온다.
  useEffect(() => {
    //캘린더에 표시될 goalList와 날짜를 선택하면 전달될 goalListwithImpossibledates를 가져온다.
    getGoalsinmonthAPI();
    getGoalswithImpossibledatesinmonthAPI();
    ///history를 불러온다.
    getHistoryinmonthAPI();
  }, [currentMonth]);

  //--------------------불러온 goalsList를 바탕으로 speedwithDate를 업데이트 한다. ---------------------//
  useEffect(() => {
    if (goalsList.length === 0) {
      return;
    }
    var begin = new Date(currentMonth);
    var end = new Date(currentMonth);
    var speedwithDate_temp = [];
    begin.setDate(1);
    end.setMonth(end.getMonth() + 1);
    end.setDate(0);
    while (begin <= end && begin.getMonth() === end.getMonth()) {
      // 30일, 28일까지만 있는 달 처리
      var begin_string = format(begin, "yyyy-MM-dd");
      speedwithDate_temp.push([begin_string, 0]);
      begin.setDate(begin.getDate() + 1);
    }
    var speedwithDate_temp2 = speedwithDate_temp.map((date) => {
      var hours = 0;
      goalsList.forEach((goal) => {
        if (goal.dates_todo.includes(date[0])) {
          hours += goal.hoursperday;
        }
      });
      return [date[0], hours];
    });
    setSpeedwithDate(speedwithDate_temp2);
    console.log("Success");
  }, [goalsList]);
  //--------------------불러온 historyList를 바탕으로 speedhistorywithDate를 업데이트한다. ---------------------//
  useEffect(() => {
    if (historywithDate.length === 0) {
      return;
    }
    var begin = new Date(currentMonth);
    var end = new Date(currentMonth);
    var speedwithDate_temp = [];
    begin.setDate(1);
    historywithDate.forEach((history) => {
      var begin_string = format(begin, "yyyy-MM-dd");
      var hours_added = 0;
      history[1].forEach((h) => {
        hours_added += h[0].hours;
      });
      speedwithDate_temp.push([begin_string, hours_added]);
      begin.setDate(begin.getDate() + 1);
    });
    setSpeedhistorywithDate(speedwithDate_temp);
    console.log("history added!", speedwithDate_temp);
  }, [historywithDate]);

  ///---------목표 추가 모달은 캘린더에 추가하지 않는 일반 목표와 캘린더에 추가하는 일정 목표로 나뉜다.-----------------//

  //1. 일반 목표 추가 data={tag:,title:,todo_list=[]}
  const addGoal = async (data) => {
    const goal = await createGoal(data);
    console.log("목표 추가 완료!", goal);
  };
  //2. 캘린더에 추가하는 일정 목표 추가

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
          goalsList={goalsListwithImpossibledates}
          historywithDate={historywithDate}
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
