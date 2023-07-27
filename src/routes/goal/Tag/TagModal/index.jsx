import React from "react";
import "tailwindcss/tailwind.css";
import TagModalHeader from "./TagModalheader";
import TagDetailwithColor from "./TagDetailwithColor";
import { SlimButtonActive } from "../../../../components/button/styled";

export const TagCreateModal = ({ onClose, tag }) => {
  return (
    <div
      className="fixed left-0 w-[390px] h-full flex justify-center items-center z-50"

    >
      <div
        className="fixed bottom-0 left-0 box-border flex flex-col justify-center items-center w-[390px] p-10 gap-10 rounded-t-2xl bg-white shadow-xl"
        style={{
          borderTopLeftRadius: "25px",
          borderTopRightRadius: "25px",
          boxShadow: "0px 3px 30px 0px rgba(0, 0, 0, 0.16)",
        }}
      >
        <TagModalHeader onClose={onClose} title="태그추가" />
        <TagDetailwithColor  />
        <SlimButtonActive
          to="/tag-detail"
          text="추가하기"
          bg= "#F19A37"
          color="#fff" 
          onClick={onClose}/>
      </div>
    </div>
  );
};


// TagUpdateModal.js
export const TagUpdateModal = ({ onClose, tag }) => {
  return (
    <div className="fixed left-0 w-full h-full flex justify-center items-center z-50">
      <div
        className="fixed bottom-0 left-0 box-border flex flex-col justify-center items-center w-full p-10 gap-10 rounded-t-2xl bg-white shadow-xl"
        style={{
          borderTopLeftRadius: "25px",
          borderTopRightRadius: "25px",
          boxShadow: "0px 3px 30px 0px rgba(0, 0, 0, 0.16)",
        }}
      >
        <TagModalHeader onClose={onClose} title='태그수정' />
        <TagDetailwithColor tag={tag}  />
        <SlimButtonActive
          to="/tag-detail"
          text="저장하기"
          bg= "#F19A37"
          color="#fff" 
          onClick={onClose}/>
      </div>
    </div>
  );
};