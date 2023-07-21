import * as s from "./style";
import { GoalTabBar } from "../../components/tabBar";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "tailwindcss/tailwind.css";
import GoalCard from "../goal/GoalCard";
import TagList from "../goal/TagList";
import goals from "../../data/goals";
import tags from "../../data/tags";
import "../../index.css";
import GoalHeader from "../goal/GoalHeader";

const GoalMainPage = () => {
  const [selectedTagId, setSelectedTagId] = useState(null);

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

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="w-390 h-screen flex flex-col">
        <GoalHeader />

        <div className="flex max-w-screen overflow-y-auto">
          <TagList
            tags={tags}
            selectedTagId={selectedTagId}
            onTagClick={handleTagClick}
          />
        </div>

        <div className="flex-grow overflow-y-auto px-4 py-6">
          {filteredGoals.length > 0 ? (
            <>
              <p className="text-sm text-gray-500 mb-2 pb-5">{`${goalCount}개의 목표`}</p>
              {filteredGoals.map((goal, index) => (
                <div key={goal.id} className={index !== 0 ? "mt-4" : ""}>
                  <GoalCard goal={goal} />
                </div>
              ))}
            </>
          ) : (
            <p className="text-center text-gray-500">목표가 없습니다.</p>
          )}
        </div>

        <GoalTabBar />
      </div>
    </div>
  );
};

export default GoalMainPage;
