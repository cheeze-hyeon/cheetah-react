import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import IconShow from "./IconShow";
import IconHide from "./IconHide";
import HeaderDelete from "./HeaderDelete";
import { TagDeleteAlertModal } from "../styled";
import { TextLight } from "../../../components/text/styled";
import {
  TagContainer,
  TagDefault,
  TagLabel,
} from "../../../components/button/styled";
import { updateTag, deleteTag } from "../../../apis/api_calendar";

const TagListShow = ({
  tag_default,
  completedGoals,
  incompleteGoals,
  onClick,
}) => {
  const [isHidden, setIsHidden] = useState(!tag_default.is_used);
  const [tag, setTag] = useState(tag_default);

  const toggleVisibility = () => {
    setIsHidden((prevState) => !prevState);
    const updateTagAPI = async () => {
      const response = await updateTag(tag.id, {
        ...tag,
        is_used: !tag.is_used,
      });
      console.log("updateTagAPI", response);
    };
    updateTagAPI();
    setTag((prevTag) => ({ ...prevTag, is_used: !prevTag.is_used }));
  };

  const cardBackgroundColor = isHidden ? "#F5F5F5" : "#FFF";
  const [isModalOpen, setIsModalOpen] = useState(false);

  // GoalDeleteModal 모달을 열기 위한 함수
  const openGoalDeleteModal = () => {
    setIsModalOpen(true);
  };

  // GoalDeleteModal 모달을 닫기 위한 함수
  const closeGoalDeleteModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="box-border flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 w-full h-[78px] px-[25px] py-5 border-t-0 border-r-0 border-b border-l-0 border-[#eaeef1]"
      style={{ backgroundColor: cardBackgroundColor }}
    >
      <div className="box-border flex justify-start items-center flex-grow basis-full gap-[15px]">
        <TagDefault isSelected="0" color={tag.color} text={tag.title} />

        <div
          className="box-border flex flex-col justify-center items-start flex-grow basis-full"
          onClick={onClick}
        >
          <div className="box-border flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5">
            <TextLight>완료 목표 : {completedGoals}</TextLight>
          </div>
          <div className="box-border flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5">
            <TextLight>미완료 목표 : {incompleteGoals}</TextLight>
          </div>
        </div>
      </div>
      <div className="box-border flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-5">
        <button onClick={toggleVisibility}>
          {isHidden ? <IconHide /> : <IconShow />}
        </button>
        <HeaderDelete
          className="w-[23px] h-[23px]"
          openGoalDeleteModal={openGoalDeleteModal}
        />
        {isModalOpen && (
          <TagDeleteAlertModal
            onCloseModal={closeGoalDeleteModal}
            tag_id={tag.id}
          />
        )}
      </div>
    </div>
  );
};

export default TagListShow;
