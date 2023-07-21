// TodoCheck.js
import React, { useState, useEffect } from "react";
import HeaderClose from "./HeaderClose";
import CheckFalse from "./CheckFalse";
import CheckTrue from "./CheckTrue";
import "tailwindcss/tailwind.css";

const TodoCheck = ({ todo }) => { // 각각의 할 일(todo)을 전달 받습니다.
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setIsCompleted(todo.is_completed); // 각 할 일의 완료 상태를 설정합니다.
  }, [todo]);

  const handleCheckToggle = () => {
    setIsCompleted((prevIsCompleted) => !prevIsCompleted);
  };

  return (
    <div className="box-border flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 w-full h-[38px] px-2.5 bg-white border-t-0 border-r-0 border-b border-l-0 border-neutral-100">
      <div className="box-border flex justify-between items-center flex-grow basis-full relative">
        <div className="box-border flex justify-start items-center flex-grow basis-full relative gap-[5px]">
          {/* Pass handleCheckToggle function to both CheckTrue and CheckFalse components */}
          {isCompleted ? <CheckTrue onClick={handleCheckToggle} /> : <CheckFalse onClick={handleCheckToggle} />}
          <div className="box-border flex justify-start items-center flex-grow-0 flex-shrink-0 w-18 relative gap-2.5">
            <p
              className={`whitespace-pre-wrap flex-grow font-['Pretendard'] text-[13px] leading-[19px] text-left ${
                isCompleted ? "text-[#a3a2a4] line-through" : "text-black"
              }`}
            >
              {todo.title} {/* 각 할 일(todo)의 제목을 보여줍니다. */}
            </p>
          </div>
        </div>
        <HeaderClose />
      </div>
    </div>
  );
};

export default TodoCheck;
