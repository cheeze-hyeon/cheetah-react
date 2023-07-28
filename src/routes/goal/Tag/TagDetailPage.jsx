import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import TagListShow from "./TagListShow";
import goals from "../../../data/goals";
import PageBothBtn from "../PageBothBtn";
import { TagCreateModal, TagUpdateModal } from "./TagModal";
import { TextLight } from "../../../components/text/styled";
import {
  getAllTags,
  updateTag,
  deleteTag,
  getAllGoals,
} from "../../../apis/api_calendar";
import { set } from "date-fns";
import { ModalOverlay } from "../../../components/modal/styled";
import { slideUp } from "../../../components/modal/styled";

const TagDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [tagList, setTagList] = useState([]);
  const [goals, setGoals] = useState([]);
  useEffect(() => {
    const getAllTagsAPI = async () => {
      const response = await getAllTags();
      console.log("tag", response);
      setTagList(response);
    };
    getAllTagsAPI();

    const getGoalsAPI = async () => {
      const response = await getAllGoals();
      console.log("goals", response);
      setGoals(response);
    };
    getGoalsAPI();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTag(null);
  };

  const getCompletedGoalsCount = (tagId) => {
    return goals.filter(
      (goal) => goal.tag.id === tagId && goal.is_completed === true
    ).length;
  };

  const getIncompleteGoalsCount = (tagId) => {
    return goals.filter(
      (goal) => goal.tag.id === tagId && goal.is_completed === false
    ).length;
  };

  const getTagCount = () => {
    return tagList.length;
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setIsModalOpen(true);
  };

  return (
    <div>
      {isModalOpen && selectedTag && (
        <ModalOverlay onClick={closeModal} className="z-10">
          {/* <div className="fixed bottom-0 left-0 w-full h-full flex justify-center items-center z-50"> */}
            <div onClick={(e) => e.stopPropagation()}>
              <TagUpdateModal tag={selectedTag} onClose={closeModal} />
            </div>
          {/* </div> */}
        </ModalOverlay>
      )}
      <div className="w-[390px] h-full flex flex-col z-1">
        <PageBothBtn onClose={closeModal} />
        <TextLight className="text-sm text text-gray-500 pl-4">{`${getTagCount()}개의 태그`}</TextLight>
        {tagList.map((tag) => (
          <div key={tag.id}>
            {/* Pass the handleTagClick function to TagListShow */}
            <TagListShow
              tag_default={tag}
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
