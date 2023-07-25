import React from "react";

const GoalCard = ({ goal, onClick }) => {
  const { title, estimated_time, progress_rate, is_scheduled , finish_at, tag, update_at } = goal;
  // 목표 카드를 클릭했을 때 호출되는 함수
  const handleClick = () => {
    if (onClick) {
      onClick(goal);
    }
  };

  const today = new Date().toLocaleDateString();
  const finishDate = new Date(finish_at).toLocaleDateString();
  const isPastDue = new Date(finishDate) < new Date(today);
  const isToday = finishDate === today;

  let message = "";
  let messageColor = "";

  if (is_scheduled === 0) {
    message = "캘린더에 추가되지 않음";
    messageColor = "text-[#6a6a6a]";
  } else if (isPastDue) {
    message = "완주기한 초과";
    messageColor = "text-red-500";
  } else if (isToday) {
    message = "오늘까지 달리기";
  } else {
    message = `${finish_at} 까지 달리기`;
  }

  const formatDateString = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${month}/${day}`;
  };

  const formattedFinishDate = formatDateString(finish_at);
  const calculateRemainingTime = () => {
    const estimatedTimeInMinutes = estimated_time * 60;
    const cumulativeTimeInMinutes = goal.cumulative_time * 60;
    const remainingTimeInMinutes = estimatedTimeInMinutes - cumulativeTimeInMinutes;

    const daysRemaining = Math.floor((new Date(finish_at) - new Date(update_at)) / (1000 * 60 * 60 * 24));
    const dailyAllocationInMinutes = Math.floor(remainingTimeInMinutes / daysRemaining);

    const hours = Math.floor(dailyAllocationInMinutes / 60);
    const minutes = dailyAllocationInMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  return (
    <div
      onClick={handleClick}
      className="box-border flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 w-full h-[107px] gap-2 overflow-y-auto px-[18px] py-[15px] rounded-[5px] bg-white border-t-0 border-r-0 border-b-0 border-l-[6px]"
      style={{
        boxShadow: "0px 1px 5px 0 rgba(0,0,0,0.1)",
        borderLeftColor: tag?.color,
      }}
    >
      <div className="box-border flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2">
        <div className="box-border flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0">
          <div className="box-border flex justify-start items-center flex-grow-0 flex-shrink-0 gap-2">
            {tag && (
              <div
                className={`box-border flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-[7px] py-0.5 rounded-[15px] bg-${tag.color}`}
                style={{ backgroundColor: tag.color }}
              >
                <p className="whitespace-pre-wrap flex-grow-0 flex-shrink-0 font-['Pretendard'] text-xs leading-[19px] font-medium text-left text-[#222b45]">
                  {tag.title}
                </p>
              </div>
            )}
            {is_scheduled ? (
            <>
            <div className="box-border flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-[7px] py-0.5 rounded-[15px] bg-neutral-100">
              <p className="whitespace-pre-wrap flex-grow-0 flex-shrink-0 font-['Pretendard'] text-xs leading-[19px] font-medium text-left text-[#6a6a6a]">
                {calculateRemainingTime()}
              </p>
            </div>
            <div className="box-border flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-[7px] py-0.5 rounded-[15px] bg-neutral-100">
              <p className="whitespace-pre-wrap flex-grow-0 flex-shrink-0 font-['Pretendard'] text-xs leading-[19px] font-medium text-left text-[#6a6a6a]">
                진행률 {Math.floor(progress_rate * 100)}%
              </p>
            </div>
            </>
            ):null}
          </div>

          {is_scheduled ? (
            <div className="box-border flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2.5">
              <p className="whitespace-pre-wrap flex-grow-0 flex-shrink-0 font-['Pretendard'] text-[13px] leading-[19px] font-semibold text-left text-[#a3a2a4]">
                ~{formattedFinishDate}
              </p>
            </div>
          ):null}
        </div>
        <div className="box-border flex justify-start items-start flex-grow-0 flex-shrink-0 gap-[5px]">
          <div className="box-border flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2.5">
            <p className="whitespace-pre-wrap flex-grow-0 flex-shrink-0 font-['Pretendard'] text-[15px] leading-[19px] font-semibold text-left text-black">
              {title}
            </p>
          </div>
        </div>
      </div>
      <div className="box-border flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 gap-2.5">
        <div className="box-border flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2.5">
          <p
            className={`whitespace-pre-wrap flex-grow-0 flex-shrink-0 font-['Pretendard'] text-[13px] leading-[19px] font-semibold text-left ${messageColor}`}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
