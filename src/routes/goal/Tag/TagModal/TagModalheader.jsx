import React from "react";
import HeaderClose from "../../goaldetailmodal/HeaderClose";
import "tailwindcss/tailwind.css";


const TagModalHeader = (props) => {
  return (
    <div className="box-border flex justify-start items-start flex-grow-0 flex-shrink-0 w-[359px] h-11">
      <div className="box-border flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 w-[359px] relative p-2.5">
        <div className="box-border block flex-grow-0 flex-shrink-0 w-6 h-6 relative overflow-hidden" />
        <div className="box-border flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-[5px]">
          <p className="whitespace-pre-wrap flex-grow-0 flex-shrink-0 font-['Pretendard'] text-xl leading-[19px] font-semibold text-left text-black">
            태그추가
          </p>
        </div>
        <HeaderClose />
      </div>
    </div>
  );
};

export default TagModalHeader;