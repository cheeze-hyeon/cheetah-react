import React from "react";
import HeaderClose from "./HeaderClose";
import HeaderDelete from "../Tag/HeaderDelete";
import "tailwindcss/tailwind.css";

const GoalDetailModalHeader = ({ onCloseModal }) => {
  return (
    <div className="box-border flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-full h-fill ">
      <div className="box-border flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 w-full gap-2.5 py-2.5">
        <div className="box-border flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-2.5">
          <button onClick={onCloseModal}>
            <HeaderClose width="24"/>
          </button>
          <div className="box-border flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-[5px]"></div>
          <button>
            <HeaderDelete className="w-[25px] h-[25px] " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalDetailModalHeader;
