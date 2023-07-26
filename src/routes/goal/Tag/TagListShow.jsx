import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import IconShow from "./IconShow";
import IconHide from "./IconHide";
import HeaderDelete from "./HeaderDelete";
import { TagDefault } from "../../../components/button/styled";
import { TagDeleteAlertModal } from "../styled";


const TagListShow = ({ tag, completedGoals, incompleteGoals, onClick }) => {
  const [isHidden, setIsHidden] = useState(false);

  const toggleVisibility = () => {
    setIsHidden((prevState) => !prevState);
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
        <TagDefault color={tag.color} text={tag.title} isSelected="true" />
        <div
          className="box-border flex flex-col justify-center items-start flex-grow basis-full"
          onClick={onClick}
        >
          <div className="box-border flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5">
            <p className="whitespace-pre-wrap flex-grow font-['Pretendard'] text-[13px] leading-[19px] text-left text-black">
              완료 목표 : {completedGoals}
            </p>
          </div>
          <div className="box-border flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5">
            <p className="whitespace-pre-wrap flex-grow font-['Pretendard'] text-[13px] leading-[19px] text-left text-black">
              미완료 목표 : {incompleteGoals}
            </p>
          </div>
        </div>
      </div>
      <div className="box-border flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-5">
        <button onClick={toggleVisibility}>
          {isHidden ? <IconHide /> : <IconShow />}
        </button>
        <HeaderDelete className="w-[23px] h-[23px]" openGoalDeleteModal={openGoalDeleteModal}/>
        {isModalOpen && <TagDeleteAlertModal onCloseModal={closeGoalDeleteModal} />}
      </div>
    </div>
  );
};

export default TagListShow;
