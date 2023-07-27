import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import TagListShow from "./TagListShow";
import goals from "../../../data/goals";
import tags from "../../../data/tags";
import PageBothBtn from "../PageBothBtn";
import { TagCreateModal, TagUpdateModal } from "./TagModal";
import { TextLight } from "../../../components/text/styled";
import { ModalOverlay } from "../../../components/modal/styled";

const TagDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

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
      {/* {isModalOpen && !selectedTag && (
        <ModalOverlay className="z-10">
          <div className="fixed bottom-0 left-0 w-full h-full flex justify-center items-center z-50">
            <TagCreateModal onClose={closeModal} />
          </div>
        </ModalOverlay>
      )} */}
      {isModalOpen && selectedTag && (
        <ModalOverlay className="z-10">
          <div className="fixed bottom-0 left-0 w-full h-full flex justify-center items-center z-50">
            <TagUpdateModal tag={selectedTag} onClose={closeModal} />
          </div>
        </ModalOverlay>
      )}
      <div className="w-[390px] h-full flex flex-col z-1">
        <PageBothBtn onClose={closeModal} />
        <TextLight className="text-sm text text-gray-500 pl-4">{`${getTagCount()}개의 태그`}</TextLight>
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
    </div>
  );
};

export default TagDetail;
