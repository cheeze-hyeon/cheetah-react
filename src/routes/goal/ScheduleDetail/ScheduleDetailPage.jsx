import { useState, React } from "react";
import { useParams } from "react-router-dom";
import goals from "../../../data/goals";
import "tailwindcss/tailwind.css";
import { HeaderBack } from "../../../components/header/styled";
import TagList from "../Tag/TagList";
import tags from "../../../data/tags";
import { FieldWithLabel } from "../../../components/input/styled";
import { Datepicker, Button, Page } from "@mobiscroll/react";
import * as s from "../../calendar/styled";
import * as cd from "../../calendar-detail/styled";
import * as t from "../../../components/text/styled";
import { DatepickerWrapper } from "../../calendar/styled";
import { TextLight } from "../../../components/text/styled";
import { LargeButtonActive, TextBtnWResetIcon } from "../../../components/button/styled";

const ScheduleDetailPage = () => {
  const { goalId } = useParams(); // URL 파라미터에서 goalId 추출
  const goal = goals.find((goal) => goal.id === parseInt(goalId, 10)); // goalId를 이용하여 해당 goal을 찾음
  const [selectedTagId, setSelectedTagId] = useState(null);
  const handleTagClick = (tagId) => {
    setSelectedTagId(tagId);
  };
  console.log(goal.tag_id)
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

  return (
    <><HeaderBack text={goal.title}></HeaderBack>
    <div
      style={{
        display: "inline-flex",
        height: "702px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "40px",
        flexShrink: 0,
        width: "350px"
      }}>

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
        <s.DatepickerWrapper>
          <Datepicker
            controls={["calendar"]}
            select="range"
            inputProps={boxInputProps}
            className="w-5/6" />
        </s.DatepickerWrapper>
      </FieldWithLabel>
      <FieldWithLabel label="예상 소요시간">
        <s.DatepickerWrapper>
          <Datepicker
            controls={["time"]}
            timeFormat="HH:mm"
            headerText="hour minutes"
            inputProps={
              // label: "Hour, Min",
              boxInputProps2} />
        </s.DatepickerWrapper>
        {/* <InputTimeField /> */}
        <TextLight style={{ color: "#F19A37" }}>
          현재까지 {goal.cumulative_time}h 소요했어요
        </TextLight>
      </FieldWithLabel>
      <cd.progressLargeContainer>
        <cd.progressTopContainer>
          <t.TextNormal>진행률</t.TextNormal>
          <cd.ProgressSlider valueLabelDisplay="on" />
        </cd.progressTopContainer>
        <TextBtnWResetIcon />
      </cd.progressLargeContainer>
      <LargeButtonActive
        text="저장하기"
        to="/goal"
        backgroundColor="#F19A37"
        color="white"
      ></LargeButtonActive>
    </div></>
  );
};

export default ScheduleDetailPage;
