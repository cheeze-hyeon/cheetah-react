import React, { useEffect } from "react";
import format from "date-fns/format";

const GoalCard = ({ goal, onClick }) => {
  const {
    title,
    estimated_time,
    progress_rate,
    is_scheduled,
    finish_at,
    tag,
    update_at,
  } = goal;
  // 목표 카드를 클릭했을 때 호출되는 함수
  // const handleClick = () => {
  //   if (onClick) {
  //     onClick(goal);
  //   }
  // };
  console.log("~~~~~~");
  console.log(goal);
  const today = new Date().toLocaleDateString();
  const finishDate = new Date(finish_at).toLocaleDateString();
  const isPastDue = new Date(finishDate) < new Date(today);
  const isToday = finishDate === today;

  let message = "";
  let messageColor = "";

  const getDday = (date) => {
    // 날짜 객체로 변환
    const startDate = new Date();
    const endDate = new Date(date);

    // 하루를 밀리초로 나타냄
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

    // 두 날짜 사이의 일수 계산
    const timeDifferenceInMilliseconds = endDate - startDate;
    const daysBetweenDates = Math.round(
      timeDifferenceInMilliseconds / oneDayInMilliseconds
    );
    return daysBetweenDates;
  };

  if (is_scheduled === false) {
    message = "캘린더에 추가되지 않음";
    messageColor = "text-gray";
  } else if (goal.is_completed === true) {
    console.log("~~~~~~~~~~~~");
    console.log(goal);
    message = `${format(new Date(goal.update_at), "M/d")}에 완료`;
    messageColor = "text-brown";
  } else if (isPastDue) {
    message = "완주기한 초과";
    messageColor = "text-orange";
  } else if (isToday) {
    message = "🔥 오늘까지 달리기";
    messageColor = "text-orange";
  } else {
    message = `⏱ ${getDday(finish_at)}일 남음`;
    messageColor = "text-brown";
  }

  const formatDateString = (dateString) => {
    if (dateString === null) {
      console.log("dateString is null");
      return dateString;
    }
    const [year, month, day] = dateString.split("-");
    return `${month}/${day}`;
  };

  const formattedFinishDate = formatDateString(finish_at);

  const calculateRemainingTime = (goal) => {
    const remainingTimeInMinutes = goal.residual_time * 60;

    const hours = Math.floor(remainingTimeInMinutes / 60);
    const minutes = Math.floor(remainingTimeInMinutes % 60);
    return goal.is_completed === false ? `총 ${hours}h ${minutes}m` : "완료";
  };

  return (
    <div
      onClick={() => onClick(goal)}
      className="box-border flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 w-full h-[111px] gap-2 overflow-y-auto px-[18px] py-[15px] rounded-[5px] bg-white border-t-0 border-r-0 border-b-0 border-l-[6px]"
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
                    {calculateRemainingTime(goal)}
                  </p>
                </div>
                <div className="box-border flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-[7px] py-0.5 rounded-[15px] bg-neutral-100">
                  <p className="whitespace-pre-wrap flex-grow-0 flex-shrink-0 font-['Pretendard'] text-xs leading-[19px] font-medium text-left text-[#6a6a6a]">
                    진행률 {Math.floor(progress_rate)}%
                  </p>
                </div>
              </>
            ) : null}
          </div>

          {is_scheduled ? (
            <div className="box-border flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2.5">
              <p className="whitespace-pre-wrap flex-grow-0 flex-shrink-0 font-['Pretendard'] text-[13px] leading-[19px] font-semibold text-left text-brown">
                ~{formattedFinishDate}
              </p>
            </div>
          ) : null}
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
