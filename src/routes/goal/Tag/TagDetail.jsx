import React from "react";
import "tailwindcss/tailwind.css";
import TagListShow from "./TagListShow";
import goals from "../../../data/goals";
import tags from "../../../data/tags";
import PageBothBtn from "../PageBothBtn";

const TagDetail = () => {

  const getCompletedGoalsCount = (tagId) => {
    return goals.filter((goal) => goal.tag_id === tagId && goal.is_completed === 1).length;
  };

  const getIncompleteGoalsCount = (tagId) => {
    return goals.filter((goal) => goal.tag_id === tagId && goal.is_completed === 0).length;
  };

  // Tag 개수를 가져오는 함수
  const getTagCount = () => {
    return tags.length;
  };

  return (
    <div>
      <div className="w-390 h-screen flex flex-col ">
        <PageBothBtn />
      <p className="text-sm text-gray-500 mb-2 pl-4">{`${getTagCount()}개의 태그`}</p>
        {tags.map((tag) => (
          <div key={tag.id} >
            <TagListShow
              tag={tag}
              completedGoals={getCompletedGoalsCount(tag.id)}
              incompleteGoals={getIncompleteGoalsCount(tag.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagDetail;