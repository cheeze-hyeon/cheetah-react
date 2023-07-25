import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoalCard from "../goal/GoalCard";
import TagList from "../goal/Tag/TagList";
import goals from "../../data/goals";
import tags from "../../data/tags";
import "../../index.css";
import todos from "../../data/todos";
import { GoalTabBar } from "../../components/tabBar";
import "tailwindcss/tailwind.css";
import "../../index.css";
import GoalDetailModal from "./goaldetailmodal/GoalDetailModal";
import { calendarMainRoot } from "../calendar/styled";
import { HeaderTag } from "../../components/header/styled";
import { TextNormal } from "../../components/text/styled";

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
        <HeaderTag text="내 목표" to="/tag-detail" />
        <div className="h-full bg-[#f5f5f5]">
          <div className="flex max-w-screen overflow-x-auto scrollbar-hide">
            <TagList
              tags={tags}
              selectedTagId={selectedTagId}
              onTagClick={handleTagClick}
            />
          </div>
          <div className="flex flex-col m-[20px] gap-[20px] max-w-screen h-full overflow-y-auto">
            {filteredGoals.length > 0 ? (
              <div className="flex flex-col gap-[20px] mb-[100px]">
                <TextNormal>{`${goalCount}개의 목표`}</TextNormal>
                <div className="flex flex-col gap-[15px]">
                  {filteredGoals.map((goal) => (
                    <div key={goal.id}>
                      {/* GoalCard를 클릭하면 handleGoalCardClick 함수가 호출되도록 합니다. */}
                      <div onClick={() => handleGoalCardClick(goal.id)}>
                        <GoalCard goal={goal} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <TextNormal className="text-center">목표가 없습니다.</TextNormal>
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
      </div>
      <GoalTabBar />
    </div>
  );
};

export default GoalMainPage;
