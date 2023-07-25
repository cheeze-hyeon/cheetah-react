import React, { useState, useEffect } from "react";
import CheckFalse from "./CheckFalse";
import CheckTrue from "./CheckTrue";
import "tailwindcss/tailwind.css";
import { Close } from "../../../components/input/styled";
import HeaderClose from "./HeaderClose";

const TodoCheck = ({ todo }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [title, setTitle] = useState("");
  const [isHidden, setIsHidden] = useState(false); // 추가: 숨기는 상태를 추가합니다.

  useEffect(() => {
    setIsCompleted(todo.is_completed);
    setTitle(todo.title);
  }, [todo]);

  const handleCheckToggle = () => {
    setIsCompleted((prevIsCompleted) => !prevIsCompleted);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDeleteTodo = () => {
    setIsHidden(true); // 삭제 버튼을 클릭하면 해당 투두를 숨기도록 상태를 업데이트합니다.
  };

  if (isHidden) {
    // 숨겨진 투두는 더 이상 렌더링하지 않습니다.
    return null;
  }

  return (
    <div className="box-border flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 w-full h-[38px] px-2 bg-white border-t-0 border-r-0 border-b border-l-0 border-neutral-100">
      <div className="box-border flex justify-between items-center flex-grow basis-full relative">
        <div className="box-border flex justify-start items-center flex-grow basis-full relative gap-[5px]">
          {isCompleted ? (
            <CheckTrue onClick={handleCheckToggle} />
          ) : (
            <CheckFalse onClick={handleCheckToggle} />
          )}
          <div className="box-border flex justify-start items-center flex-grow-0 flex-shrink-0 w-18 relative gap-2.5">
            <input
              type="text"
              value={title}
              className={`whitespace-pre-wrap flex-grow font-['Pretendard'] text-[13px] leading-[19px] text-left ${
                isCompleted ? "text-[#a3a2a4] line-through" : "text-black"
              }`}
              onChange={handleTitleChange}
            />
          </div>
        </div>
        <Close onClick={handleDeleteTodo} color="var(--darkgray)" />
        {/* 추가: 삭제 버튼을 추가합니다. */}
      </div>
    </div>
  );
};

export default TodoCheck;
