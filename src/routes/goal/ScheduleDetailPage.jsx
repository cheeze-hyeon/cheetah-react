import React from "react";
import { useParams } from "react-router-dom";
import goals from "../../data/goals";
import "tailwindcss/tailwind.css";

const ScheduleDetailPage = () => {
  const { goalId } = useParams(); // URL 파라미터에서 goalId 추출
  const goal = goals.find((goal) => goal.id === parseInt(goalId, 10)); // goalId를 이용하여 해당 goal을 찾음

  return (
    <div>
      {/* goal의 정보를 이용하여 원하는 정보를 표시 */}
      <p>Tag: {goal.tag_id}</p>
      <p>Start Date: {goal.start_at}</p>
      <p>End Date: {goal.finish_at}</p>
      <p>Available Days: {goal.available_days.join(", ")}</p>
      <p>Estimated Time: {goal.estimated_time}</p>
      <p>Progress Rate: {goal.progress_rate}</p>
      {/* 기타 필요한 정보를 추가적으로 표시 */}
    </div>
  );
};

export default ScheduleDetailPage;
