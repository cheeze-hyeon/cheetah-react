import React from "react";
import HeaderBack from "./HeaderBack";
import HeaderPlus from "./HeaderPlus";

const PageBothBtn = (props) => {
  return (
    <div className="box-border flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[390px] h-[117px]">
      <div className="box-border flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative overflow-hidden bg-white">
        <div className="box-border flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-[15px] py-5">
          <HeaderBack />
          <div className="box-border flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-[5px]">
            <p className="whitespace-pre-wrap flex-grow-0 flex-shrink-0 font-['Pretendard'] text-xl leading-[19px] font-semibold text-left text-black">
              태그 관리
            </p>
          </div>
          <HeaderPlus />
        </div>
      </div>
    </div>
  );
};

export default PageBothBtn;
