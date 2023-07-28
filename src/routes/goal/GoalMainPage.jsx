import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoalCard from "../goal/GoalCard";
import TagList from "../goal/Tag/TagList";
import "../../index.css";
import tags from "../../data/tags";
import todos from "../../data/todos";
import { GoalTabBar } from "../../components/tabBar";
import "tailwindcss/tailwind.css";
import "../../index.css";
import GoalDetailModal from "./goaldetailmodal/GoalDetailModal";
import { GoalHeader } from "../../components/header/styled";
import { TextNormal } from "../../components/text/styled";
import { calendarMainRoot } from "../calendar/styled";
import * as s from "../../../src/routes/calendar/styled";
import { GoalCreateModal } from "../calendar/goal-create/styled";
import { ModalOverlay } from "../../components/modal/styled";
import { FloatingButton } from "../../components/button/styled";
import { GoalMainRoot } from "./styled";
import { getAllGoals, getFilteredTags } from "../../apis/api_calendar";
import { set } from "date-fns";

const GoalMainPage = () => {
  const [selectedTagId, setSelectedTagId] = useState(
    Number(localStorage.getItem("filtered_tag_id")) || null
  );
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [goalList, setGoalList] = useState([]);
  const [filteredGoals, setFilteredGoals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGoalCreateModalOpen, setisGoalCreateModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [tagList, setTagList] = useState([]);

  const goalCount = filteredGoals.length;

  const handleTagClick = (tagId) => {
    setSelectedTagId(tagId);
    localStorage.setItem("filtered_tag_id", tagId);
  };

  useEffect(() => {
    const getAllGoalsAPI = async () => {
      const response = await getAllGoals();
      const goalsProcessed = response.map((goal) => ({
        ...goal,
        tag_id: goal.tag.id,
      }));
      console.log("goal", goalsProcessed);
      setGoalList(goalsProcessed);
    };
    getAllGoalsAPI();

    const getFilteredTagsAPI = async () => {
      const response = await getFilteredTags();
      console.log("tag", response);
      setTagList(response.map((tag) => ({ ...tag, user_id: tag.user })));
    };
    getFilteredTagsAPI();
    localStorage.setItem("filtered_tag_id", selectedTagId);
  }, []);

  useEffect(() => {
    var filteredGoals_temp = [];
    console.log("selectedTagId", selectedTagId, typeof selectedTagId);
    if (selectedTagId) {
      console.log("filter 시도");
      console.log("goalList", goalList);
      if (goalList.length === 0) return;
      filteredGoals_temp = goalList
        .filter((goal) => goal.tag_id === selectedTagId)
        .map((goal) => ({
          ...goal,
          tag: tagList.find((tag) => tag.id === goal.tag_id),
        }));
      console.log("filtered_goals_temp", filteredGoals_temp);
    } else {
      filteredGoals_temp = goalList.map((goal) => ({
        ...goal,
        tag: tagList.find((tag) => tag.id === goal.tag_id),
      }));
    }
    setFilteredGoals(filteredGoals_temp);
    console.log("filter 끝");
  }, [selectedTagId, goalList, tagList]);

  const handleGoalCardClick = (goalId) => {
    const selectedGoal = goalList.find((goal) => goal.id === goalId);
    setSelectedGoal(selectedGoal);
    setIsModalOpen(true);
  };

  const handleModalClose = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

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

  return (
    <>
      <GoalHeader text="내 목표" to="/tag-detail" />

      <GoalMainRoot>
        <div className="h-full w-[390px] bg-[#f5f5f5]">
          <div className="flex flex-starts overflow-x-auto scrollbar-hide w-[390px]">
            <TagList
              tags={tagList}
              selectedTagId={selectedTagId}
              onTagClick={handleTagClick}
            />
          </div>
          <div className="flex-col m-[20px] gap-[20px] max-w-screen h-[790px] pb-[200px] overflow-y-auto">
            {filteredGoals.length > 0 ? (
              <div className="flex flex-col gap-[20px] mb-[100px]">
                <TextNormal>{`${goalCount}개의 목표`}</TextNormal>
                <div className="flex flex-col gap-[15px] pb-200">
                  {filteredGoals.map(
                    (goal) =>
                      goal.is_scheduled && (
                        <GoalCard
                          key={goal.id}
                          goal={goal}
                          onClick={() => handleGoalCardClick(goal.id)}
                        />
                      )
                  )}
                  {filteredGoals.map(
                    (goal) =>
                      !goal.is_scheduled && (
                        <GoalCard
                          key={goal.id}
                          goal={goal}
                          onClick={handleGoalCardClick}
                        />
                      )
                  )}
                </div>
              </div>
            ) : (
              <TextNormal className="text-center">목표가 없습니다.</TextNormal>
            )}
          </div>
        </div>
        <FloatingButton onClick={showGoalCreateModal} />
      </GoalMainRoot>
      <GoalTabBar />
      {isModalOpen && (
        <ModalOverlay onClick={handleModalClose}>
          <GoalDetailModal
            goal={selectedGoal}
            onCloseModal={handleModalClose}
            filtered_tagId={selectedTagId}
          />
        </ModalOverlay>
        // <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col bg-white shadow-lg rounded-lg">
        //   {/* GoalDetailModal 컴포넌트에 todos 더미데이터를 전달합니다. */}

        // </div>
      )}
      {isGoalCreateModalOpen && (
        <ModalOverlay onClick={showGoalCreateModal}>
          <GoalCreateModal
            to1={showGoalCreateModal}
            addModalStep={addModalStep}
            step={modalStep}
            modalClose={showGoalCreateModal}
            clickBtnBack={onClickModalBack}
            clickCompleteBtn={showGoalCreateModal}
            tags={tagList}
          ></GoalCreateModal>
        </ModalOverlay>
      )}
    </>
  );
};

export default GoalMainPage;
