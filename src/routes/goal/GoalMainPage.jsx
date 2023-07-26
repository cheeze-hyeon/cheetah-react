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
import { HeaderTag } from "../../components/header/styled";
import { TextNormal } from "../../components/text/styled";
import { calendarMainRoot } from "../calendar/styled";
import * as s from "../../../src/routes/calendar/styled";
import { GoalCreateModal } from "../calendar/goal-create/styled";
import { ModalOverlay } from "../../components/modal/styled";

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

  const [isGoalCreateModalOpen, setisGoalCreateModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);

  const showGoalCreateModal = (e) => {
    if (e.target === e.currentTarget) {
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

  return (
    <>
      <s.calendarMainRoot>
        <div className="w-full h-full flex flex-col z-0">
          <HeaderTag text="내 목표" to="/tag-detail" />
          <div className="h-full bg-[#f5f5f5]">
            <div className="flex max-w-screen overflow-x-auto scrollbar-hide">
              <TagList
                tags={tags}
                selectedTagId={selectedTagId}
                onTagClick={handleTagClick}
              />
            </div>
            <div className="flex-col m-[20px] gap-[20px] max-w-screen h-[790px] pb-[200px] overflow-y-auto">
              {filteredGoals.length > 0 ? (
                <div className="flex flex-col gap-[20px] mb-[100px]">
                  <TextNormal>{`${goalCount}개의 목표`}</TextNormal>
                  <div className="flex flex-col gap-[15px] pb-200">
                    {filteredGoals.map((goal) => (
                      <div key={goal.id}>
                        {/* GoalCard를 클릭하면 handleGoalCardClick 함수가 호출되도록 합니다. */}
                        <div onClick={() => handleGoalCardClick(goal.id)}>
                          <GoalCard goal={goal}/>
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


        </div>
        <GoalTabBar />
        <s.floatingBtnContainer onClick={showGoalCreateModal}/>
      
      </s.calendarMainRoot>
      {isModalOpen && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col bg-white shadow-lg rounded-lg">
              {/* GoalDetailModal 컴포넌트에 todos 더미데이터를 전달합니다. */}
              <GoalDetailModal
                goal={selectedGoal}
                todos={todos}
                onCloseModal={handleModalClose}
              />
            </div>
          )}
      {isGoalCreateModalOpen && (
        <ModalOverlay onClick={showGoalCreateModal}>
          <GoalCreateModal
            to1={showGoalCreateModal}
            to2={addModalStep}
            step={modalStep}
            clickBtnClose={showGoalCreateModal}
            clickBtnBack={onClickModalBack}
            clickCompleteBtn={showGoalCreateModal}
            tags={tags}
          ></GoalCreateModal>
        </ModalOverlay>
      )}
    </>
  );
};

export default GoalMainPage;
