import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { addMonths, subMonths, format, set, isPast } from "date-fns";

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
import axios from "axios";
import { getCookie } from "../../utils/cookie";
import { GoalCreateModal } from "./goal-create/styled";
import {
  getGoalsinmonth,
  getGoalsindate,
  getGoaldetail,
  getAllGoals,
  getHistoryinmonth,
  createGoal,
  createGoalwithCalendar,
} from "../../apis/api_calendar";
import { FloatingButton } from "../../components/button/styled";
import { getUserInfo } from "../../apis/api";
import tags from "../../data/tags";

const CalendarMainPage = () => {
  const location = useLocation();
  var backpath = location?.state?.backpath;
  if (backpath === undefined) {
    backpath = new Date();
  }
  const [currentMonth, setCurrentMonth] = useState(new Date(backpath));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isGoalCreateModalOpen, setisGoalCreateModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [goalsList, setGoalsList] = useState([]); //캘린더에 표시할 processed된 목표들
  const [goalsListwithImpossibledates, setGoalsListwithImpossibledates] =
    useState([]); //캘린더 디테일에 표시할 impossible dates를 포함한 목표들
  const [speedwithDate, setSpeedwithDate] = useState([]);
  const [speedhistorywithDate, setSpeedhistorywithDate] = useState([]);
  const [historywithDate, setHistorywithDate] = useState([]); //e.g [[date,history],[date,history]...
  const [maxSpeed, setMaxSpeed] = useState(0);
  const storageKey = "isSpeedOff";

  // 로컬 스토리지에서 값을 가져와 초기 상태로 설정
  const getInitialIsSpeedOff = () => {
    const storedValue = localStorage.getItem(storageKey);
    return storedValue ? JSON.parse(storedValue) : false;
  };

  useEffect(() => {
    window.localStorage.removeItem("goalsindate");
  }, []);

  const [isSpeedOff, setIsSpeedOff] = useState(getInitialIsSpeedOff);

  useEffect(() => {
    // isSpeedOff 값이 변경될 때마다 로컬 스토리지에 저장
    localStorage.setItem(storageKey, JSON.stringify(isSpeedOff));
  }, [isSpeedOff]);

  const showGoalCreateModal = (e) => {
    if (e.target === e.currentTarget) {
      console.log("눌리긴 함!");
      setisGoalCreateModalOpen(!isGoalCreateModalOpen);
      setModalStep(1);
    }
  };
  const onClickModalBack = (e) => {
    if (e.target === e.currentTarget) {
      setModalStep(1);
      console.log("hh");
    }
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
      var tag = goal.tag;
      var impossibledates_set = goal.impossibledates_set; //e.g ["2023-07-21","2023-07-22"]
      var today = new Date();
      var today_string = format(today, "yyyy-MM-dd");

      if (progress_rate === 100) {
        return {
          id: id,
          title: title,
          hoursperday: 0,
          dates_task: [],
          finish_at: finish_at,
          update_at: update_at,
          progress_rate: 100,
          tag: tag,
        };
      }

      var dates_task_rawswet = [];
      if (today_string < start_at) {
        var begin_date = new Date(start_at);
        begin_date = format(begin_date, "yyyy-MM-dd");
        while (begin_date <= finish_at) {
          dates_task_rawswet.push(begin_date);
          begin_date = new Date(begin_date);
          begin_date.setDate(begin_date.getDate() + 1);
          begin_date = format(begin_date, "yyyy-MM-dd");
        }
      } else if (today_string <= finish_at && today_string >= start_at) {
        today = format(today, "yyyy-MM-dd");
        while (today <= finish_at) {
          dates_task_rawswet.push(today);
          today = new Date(today);
          today.setDate(today.getDate() + 1);
          today = format(today, "yyyy-MM-dd");
        }
      }
      var dates_task = dates_task_rawswet.filter((date) => {
        for (var i = 0; i < impossibledates_set.length; i++) {
          console.log("try");
          if (date === impossibledates_set[i]["date"]) {
            console.log("impossible date", date);
            return false;
          }
        }
        return true;
      });
      var hoursperday = residual_time / dates_task.length;
      return {
        id: id,
        title: title,
        hoursperday: hoursperday,
        dates_task: dates_task,
        finish_at: finish_at,
        update_at: update_at,
        progress_rate: progress_rate,
        tag: tag,
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
      var tag = goal.tag;
      var is_scheduled = goal.is_scheduled;
      var is_completed = goal.is_completed;

      if (progress_rate === 100) {
        return {
          id: id,
          title: title,
          hoursperday: 0,
          dates_task: [],
          finish_at: finish_at,
          update_at: update_at,
          progress_rate: 100,
          tag: tag,
          is_scheduled: is_scheduled,
          is_completed: is_completed,
        };
      }
      var dates_task_rawswet = [];
      if (today_string < start_at) {
        var begin_date = new Date(start_at);
        begin_date = format(begin_date, "yyyy-MM-dd");
        while (begin_date <= finish_at) {
          dates_task_rawswet.push(begin_date);
          begin_date = new Date(begin_date);
          begin_date.setDate(begin_date.getDate() + 1);
          begin_date = format(begin_date, "yyyy-MM-dd");
        }
      } else if (today_string <= finish_at && today_string >= start_at) {
        today = format(today, "yyyy-MM-dd");
        while (today <= finish_at) {
          dates_task_rawswet.push(today);
          today = new Date(today);
          today.setDate(today.getDate() + 1);
          today = format(today, "yyyy-MM-dd");
        }
      }
      var dates_task = dates_task_rawswet.filter((date) => {
        for (var i = 0; i < impossibledates_set.length; i++) {
          console.log("try");
          if (date === impossibledates_set[i]["date"]) {
            console.log("impossible date", date);
            return false;
          }
        }
        return true;
      });
      var hoursperday = residual_time / dates_task.length;
      return {
        id: id,
        title: title,
        hoursperday: hoursperday,
        dates_task: dates_task_rawswet,
        finish_at: finish_at,
        update_at: update_at,
        progress_rate: progress_rate,
        impossibledates_set: impossibledates_set,
        tag: tag,
        residual_time: residual_time,
        is_scheduled: is_scheduled,
        is_completed: is_completed,
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
              id: goal_id,
              title: goal_title,
              progress_rate: goal_progress_rate,
              finish_at: goal_finish_at,
              update_at: goal_update_at,
              tag: goal_tag,
              hoursperday: hour,
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
    const getUserInfoAPI = async () => {
      const userInfo = await getUserInfo();
      setMaxSpeed(userInfo.data.max_speed);
      console.log("userinfo", userInfo.data.max_speed);
    };
    getUserInfoAPI();
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
    begin.setMonth(begin.getMonth() - 1);
    begin.setDate(20);
    end.setMonth(end.getMonth() + 1);
    end.setDate(10);
    while (begin <= end) {
      // 30일, 28일까지만 있는 달 처리
      var begin_string = format(begin, "yyyy-MM-dd");
      speedwithDate_temp.push([begin_string, 0]);
      begin.setDate(begin.getDate() + 1);
    }
    var speedwithDate_temp2 = speedwithDate_temp.map((date) => {
      var hours = 0;
      goalsList.forEach((goal) => {
        if (goal.dates_task.includes(date[0])) {
          hours += goal.hoursperday;
        }
      });
      return [date[0], hours];
    });
    speedwithDate_temp2 = speedwithDate_temp2.map((date) => {
      var newhours = (date[1] / maxSpeed) * 100;
      newhours = Math.round(newhours);
      if (newhours > 100) {
        newhours = 6;
      } else if (newhours > 80 && newhours <= 100) {
        newhours = 5;
      } else if (newhours > 60 && newhours <= 80) {
        newhours = 4;
      } else if (newhours > 40 && newhours <= 60) {
        newhours = 3;
      } else if (newhours > 20 && newhours <= 40) {
        newhours = 2;
      } else if (newhours > 0 && newhours <= 20) {
        newhours = 1;
      } else {
        newhours = 0;
      }
      return [date[0], newhours];
    });
    setSpeedwithDate(speedwithDate_temp2);
    console.log("Speed of the Future", speedwithDate_temp2);
  }, [goalsList, maxSpeed]);
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
      hours_added = (hours_added / maxSpeed) * 100;
      hours_added = Math.round(hours_added);
      if (hours_added > 100) {
        hours_added = 6;
      } else if (hours_added > 80 && hours_added <= 100) {
        hours_added = 5;
      } else if (hours_added > 60 && hours_added <= 80) {
        hours_added = 4;
      } else if (hours_added > 40 && hours_added <= 60) {
        hours_added = 3;
      } else if (hours_added > 20 && hours_added <= 40) {
        hours_added = 2;
      } else if (hours_added > 0 && hours_added <= 20) {
        hours_added = 1;
      } else {
        hours_added = 0;
      }
      speedwithDate_temp.push([begin_string, hours_added]);

      begin.setDate(begin.getDate() + 1);
    });
    setSpeedhistorywithDate(speedwithDate_temp);
    console.log("Speed of the Past!", speedwithDate_temp);
  }, [historywithDate, maxSpeed]);

  const controlSpeedButton = () => {
    setIsSpeedOff(!isSpeedOff);
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
            <s.switchFrame onClick={controlSpeedButton}>
              <s.track $isOff={isSpeedOff} />
              <s.onOffCircle $isOff={isSpeedOff}>
                <s.onOffText $isOff={isSpeedOff}>
                  {isSpeedOff ? "OFF" : "ON"}
                </s.onOffText>
              </s.onOffCircle>
            </s.switchFrame>
          </s.buttonContainer>
          <CalendarDays />
        </s.headerContainer>
        <CalendarCells
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          goalsList={goalsListwithImpossibledates}
          historywithDate={historywithDate}
          speedwithDate={speedwithDate}
          speedhistorywithDate={speedhistorywithDate}
          isSpeedOff={isSpeedOff}
        />
        <FloatingButton onClick={showGoalCreateModal} />
      </s.calendarMainRoot>
      <CalendarTabBar />

      {isGoalCreateModalOpen && (
        <ModalOverlay onClick={showGoalCreateModal}>
          <GoalCreateModal
            to1={showGoalCreateModal}
            addModalStep={addModalStep}
            step={modalStep}
            modalClose={showGoalCreateModal}
            clickBtnBack={onClickModalBack}
            tags={tags}
          ></GoalCreateModal>
        </ModalOverlay>
      )}
    </>
  );
};
export default CalendarMainPage;
