import { getGoalsindate } from "../../apis/api_calendar";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getGoalsindate, getGoaldetail } from "../../apis/api_calendar";
import { getUserInfo } from "../../apis/api";
import tags from "../../data/tags";

const TodayGoalPage = () => {
  const today = new Date();
  const [goalsListwithImpossibledates, setGoalsListwithImpossibledates] = useState([]);
  const [isCompleteModalOpen, setisCompleteModalOpen] = useState(false);
  const [isGoalDetailModalOpen, setisGoalDetailModalOpen] = useState(false); // 초기에는 false로 설정
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [incompleted_tasks, setincompleted_tasks] = useState([]);
  const [completed_tasks, setcompleted_tasks] = useState([]);

  const showCompleteModal = (e) => {
    if (e.target === e.currentTarget) {
      setisCompleteModalOpen(!isCompleteModalOpen);
    }
  };
  const handleGoalClick = (goalId) => {
    const selectedGoal = goals.find((goal) => goal.id === goalId);
    setSelectedGoal(selectedGoal);
  };

  const onCloseGoalDetailModal = (e) => {
    if (e.target === e.currentTarget) {
      setisGoalDetailModalOpen(false); // 모달을 닫을 때 false로 설정
    }
  };

  const openGoalDetailModal = (goalId) => {
    setisGoalDetailModalOpen(true); // 모달을 열 때 true로 설정하고
    handleGoalClick(goalId); // 선택한 목표 정보 설정
  };

  useEffect(() => {
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    // "yyyy-mm-dd" 형태의 문자열 생성
    const formattedDate = `${year}-${month}-${day}`;
    const goals = getGoalsindate(formattedDate)
  }, [])
  useEffect(() => {
    setincompleted_tasks(goals.filter(update_at__lte = today))
    setcompleted_tasks(goals.filter(update_at = today))
  }, [goals])

  return (
    <>
      <s.CalendarDetailLayout>
        <s.GoalCountWrapper>
          <s.GoalCount>
            {`${incompleted_tasks.length}개의 목표, ${completed_tasks.length}건 완료`}
          </s.GoalCount>
        </s.GoalCountWrapper>
        <s.TasksContainer>
          {isPast(new Date(selectedDate)) && completed_tasks.length === 0 ? (
            <s.EmptyMessage text="달린 목표가 없어요" />
          ) : (
            finishdate_goals.length +
              incompleted_tasks.length +
              completed_tasks.length ===
              0 && <s.EmptyMessage text="달릴 목표가 없어요" />
          )}
          {finishdate_goals.map((goal) => (
            <DueDateGoal
              key={goal.id}
              goal={goal}
              tag={goal.tag}
              isGoalCompleted={isGoalCompleted(goal)}
              isPastGoal={isPastGoal(goal)}
              openGoalDetailModal={() => openGoalDetailModal(goal.id)}
            />
          ))}
          {completed_tasks.map(
            (task) =>
              !isDueDateGoal(task) && (
                <CompletedTask
                  key={task.id}
                  goal={task}
                  tag={task.tag}
                  isGoalCompleted={isGoalCompleted(task)}
                  openGoalDetailModal={() => openGoalDetailModal(task.id)}
                />
              )
          )}
          {incompleted_tasks.map(
            (task) =>
              !isDueDateGoal(task) &&
              !isTaskCompleted(task) && (
                <Task
                  key={task.id}
                  goal={task}
                  tag={task.tag}
                  hidden={task.is_hidden}
                  openGoalDetailModal={() => openGoalDetailModal(task.id)}
                  plusDateAPI={plusDateAPI}
                  minusDateAPI={minusDateAPI}
                  currentdate={selectedDate}
                />
              )
          )}
        </s.TasksContainer>
      </s.CalendarDetailLayout>
    </>
  );
};
