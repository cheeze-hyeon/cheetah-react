// GoalDetailModal.js
import { React, useState } from "react";
import GoalDetailModalHeader from "./GoalDetailModalHeader";
import "tailwindcss/tailwind.css";
import TodoCheck from "./TodoCheck";
import tags from "../../../data/tags";
import { Link } from "react-router-dom"; // react-router-dom에서 Link 컴포넌트를 불러옵니다.

const GoalDetailModal = ({ goal, todos, onCloseModal }) => {

  const {
    title,
    estimated_time,
    progress_rate,
    cumulative_time,
    finish_at,
    tag_id,
    update_at,
    is_scheduled,
  } = goal;

  const tag = tags.find((tag) => tag.id === goal.tag_id);
  const today = new Date().toLocaleDateString();
  const finishDate = new Date(finish_at).toLocaleDateString();
  const isPastDue = new Date(finishDate) < new Date(today);
  const isToday = finishDate === today;
  let message = isPastDue
    ? "완주기한 초과"
    : isToday
    ? "오늘까지 달리기"
    : `${finish_at} 까지 달리기`;

  const formatDateString = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${month}/${day}`;
  };

  const formattedFinishDate = formatDateString(finish_at);

  const calculateRemainingTime = () => {
    const estimatedTimeInMinutes = estimated_time * 60;
    const cumulativeTimeInMinutes = cumulative_time * 60;
    const remainingTimeInMinutes =
      estimatedTimeInMinutes - cumulativeTimeInMinutes;

    const daysRemaining = Math.floor(
      (new Date(finish_at) - new Date(update_at)) / (1000 * 60 * 60 * 24)
    );
    const dailyAllocationInMinutes = Math.floor(
      remainingTimeInMinutes / daysRemaining
    );

    const hours = Math.floor(dailyAllocationInMinutes / 60);
    const minutes = dailyAllocationInMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const filteredTodos = todos.filter((todo) => todo.goal_id === goal.id);

  const [newTodoTitle, setNewTodoTitle] = useState(""); // 추가할 투두의 제목을 상태로 관리합니다.

  const [showAddTodoField, setShowAddTodoField] = useState(false);

  const handleAddTodo = () => {
    // "투두 추가하기" 버튼을 누를 때 호출되는 함수입니다.
    setShowAddTodoField(true); // 투두 추가 텍스트 필드를 보여주도록 상태를 업데이트합니다.
  };

  const handleAddTodoEnter = (e) => {
    // 투두 추가 텍스트 필드에서 엔터를 눌렀을 때 호출되는 함수입니다.
    if (e.key === "Enter" && newTodoTitle.trim() !== "") {
      // 엔터를 누르고 투두 제목이 비어있지 않은 경우에만 추가합니다.
      const newTodo = {
        id: Math.random().toString(),
        goal_id: goal.id,
        title: newTodoTitle.trim(),
        is_completed: false,
      };

      setNewTodoTitle("");
      todos.push(newTodo);
      setShowAddTodoField(false); // 투두 추가 텍스트 필드를 숨깁니다.
    }
  };
  const handleCancelAddTodo = () => {
    // 취소 버튼을 누를 때 호출되는 함수입니다.
    setNewTodoTitle(""); // 입력 필드 초기화
    setShowAddTodoField(false); // 투두 추가 텍스트 필드를 숨깁니다.
  };

  const handleEditButtonClick = () => {
    // "상세정보 수정하기" 버튼을 누를 때 호출되는 함수입니다.
    console.log("상세정보 수정하기 버튼이 클릭되었습니다.");
  };
  const handleAddToCalendar = () => {
    // "캘린더에 추가하기" 버튼을 클릭했을 때 호출되는 함수입니다.
    console.log("캘린더에 추가하기 버튼이 클릭되었습니다.");
    window.location.href = `/scheduledetailpage/${goal.id}`;
  };
  const hasTodos = filteredTodos.length > 0 || showAddTodoField == true;
  return (
    <div className="box-border top-0 flex flex-col justify-top items-start self-stretch flex-grow-0 flex-shrink-0 w-[357px] h-fill gap-5 pb-10">
      <GoalDetailModalHeader onCloseModal={onCloseModal} />
      <div className="box-border flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 w-full h-fill px-2.5">
        <div className="box-border flex justify-start items-center flex-grow-0 flex-shrink-0 gap-2">
          {/* is_scheduled가 0이 아닌 경우에만 Tag 정보를 표시 */}
          {tag && (
            <div
              className="box-border flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-[7px] py-0.5 rounded-[15px] bg-neutral-100"
              style={{ backgroundColor: tag.color }}
            >
              <p className="whitespace-pre-wrap flex-grow-0 flex-shrink-0 font-['Pretendard'] text-xs leading-[19px] font-medium text-left text-[#222b45]">
                {tag.title}
              </p>
            </div>
          )}
          {is_scheduled === 0 && (
            <p className="whitespace-pre-wrap flex-grow-0 flex-shrink-0 font-['Pretendard'] text-xs leading-[19px] font-medium text-left text-[#222b45]">
              캘린더에 추가되지 않음
            </p>
          )}
          {/* is_scheduled가 0이 아닌 경우에만 남은 시간 표시 */}
          {is_scheduled !== 0 && (
            <div className="box-border flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-[7px] py-0.5 rounded-[15px] bg-neutral-100">
              <p className="whitespace-pre-wrap flex-grow-0 flex-shrink-0 font-['Pretendard'] text-xs leading-[19px] font-medium text-left text-[#6a6a6a]">
                {calculateRemainingTime()}
              </p>
            </div>
          )}

          {/* is_scheduled가 0이 아닌 경우에만 진행률 표시 */}
          {is_scheduled !== 0 && (
            <div className="box-border flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-[7px] py-0.5 rounded-[15px] bg-neutral-100">
              <p className="whitespace-pre-wrap flex-grow-0 flex-shrink-0 font-['Pretendard'] text-xs leading-[19px] font-medium text-left text-[#6a6a6a]">
                진행률 {Math.floor(progress_rate * 100)}%
              </p>
            </div>
          )}
        </div>
        <div className="box-border flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 p-2.5 rounded-lg bg-white">
          <div className="box-border flex flex-col justify-center items-start flex-grow basis-full h-[19px] gap-2.5">
            <div className="box-border flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-[5px]">
              <p className="whitespace-pre-wrap flex-grow font-['Pretendard'] text-xl leading-[19px] font-semibold text-left text-black">
                {title}
              </p>
            </div>
          </div>
        </div>
        <div className="box-border flex justify-end items-center flex-grow-0 flex-shrink-0 w-[330px] relative gap-2.5 px-2.5">
          <p className="whitespace-pre-wrap flex-grow-0 flex-shrink-0 font-['Pretendard'] text-[13px] leading-[19px] font-semibold text-left text-[#716a56]">
            {/* is_scheduled가 0이 아닌 경우에만 남은 일정 표시 */}
            {is_scheduled !== 0 && `${formattedFinishDate}까지 달리기`}
          </p>
        </div>
      </div>

      <div className="box-border flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 w-full h-fill px-2.5">
        {/* 할일이 있는 경우에만 TodoCheck 컴포넌트들을 렌더링 */}
        {hasTodos && filteredTodos.map((todo) => <TodoCheck key={todo.id} todo={todo} />)}
        {/* 할일이 없는 경우 "할일이 없습니다" 메시지를 렌더링 */}
        {!hasTodos && <p className="text-sm text-gray-500 font-medium">할일이 없어요:) </p>}
        {/* 투두 추가하기 버튼 */}
        {showAddTodoField ? (
          <div className="box-border flex items-center w-full gap-2">
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              onKeyPress={handleAddTodoEnter}
              className="flex-grow block w-50 px-5 py-1.5 text-base border border-neutral-100 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="할일을 입력하세요"
            />
            <button
              className="font-['Pretendard'] text-[13px] text-black font-medium"
              onClick={handleCancelAddTodo}
            >
              취소
            </button>
          </div>
        ) : (
          <button
            className="self-end font-['Pretendard'] text-[13px] text-black font-medium"
            onClick={handleAddTodo}
          >
            + 투두 추가하기
          </button>
        )}
      </div>
      <Link
        to={`/scheduledetailpage/${goal.id}`}
        className={`flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0  font-['Pretendard'] text-[15px] ${
          is_scheduled === 0 ? "bg-lightGray" : "bg-orange"
        } rounded-lg`}
        style={{
          display: "flex",
          height: "40px",
          padding: "0px 20px",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "stretch",
          backgroundColor: is_scheduled === 0 ? "#EAEEF1" : "#F19A37",
          color: is_scheduled === 0 ? "black" : "white",
        }}
        onClick={
          is_scheduled === 0 ? handleAddToCalendar : handleEditButtonClick
        }
      >
        {/* is_scheduled에 따라 버튼의 내용이 달라집니다. */}
        {is_scheduled === 0 ? "캘린더에 추가하기" : "상세정보 수정하기"}
      </Link>
    </div>
  );
};
export default GoalDetailModal;
