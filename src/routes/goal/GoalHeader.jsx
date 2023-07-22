import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
import HeaderTag from "./HeaderTag";

const GoalHeader = () => {
  const navigate = useNavigate();

  const navigateToTagDetail = () => {
    navigate("/tag-detail");
  };
  
  return (
    <div className="bg-white w-[390px] h-[144px]">
      <div className="flex justify-between items-start px-2.5 py-5 pt-20">
        <div className="w-[30px] h-[30px] overflow-hidden" />
        <div className="flex items-center gap-[5px]">
          <p className="font-['Pretendard'] text-xl font-semibold text-black">
            내 목표
          </p>
        </div>
        <button onClick={navigateToTagDetail}>
          <HeaderTag />
        </button>
      </div>
    </div>
  );
};

export default GoalHeader;
