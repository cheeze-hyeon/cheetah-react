import React, { useState } from "react";
import HeaderClose from "./HeaderClose";
import HeaderDelete from "../Tag/HeaderDelete";
import "tailwindcss/tailwind.css";
import { GoalDeleteModal } from "../styled";

const GoalDetailModalHeader = ({
  onCloseModal,
  goal_id,
  goal_is_scheduled,
}) => {
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
    <div className="box-border flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-full h-fill ">
      <div className="box-border flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 w-full gap-2.5 py-2.5">
        <div className="box-border flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-2.5">
          <button onClick={onCloseModal}>
            <HeaderClose width="24" />
          </button>
          <div className="box-border flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-[5px]"></div>
          <HeaderDelete
            className="w-[23px] h-[23px]"
            openGoalDeleteModal={openGoalDeleteModal}
          />
          {isModalOpen && (
            <GoalDeleteModal
              goal_id={goal_id}
              is_scheduled={goal_is_scheduled}
              onCloseModal={closeGoalDeleteModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalDetailModalHeader;
