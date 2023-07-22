import TodayIcon from "../../asset/images/today.svg";
import TodayFillIcon from "../../asset/images/today-fill.svg";
import CalendarIcon from "../../asset/images/calendar.svg";
import CalendarFillIcon from "../../asset/images/calendar-fill.svg";
import GoalIcon from "../../asset/images/goal.svg";
import GoalFillIcon from "../../asset/images/goal-fill.svg";
import * as s from "./style";
import { useNavigate } from "react-router-dom";

export const TodayTabBar = () => {
  const navigate = useNavigate();

  const navigateToCalendar = () => {
    navigate("/calendar");
  };

  const navigateToGoal = () => {
    navigate("/goal");
  };

  return (
    <s.tabBarContainer>
      <s.tabs>
        <s.tabBarItem>
          <img alt="today" src={TodayFillIcon} />
          <s.tabLabelSelected>투데이</s.tabLabelSelected>
        </s.tabBarItem>
        <s.tabBarItem onClick={navigateToCalendar}>
          <img alt="calendar" src={CalendarIcon} />
          <s.tabLabel>캘린더</s.tabLabel>
        </s.tabBarItem>
        <s.tabBarItem onClick={navigateToGoal}>
          <img alt="goal" src={GoalIcon} />
          <s.tabLabel>목표</s.tabLabel>
        </s.tabBarItem>
      </s.tabs>
      <s.homeIndicator />
    </s.tabBarContainer>
  );
};

export const CalendarTabBar = () => {
  const navigate = useNavigate();

  const navigateToToday = () => {
    navigate("/today");
  };

  const navigateToGoal = () => {
    navigate("/goal");
  };

  return (
    <s.tabBarContainer>
      <s.tabs>
        <s.tabBarItem onClick={navigateToToday}>
          <img alt="today" src={TodayIcon} />
          <s.tabLabel>투데이</s.tabLabel>
        </s.tabBarItem>
        <s.tabBarItem>
          <img alt="calendar" src={CalendarFillIcon} />
          <s.tabLabelSelected>캘린더</s.tabLabelSelected>
        </s.tabBarItem>
        <s.tabBarItem onClick={navigateToGoal}>
          <img alt="goal" src={GoalIcon} />
          <s.tabLabel>목표</s.tabLabel>
        </s.tabBarItem>
      </s.tabs>
      <s.homeIndicator />
    </s.tabBarContainer>
  );
};

export const GoalTabBar = () => {
  const navigate = useNavigate();

  const navigateToToday = () => {
    navigate("/today");
  };

  const navigateToCalendar = () => {
    navigate("/calendar");
  };

  return (
    <s.tabBarContainer>
      <s.tabs>
        <s.tabBarItem onClick={navigateToToday}>
          <img alt="today" src={TodayIcon} />
          <s.tabLabel>투데이</s.tabLabel>
        </s.tabBarItem>
        <s.tabBarItem onClick={navigateToCalendar}>
          <img alt="calendar" src={CalendarIcon} />
          <s.tabLabel>캘린더</s.tabLabel>
        </s.tabBarItem>
        <s.tabBarItem>
          <img alt="goal" src={GoalFillIcon} />
          <s.tabLabelSelected>목표</s.tabLabelSelected>
        </s.tabBarItem>
      </s.tabs>
      <s.homeIndicator />
    </s.tabBarContainer>
  );
};
