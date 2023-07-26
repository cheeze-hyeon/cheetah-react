import { useState, React } from "react";
import { useParams } from "react-router-dom";
import goals from "../../../data/goals";
import "tailwindcss/tailwind.css";
import { HeaderBack } from "../../../components/header/styled";
import TagList from "../Tag/TagList";
import tags from "../../../data/tags";
import { FieldWithLabel, InputTimeField, TwoInputDateField } from "../../../components/input/styled";
import * as cd from "../../calendar-detail/styled";
import * as t from "../../../components/text/styled";
import { TextLight } from "../../../components/text/styled";
import { LargeButtonActive, TextBtnWResetIcon } from "../../../components/button/styled";

const ScheduleDetailPage = () => {
  const { goalId } = useParams(); // URL 파라미터에서 goalId 추출
  const goal = goals.find((goal) => goal.id === parseInt(goalId, 10)); // goalId를 이용하여 해당 goal을 찾음
  const [selectedTagId, setSelectedTagId] = useState(null);
  const handleTagClick = (tagId) => {
    setSelectedTagId(tagId);
  };
  const boxInputProps = {
    className: "w-full",
    inputStyle: "box",
    placeholder: "기간 선택하기",
  };
  const boxInputProps2 = {
    className: "w-full",
    inputStyle: "box",
    placeholder: "시간 선택하기",
  };

  // useState를 사용하여 progress_rate 값을 관리합니다.
  const [progressRate, setProgressRate] = useState(goal.progress_rate);
  console.log("되돌리기 눌리기 전", progressRate);

  // progress_rate 값을 디폴트값으로 돌아가게 하는 함수를 정의합니다.
  const handleResetProgress = () => {
    setProgressRate(goal.progress_rate);
    console.log("되돌리기 눌림");
    console.log("되돌리기 눌린 뒤", progressRate);
  };

  return (
    <>
      <HeaderBack text={goal.title}></HeaderBack>
      <div
        style={{
          display: "inline-flex",
          height: "702px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "40px",
          flexShrink: 0,
          width: "350px",
        }}
      >
        <div className=" h-[64px]">
          <FieldWithLabel label="태그 선택"></FieldWithLabel>
          <div className="flex max-w-screen overflow-x-auto">
            <TagList
              tags={tags}
              selectedTagId={selectedTagId}
              onTagClick={handleTagClick}
              goal={goal}
            ></TagList>
          </div>
        </div>
        <FieldWithLabel label="시작일/종료일">
          <TwoInputDateField
            start_at={goal.is_scheduled == 1 ? goal.start_at : null}
            finish_at={goal.is_scheduled == 1 ? goal.finish_at : null}
          />
        </FieldWithLabel>
        <FieldWithLabel label="예상 소요시간">
          <InputTimeField
            left_time={goal.is_scheduled == 1 ? goal.estimated_time - goal.cumulative_time : null}
          />
          <TextLight style={{ color: "#F19A37" }}>
            현재까지 {goal.cumulative_time}h 소요했어요
          </TextLight>
        </FieldWithLabel>
        <cd.progressLargeContainer>
          <cd.progressTopContainer>
            <t.TextNormal>진행률</t.TextNormal>
            <cd.ProgressSlider
              progress_rate={progressRate}
              valueLabelDisplay="on"
              defaultValue={goal.progress_rate * 100}
              step={5}
            />
          </cd.progressTopContainer>
          <TextBtnWResetIcon onClick={handleResetProgress} />
        </cd.progressLargeContainer>
        <LargeButtonActive text="저장하기" to="/goal" backgroundColor="#F19A37" color="white" />
      </div>
    </>
  );
};

export default ScheduleDetailPage;
