import React from "react";
import HeaderClose from "../../goaldetailmodal/HeaderClose";
import "tailwindcss/tailwind.css";
import { TitleNormal } from "../../../../components/text/styled";

const TagModalHeader = ({ title, onClose }) => {
  const handleCloseModal = () => {
    onClose(); // 부모 컴포넌트에서 전달된 onClose 함수를 호출하여 모달을 닫습니다.
  };

  return (
    <div className="box-border flex justify-start items-start flex-grow-0 flex-shrink-0 w-[359px] h-11">
      <div className="box-border flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 w-[359px] relative p-2.5">
        <div className="box-border block flex-grow-0 flex-shrink-0 w-6 h-6 relative overflow-hidden"></div>
        <div className="box-border flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-[5px]">
          <TitleNormal >
            {title}
          </TitleNormal>
        </div>

        <button onClick={handleCloseModal}>
          <HeaderClose width="20" height="20" />
        </button>
        
      </div>
    </div>
  );
};

export default TagModalHeader;
