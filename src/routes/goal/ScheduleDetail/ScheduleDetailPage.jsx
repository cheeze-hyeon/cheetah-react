import { useState, React, useEffect } from "react";
import { useParams } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { HeaderBack } from "../../../components/header/styled";
import TagList from "../Tag/TagList";
import {
  FieldWithLabel,
  InputTimeField,
  TwoInputDateField,
  TwoDateFieldContainer,
  DateFieldInput,
} from "../../../components/input/styled";
import * as cd from "../../calendar-detail/styled";
import * as t from "../../../components/text/styled";
import { TextLight } from "../../../components/text/styled";
import {
  LargeButtonActive,
  TextBtnWResetIcon,
} from "../../../components/button/styled";
import {
  getGoaldetail,
  getFilteredTags,
  updateGoalwithCalendar,
  updateGoalwithDetail,
} from "../../../apis/api_calendar";
import goals from "../../../data/goals";
import { set } from "date-fns";

const ScheduleDetailPage = () => {
  const { goalId } = useParams(); // URL 파라미터에서 goalId 추출
  const [goal, setGoal] = useState(null);
  const [tagList, setTagList] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState(new Date());
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [residual_time, setResidual_time] = useState(0);
  const [timeError, setTimeError] = useState(""); // 시간 선택 유효성 검사 멘트
  const [progressRate, setProgressRate] = useState(0); // 진행률
  const [selectedTagId, setSelectedTagId] = useState(null);
  const [tagError, setTagError] = useState(""); // 태그 선택 유효성 검사 멘트
  const [newgoal, setNewgoal] = useState(null);
  const [dateError, setDateError] = useState(""); // 날짜 선택 유효성 검사 멘트

  useEffect(() => {
    const getGoaldetailAPI = async () => {
      const response = await getGoaldetail(goalId);
      console.log("받아오는중", response);
      setSelectedTagId(response.tag.id);
      setGoal(response);
      setStartDate(response.start_at);
      setFinishDate(response.finish_at);
      setEstimatedTime(response.estimated_time);
      setProgressRate(response.progress_rate);
      setResidual_time(response.residual_time);
    };
    const getFilteredTagsAPI = async () => {
      const response = await getFilteredTags();
      console.log("tag", response);
      setTagList(response);
    };
    getGoaldetailAPI();
    getFilteredTagsAPI();
  }, []);

  useEffect(() => {
    if (goal === null) {
      return;
    }
    const newgoal_temp = {
      ...goal,
      progress_rate: progressRate,
      estimated_time: estimatedTime,
      residual_time: goal.is_scheduled == 0 ? estimatedTime : residual_time,
      cumulative_time: goal.is_scheduled == 0 ? 0 : goal.cumulative_time,
      is_scheduled: goal.is_scheduled,
      tag_id: selectedTagId,
      start_at: startDate,
      finish_at: finishDate,
    };
    setNewgoal(newgoal_temp);
    console.log("newgoal", newgoal_temp);
  }, [
    progressRate,
    estimatedTime,
    selectedTagId,
    startDate,
    finishDate,
    residual_time,
  ]);

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

  const updateGoalwithCalendarAPI = async () => {
    if (
      (newgoal.progress_rate,
      newgoal.estimated_time,
      newgoal.tag_id,
      newgoal.start_at,
      newgoal.finish_at)
    ) {
      const response = await updateGoalwithCalendar(goalId, newgoal);
      return response;
    } else {
      console.log("실패");
    }
    if (!startDate || !finishDate) {
      setDateError("*날짜를 선택해주세요");
    } else {
      setDateError("");
    }
    if (!estimatedTime) {
      setTimeError("*시간을 입력해주세요");
    } else {
      setTimeError("");
    }
  };

  const updateGoalwithDetailAPI = async () => {
    if (
      (newgoal.progress_rate,
      newgoal.residual_time,
      newgoal.tag_id,
      newgoal.start_at,
      newgoal.finish_at)
    ) {
      const response = await updateGoalwithDetail(goalId, newgoal);
      return response;
    } else {
      console.log("실패");
    }
    if (!startDate || !finishDate) {
      setDateError("*날짜를 선택해주세요");
    }
    if (!estimatedTime) {
      setTimeError("*시간을 입력해주세요");
    }
  };
  // useState를 사용하여 progress_rate 값을 관리합니다.
  console.log("되돌리기 눌리기 전", progressRate);

  // progress_rate 값을 디폴트값으로 돌아가게 하는 함수를 정의합니다.
  const handleResetProgress = () => {
    setProgressRate(goal.progress_rate ? goal.progress_rate : 0);
    console.log("되돌리기 눌림");
    console.log("되돌리기 눌린 뒤", progressRate);
  };

  return (
    goal && (
      <>
        <HeaderBack text={goal?.title}></HeaderBack>
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
            <div className="flex max-w-screen overflow-x-auto w-[390px]">
              <TagList
                tags={tagList}
                onTagClick={handleTagClick}
                goal={goal}
                exceptAll={true}
              ></TagList>
            </div>
          </div>
          <FieldWithLabel label="시작일/종료일">
            <TwoDateFieldContainer>
              <DateFieldInput
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <DateFieldInput
                type="date"
                min={new Date(startDate).toISOString().split("T")[0]}
                value={finishDate}
                onChange={(e) => setFinishDate(e.target.value)}
              />
            </TwoDateFieldContainer>
            {dateError && (
              <TextLight color="var(--orange)">{dateError}</TextLight>
            )}
          </FieldWithLabel>
          <FieldWithLabel
            label={goal.is_scheduled ? "예상 남은시간" : "예상 소요시간"}
          >
            <InputTimeField
              left_time={
                goal.is_scheduled == 1
                  ? goal.estimated_time - goal.cumulative_time
                  : null
              }
              value={goal.is_scheduled ? residual_time : estimatedTime}
              onChange={(e) => {
                goal.is_scheduled
                  ? setResidual_time(e.target.value)
                  : setEstimatedTime(e.target.value);
              }}
            />
            <TextLight style={{ color: "#F19A37" }}>
              현재까지 {goal.cumulative_time}h 소요했어요
            </TextLight>
          </FieldWithLabel>
          <cd.progressLargeContainer>
            <cd.progressTopContainer>
              <t.TextNormal>진행률</t.TextNormal>
              <cd.ProgressSlider
                value={progressRate}
                valueLabelDisplay="on"
                defaultValue={goal.progress_rate}
                step={5}
                onChange={(event, newValue) => {
                  setProgressRate(newValue);
                }}
              />
            </cd.progressTopContainer>
            <TextBtnWResetIcon onClick={handleResetProgress} />
          </cd.progressLargeContainer>
          <LargeButtonActive
            text="저장하기"
            to="/goal"
            backgroundColor="#F19A37"
            color="white"
            onClick={
              goal.is_scheduled
                ? updateGoalwithDetailAPI
                : updateGoalwithCalendarAPI
            }
          />
        </div>
      </>
    )
  );
};

export default ScheduleDetailPage;
