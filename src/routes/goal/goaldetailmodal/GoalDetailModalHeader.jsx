import React, { useState } from "react";
import HeaderClose from "./HeaderClose";
import HeaderDelete from "../Tag/HeaderDelete";
import "tailwindcss/tailwind.css";
import { GoalDeleteModal } from "../styled";
import { ModalOverlay } from "../../../components/modal/styled";

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
    <div className="box-border flex flex-row justify-end items-start flex-grow-0 flex-shrink-0 w-full h-fill p-2 gap-3 ">
      {isModalOpen && <ModalOverlay onClick={closeGoalDeleteModal} />}
      {isModalOpen && (
        <GoalDeleteModal
          goal_id={goal_id}
          is_scheduled={goal_is_scheduled}
          onCloseModal={closeGoalDeleteModal}
        />
      )}
      <HeaderDelete
        className="w-[23px] h-[23px]"
        openGoalDeleteModal={openGoalDeleteModal}
      />
      <button>
        <HeaderClose onClick={onCloseModal} width="24" />
      </button>
    </div>
  );
};

export default GoalDetailModalHeader;
