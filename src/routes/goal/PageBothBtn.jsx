import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router-dom";
import HeaderBack from "./HeaderBack";
import HeaderPlus from "./HeaderPlus";
import { TagCreateModal } from "./Tag/TagModal";
import { TitleHeavy, TitleNormal } from "../../components/text/styled";
import { ModalOverlay } from "../../components/modal/styled";

const PageBothBtn = ({ tag }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goBack = () => {
    // goBack()을 사용하여 이전 페이지로 이동합니다.
    navigate(-1);
  };

  return (
    <div className="flex justify-between items-center px-4 pb-10 pt-20 w-full h-16 bg-white">
      <button className="focus:outline-none" onClick={goBack}>
        <HeaderBack />
      </button>
      <TitleNormal>태그 관리</TitleNormal>
      <button className="focus:outline-none" onClick={openModal}>
        <HeaderPlus />
      </button>
      {isModalOpen && (
        <ModalOverlay onClick={closeModal} className="z-10">
          <div onClick={(e) => e.stopPropagation()}>
            <TagCreateModal
              className="fixed bottom-0 z-50"
              onClose={closeModal}
            />
          </div>
        </ModalOverlay>
      )}
    </div>
  );
};

export default PageBothBtn;
