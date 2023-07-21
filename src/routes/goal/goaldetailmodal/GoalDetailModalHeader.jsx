import React from "react";
import HeaderClose from "./HeaderClose";
import HeaderDelete from "../Tag/HeaderDelete";
import "tailwindcss/tailwind.css";

const GoalDetailModalHeader = ({ onClose }) => {
  return (
    <div className="box-border flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[327px] h-11">
      <div className="box-border flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 w-[327px] gap-2.5 py-2.5">
        <div className="box-border flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-2.5">
          <button onClick={onClose}>
            <HeaderClose />
          </button>
          <div className="box-border flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-[5px]">
            <p className="whitespace-pre-wrap flex-grow-0 flex-shrink-0 font-['Pretendard'] text-xl leading-[19px] font-semibold text-left text-black"></p>
          </div>
          <button onClick={onClose}>
            <HeaderDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalDetailModalHeader;
