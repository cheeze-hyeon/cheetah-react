import React, { useState } from "react";
import TagListShow from "./TagListShow";
import goals from "../../../data/goals";
import tags from "../../../data/tags";
import { TagCreateModal, TagUpdateModal } from ".";
import { HeaderPlus } from "../../../components/header/styled";
import { TextNormal } from "../../../components/text/styled";

const TagDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);

  // 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTag(null);
  };

  const getCompletedGoalsCount = (tagId) => {
    return goals.filter(
      (goal) => goal.tag_id === tagId && goal.is_completed === 1
    ).length;
  };

  const getIncompleteGoalsCount = (tagId) => {
    return goals.filter(
      (goal) => goal.tag_id === tagId && goal.is_completed === 0
    ).length;
  };

  const getTagCount = () => {
    return tags.length;
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setIsModalOpen(true);
  };

  return (
    <div>
      <HeaderPlus text="태그 관리" onClickPlus={openModal}></HeaderPlus>
      <div className="w-[390px] h-screen flex flex-col">
        <TextNormal className="px-[20px]">{`${getTagCount()}개의 태그`}</TextNormal>
        {tags.map((tag) => (
          <div key={tag.id}>
            {/* Pass the handleTagClick function to TagListShow */}
            <TagListShow
              tag={tag}
              completedGoals={getCompletedGoalsCount(tag.id)}
              incompleteGoals={getIncompleteGoalsCount(tag.id)}
              onClick={() => handleTagClick(tag)} // Pass the handleTagClick function to TagListShow
            />
          </div>
        ))}
      </div>
      {isModalOpen && selectedTag && (
        <div className="fixed bottom-0 left-0 w-full h-full flex justify-center items-center z-50">
          <TagUpdateModal tag={selectedTag} onClose={closeModal} />
        </div>
      )}
      {isModalOpen && !selectedTag && (
        <div className="fixed bottom-0 left-0 z-50">
          <TagCreateModal onClose={closeModal} />
        </div>
      )}
    </div>
  );
};

export default TagDetail;
