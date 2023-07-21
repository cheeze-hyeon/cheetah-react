import React from "react";
import "tailwindcss/tailwind.css";
import TagModalHeader from "./TagModalheader";
import TagDetailwithColor from "./TagDetailwithColor";

const TagCreateModal = ({ onClose, tag }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-full flex justify-center items-center z-50">
      <div
        className="box-border flex flex-col justify-center items-center w-full p-10 gap-10 rounded-t-2xl bg-white shadow-xl"
        style={{
          borderTopLeftRadius: "25px",
          borderTopRightRadius: "25px",
          boxShadow: "0px 3px 30px 0px rgba(0, 0, 0, 0.16)",
        }}
      >
        <TagModalHeader />
        <TagDetailwithColor />
        <button
          className="px-4 py-2 w-full bg-[#F19A37] text-white rounded-md"
          onClick={onClose}
        >
          추가하기
        </button>
      </div>
    </div>
  );
};

export default TagCreateModal;
