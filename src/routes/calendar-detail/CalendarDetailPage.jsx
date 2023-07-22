import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  CalendarDetailHeader,
  HeaderMessage,
  Task,
  TaskCompleteModal,
} from ".";
import { parse, isSameDay } from "date-fns"; // parse 함수를 import 합니다.
import * as s from "./styled";
import { ModalOverlay } from "../../components/modal/styled";
import goals from "../../data/goals";
import tags from "../../data/tags";

const CalendarDetailPage = () => {
  const { selectedDate } = useParams();
  const parsedDate = parse(selectedDate, "yyyy-MM-dd", new Date());
  const [isCompleteModalOpen, setisCompleteModalOpen] = useState(true);

  const showCompleteModal = (e) => {
    if (e.target === e.currentTarget) {
      setisCompleteModalOpen(!isCompleteModalOpen);
    }
  };

  const getGoals = (day) => {
    return goals.filter((goal) => {
      const formattedDate = new Date(day);
      const goalDate = new Date(goal.finish_at);
      return isSameDay(goalDate, formattedDate);
    });
  };

  const getTagForDay = (tags, goal) => {
    return tags.find((tag) => tag.id === goal.tag_id);
  };

  const filteredGoals = getGoals(selectedDate);
  console.log(filteredGoals);

  return (
    <>
      <s.calendarDetailRoot>
        <s.headerContainer>
          <CalendarDetailHeader selectedDate={parsedDate} />
          <HeaderMessage />
        </s.headerContainer>
        <s.Container>
          <s.textContainer>
            <s.goalCount>4개의 목표</s.goalCount>
          </s.textContainer>
          <s.tasksContainer>
            {filteredGoals.map((goal) => (
              <Task
                goalTitle={goal.title}
                tagTitle={getTagForDay(tags, goal).title}
                dueDate={goal.finish_at}
              />
            ))}
          </s.tasksContainer>
        </s.Container>
      </s.calendarDetailRoot>
      {isCompleteModalOpen && (
        <ModalOverlay onClick={showCompleteModal}>
          <TaskCompleteModal showCompleteModal={showCompleteModal} />
        </ModalOverlay>
      )}
    </>
  );
};

export default CalendarDetailPage;
