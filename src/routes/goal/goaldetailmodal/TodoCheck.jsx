import React, { useState, useEffect } from "react";
import CheckFalse from "./CheckFalse";
import CheckTrue from "./CheckTrue";
import "tailwindcss/tailwind.css";
import { Close } from "../../../components/input/styled";
import HeaderClose from "./HeaderClose";
import { TextLight } from "../../../components/text/styled";

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
    <div className="flex flex-row px-[10px] gap-[5px] items-center">
      {isCompleted ? (
        <CheckTrue onClick={handleCheckToggle} />
      ) : (
        <CheckFalse onClick={handleCheckToggle} />
      )}
      <TextLight
        className={`${
          isCompleted ? "text-[#a3a2a4]" : "text-black"
        }`}
      >
        <input
          type="text"
          value={title}
          className={`whitespace-pre-wrap w-[240px] mr-[5px]${
            isCompleted ? "text-[#a3a2a4] line-through" : "text-black"
          }`}
          onChange={handleTitleChange}
        />
      </TextLight>
      <button onClick={handleDeleteTodo}>
        <HeaderClose width="20" height="20" />
      </button>
    </div>
  );
};

export default TodoCheck;
