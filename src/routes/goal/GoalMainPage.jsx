import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoalCard from "../goal/GoalCard";
import TagList from "../goal/Tag/TagList";
import goals from "../../data/goals";
import tags from "../../data/tags";
import "../../index.css";
import todos from "../../data/todos";
import GoalHeader from "../goal/GoalHeader";
import { GoalTabBar } from "../../components/tabBar";
import "tailwindcss/tailwind.css";
import "../../index.css";
import GoalDetailModal from "./goaldetailmodal/GoalDetailModal";
import { calendarMainRoot } from "../calendar/goal-create/styled";

const GoalMainPage = () => {
  const [selectedTagId, setSelectedTagId] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const handleTagClick = (tagId) => {
    setSelectedTagId(tagId);
  };

  const filteredGoals = selectedTagId
    ? goals
        .filter((goal) => goal.tag_id === selectedTagId)
        .map((goal) => ({
          ...goal,
          tag: tags.find((tag) => tag.id === goal.tag_id),
        }))
    : goals.map((goal) => ({
        ...goal,
        tag: tags.find((tag) => tag.id === goal.tag_id),
      }));

  const goalCount = filteredGoals.length;

  const handleGoalCardClick = (goalId) => {
    const selectedGoal = goals.find((goal) => goal.id === goalId);
    setSelectedGoal(selectedGoal);
    setIsModalOpen(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-[390px] h-[844px]">
      <div className="w-full h-full flex flex-col">
        <GoalHeader />

        <div className="flex max-w-screen overflow-x-auto">
          <TagList
            tags={tags}
            selectedTagId={selectedTagId}
            onTagClick={handleTagClick}
          />
        </div>

        <div className="max-w-screen h-full flex-grow overflow-y-auto px-4 pt-1.25 pb-2.5">
          {filteredGoals.length > 0 ? (
            <div className="pb-20">
              <p className="text-sm text-gray-500 mb-2 pb-5">{`${goalCount}개의 목표`}</p>
              {filteredGoals.map((goal, index) => (
                <div key={goal.id} className={index !== 0 ? "mt-4" : ""}>
                  {/* GoalCard를 클릭하면 handleGoalCardClick 함수가 호출되도록 합니다. */}
                  <div onClick={() => handleGoalCardClick(goal.id)}>
                    <GoalCard goal={goal} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">목표가 없습니다.</p>
          )}
        </div>
      </div>

      {/* GoalDetailModal을 선택한 goal의 정보로 열어줍니다. */}
      {isModalOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col w-357 h-500 p-4 gap-4 bg-white shadow-lg rounded-lg">
          {/* GoalDetailModal 컴포넌트에 todos 더미데이터를 전달합니다. */}
          <GoalDetailModal
            goal={selectedGoal}
            todos={todos}
            onCloseModal={handleModalClose}
          />
        </div>
      )}
      <GoalTabBar />
    </div>
  );
};

export default GoalMainPage;
