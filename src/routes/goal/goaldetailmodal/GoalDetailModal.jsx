// GoalDetailModal.js
import React from "react";
import GoalDetailModalHeader from "./GoalDetailModalHeader";
import "tailwindcss/tailwind.css";
import TodoCheck from "./TodoCheck";
import tags from "../../../data/tags";

const GoalDetailModal = ({ goal, todos, onCloseModal }) => {
  const {
    title,
    estimated_time,
    progress_rate,
    cumulative_time,
    finish_at,
    tag_id,
    update_at,
    is_scheduled, // 추가: is_scheduled를 받아옴
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

  const handleCloseModal = () => {
    onCloseModal(); // GoalMainPage 컴포넌트에서 전달받은 onCloseModal 함수를 호출하여 모달을 닫습니다.
  };

  const filteredTodos = todos.filter((todo) => todo.goal_id === goal.id);

  return (
    <div className="box-border top-4 flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 w-[357px] h-[500px] gap-5 pb-10">
      <GoalDetailModalHeader />
      <div className="box-border flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 w-full h-[91px] gap-5 px-2.5">
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
        <div className="box-border flex justify-end items-center flex-grow-0 flex-shrink-0 w-[327px] relative gap-2.5 px-2.5">
          <p className="whitespace-pre-wrap flex-grow-0 flex-shrink-0 font-['Pretendard'] text-[13px] leading-[19px] font-semibold text-left text-[#716a56]">
            {/* is_scheduled가 0이 아닌 경우에만 남은 일정 표시 */}
            {is_scheduled !== 0 && `${formattedFinishDate}까지 달리기`}
          </p>
        </div>
      </div>

      <div className="box-border flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 w-full h-[220px] px-2.5">
        {/* todos 배열을 순회하면서 TodoCheck 컴포넌트를 렌더링 */}
        {filteredTodos.map((todo) => (
          <TodoCheck key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default GoalDetailModal;
