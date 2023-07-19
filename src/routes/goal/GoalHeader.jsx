// GoalHeader.jsx
import React from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";
import HeaderTag from "./HeaderTag";

const GoalHeader = () => {
  return (
    <div className="box-border flex flex-col justify-start items-start w-fit h-fit relative gap-2.5">
      <div className="box-border flex flex-col justify-start items-start flex-grow-0 flex-shrink-0">
        <div className="box-border flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 bg-white">
          <div className="box-border flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 w-[390px] h-[47px] gap-2.5" />
          <div className="box-border flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-2.5 py-5">
            <div className="box-border block flex-grow-0 flex-shrink-0 w-[30px] h-[30px] relative overflow-hidden" />
            <div className="box-border flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-[5px]">
              <p className="whitespace-pre-wrap flex-grow-0 flex-shrink-0 font-['Pretendard'] text-xl leading-[19px] font-semibold text-left text-black">
                내 목표
              </p>
            </div>
            <Link to="/tag-detail">
              <HeaderTag />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalHeader;
