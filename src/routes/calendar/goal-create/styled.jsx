import styled from "styled-components";
import {
  HeaderModal,
  HeaderModalBack,
} from "../../../components/header/styled";
import {
  FieldWithLabel,
  InputTextFieldActive,
  TwoDateFieldContainer,
  InputDateField,
  DateFieldInput,
  TimeFieldInput,
} from "../../../components/input/styled";
import {
  TagDefault,
  TextBtnSmall,
  TwoButton,
  LargeButtonActive,
} from "../../../components/button/styled";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AddTodoField,
  NewTodoInput,
} from "../../calendar-detail/goal-detail/styled";
import { NewTodo } from "../../../components/input/styled";
import {
  createGoal,
  createGoalwithCalendar,
  getFilteredTags,
} from "../../../apis/api_calendar";
import { TextLight } from "../../../components/text/styled";
import format from "date-fns/format";
import { add, set } from "date-fns";
import { is } from "date-fns/locale";
import { debounce } from "@mui/material";
import { useCallback } from "react";
import { slideUp } from "../../../components/modal/styled";

export const GoalCreateModal = ({
  clickBtnBack,
  step,
  addModalStep,
  modalClose,
}) => {
  // 활성화된(눈깔 켜진) 태그
  const [tags, setTags] = useState([]);

  // 선택한 태그 아이디
  const [selectedTagId, setSelectedTagId] = useState(null);
  const [tagError, setTagError] = useState(""); // 태그 선택 유효성 검사 멘트

  // 목표 제목
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");

  // 시작 날짜, 종료 날짜
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState(new Date());
  const [dateError, setDateError] = useState(""); // 날짜 선택 유효성 검사 멘트

  // 달릴 요일
  const [selectedDays, setSelectedDays] = useState({
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: true,
    sun: true,
  });
  // 불가능한 날짜
  const [impossibleDates, setImpossibleDates] = useState([]);

  // 예상 소요시간
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [timeError, setTimeError] = useState(""); // 시간 선택 유효성 검사 멘트

  // 투두
  const [newTodos, setNewTodos] = useState([]); // 투두 리스트
  const [newTodoTitle, setNewTodoTitle] = useState(""); // 추가할 투두의 제목
  const [showAddTodoField, setShowAddTodoField] = useState(false); // 투두 추가 텍스트 필드의 노출 상태

  // 캘린더에 추가하지 않는 목표
  const [newGoal, setNewGoal] = useState({
    tag_id: "",
    title: "",
  });

  // 캘린더에 추가하는 목표
  const [newGoalWithCalendar, setNewGoalWithCalendar] = useState({
    tag_id: "",
    title: "",
    start_at: null,
    finish_at: null,
    estimated_time: 0,
    impossible_dates: [],
    todo_list: [],
  });

  //불가능한 날짜 생성기.
  const generateImpossibleDates = (startDate, finishDate, selectedDays) => {
    const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const impossibleDates = [];

    const currentDate = new Date(startDate);
    const endDate = new Date(finishDate);

    while (currentDate <= endDate) {
      const dayOfWeek = daysOfWeek[currentDate.getDay()];
      if (!selectedDays[dayOfWeek]) {
        impossibleDates.push(format(currentDate, "yyyy-MM-dd"));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return impossibleDates;
  };

  // 입력값이 바뀔 때마다 전달할 목표 업데이트
  useEffect(() => {
    const goal = {
      ...newGoal,
      tag_id: selectedTagId,
      title: title,
      todo_list: newTodos,
    };

    const impossibleDates = generateImpossibleDates(
      startDate,
      finishDate,
      selectedDays
    );

    const goalWithCalendar = {
      ...newGoalWithCalendar,
      tag_id: selectedTagId,
      title: title,
      start_at: startDate,
      finish_at: finishDate,
      estimated_time: estimatedTime,
      impossible_dates: impossibleDates,
      todo_list: newTodos,
    };

    console.log(goalWithCalendar);

    setNewGoal(goal);
    setNewGoalWithCalendar(goalWithCalendar);
  }, [
    selectedTagId,
    title,
    startDate,
    finishDate,
    estimatedTime,
    newTodos,
    selectedDays,
  ]);

  // 태그 불러오기
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const allTags = await getFilteredTags();
        setTags(allTags);
      } catch (error) {
        console.log("[ERROR] error while getting all tags");
      }
    };
    fetchTags();
  }, []);

  // 태그 선택
  const handleTagClick = (tagId) => {
    setSelectedTagId(tagId);
  };

  // 태그의 선택여부
  const isSelected = (tag) => {
    return selectedTagId === tag.id;
  };

  // 달릴요일 선택
  const handleDayClick = (dayId) => {
    setSelectedDays((prevSelectedDays) => ({
      ...prevSelectedDays,
      [dayId]: !prevSelectedDays[dayId],
    }));
  };

  // 투두 추가하기 버튼 클릭
  const handleAddTodo = () => {
    setShowAddTodoField(true); // 투두 추가 텍스트 필드를 보여주도록 상태를 업데이트합니다.
  };

  const handleAddTodoEnter = (e) => {
    if (e.key === "Enter" && newTodoTitle.trim() !== "") {
      const newTodo = {
        title: newTodoTitle.trim(),
      };
      setNewTodoTitle("");
      setNewTodos((prevTodos) => [...prevTodos, newTodo]);
      setShowAddTodoField(false);
    }
  };

  const handleCancelAddTodo = () => {
    // 취소 버튼을 누를 때 호출되는 함수입니다.
    setNewTodoTitle(""); // 입력 필드 초기화
    setShowAddTodoField(false); // 투두 추가 텍스트 필드를 숨깁니다.
  };

  const handleDeleteTodo = (deletedTodo) => {
    // newTodos 상태에서 삭제된 투두를 필터링합니다.
    setNewTodos((prevTodos) =>
      prevTodos.filter((todo) => todo !== deletedTodo)
    );
  };

  // 캘린더에 추가 버튼 클릭 시 실행되는 함수
  const handleCalendarAddBtn = () => {
    selectedTagId && title
      ? addModalStep()
      : console.log("캘린더 추가 불가 - 모든 값 입력되지 않음");
    if (!selectedTagId) {
      setTagError("*태그를 선택해주세요"); // tagId가 비어있는 경우 오류 멘트 설정
      return;
    } else {
      setTagError("");
    }
    if (!title) {
      setTitleError("*제목을 입력해주세요"); // title이 비어있는 경우 오류 멘트 설정
      return;
    } else {
      setTitleError("");
    }
  };

  //1. 일반 목표 추가 data={tag:,title:,todo_list=[]}
  const addGoal = async (data) => {
    if (selectedTagId && title) {
      const goal = await createGoal(data);
      console.log("목표 추가 완료!", goal);
      window.location.reload();
      return;
    } else {
      console.log("목표 추가 불가 - 모든 값이 입력되지 않음");
    }
    if (!selectedTagId) {
      setTagError("*태그를 선택해주세요"); // tagId가 비어있는 경우 오류 멘트 설정
    } else {
      setTagError("");
    }
    if (!title) {
      setTitleError("*제목을 입력해주세요"); // title이 비어있는 경우 오류 멘트 설정
    } else {
      setTitleError("");
    }
  };
  //2. 캘린더에 추가하는 일정 목표 추가
  const addGoalwithCalendar = async (data) => {
    console.log(data);
    if (data.start_at && data.finish_at && data.estimated_time) {
      const goal = await createGoalwithCalendar(data);
      console.log("일정에 등록된 목표 추가 완료!", goal);
      console.log("목표 추가 완료!", goal);
      window.location.reload();
      return;
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
  const onClick_calendarAddBtn = () => {
    addGoalwithCalendar(newGoalWithCalendar);
  };
  const onClick2_calendarAddBtn = debounce(onClick_calendarAddBtn, 300, true);
  const onClick3_calendarAddBtn = useCallback(onClick2_calendarAddBtn, [
    newGoalWithCalendar,
  ]);
  const onClick = () => {
    addGoal(newGoal);
  };
  const onClick2 = debounce(onClick, 300, true);
  const onClick3 = useCallback(onClick2, [newGoal]);

  return (
    <GoalCreateModalContainer>
      <GoalCreateModalElementContainer>
        {step === 1 ? (
          <HeaderModal text="목표 추가" modalClose={modalClose} />
        ) : (
          <HeaderModalBack
            text="캘린더에 추가"
            modalClose={modalClose}
            clickBtnBack={clickBtnBack}
          />
        )}
        <InputContainer>
          {step === 1 ? (
            <>
              <FieldWithLabel label="태그 선택">
                <TagsWrapper>
                  {Array.isArray(tags) && // tags가 배열인지 확인하고, 배열일 때에만 map 함수를 사용합니다.
                    tags.map((tag) => (
                      <TagDefault
                        key={tag.id}
                        color={tag.color}
                        text={tag.title}
                        isSelected={isSelected(tag)}
                        onClick={() => handleTagClick(tag.id)}
                      />
                    ))}
                </TagsWrapper>
                {tagError && (
                  <TextLight color="var(--orange)">{tagError}</TextLight>
                )}
              </FieldWithLabel>
              <FieldWithLabel label="일정 제목">
                <InputTextFieldActive
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목 입력"
                />
                {titleError && (
                  <TextLight color="var(--orange)">{titleError}</TextLight>
                )}
              </FieldWithLabel>
              <FieldWithLabel label="하위 투두">
                <TodosWrapper>
                  {newTodos.map((todo, index) => (
                    <NewTodo
                      key={index}
                      todo={todo}
                      onDelete={handleDeleteTodo}
                    />
                  ))}
                  {showAddTodoField && (
                    <AddTodoField>
                      <NewTodoInput
                        type="text"
                        value={newTodoTitle}
                        onChange={(e) => setNewTodoTitle(e.target.value)}
                        onKeyPress={handleAddTodoEnter}
                        placeholder="할일을 입력하세요"
                      />
                      <button
                        className="font-['Pretendard'] text-[13px] text-black font-medium"
                        onClick={() => handleCancelAddTodo} // 취소 버튼을 누르면 handleCancelAddTodo 함수가 호출됩니다.
                      >
                        취소
                      </button>
                    </AddTodoField>
                  )}
                  {!showAddTodoField && (
                    <TextBtnSmall
                      onClick={handleAddTodo}
                      text="+ 투두 추가하기"
                    />
                  )}
                </TodosWrapper>
              </FieldWithLabel>
            </>
          ) : (
            <>
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
              <FieldWithLabel label="달릴 요일">
                <DaysWrapper>
                  <TagDefault
                    key="mon"
                    color="var(--light-gray)"
                    text="월"
                    isSelected={selectedDays["mon"]}
                    onClick={() => handleDayClick("mon")}
                  />
                  <TagDefault
                    key="tue"
                    color="var(--light-gray)"
                    text="화"
                    isSelected={selectedDays["tue"]}
                    onClick={() => handleDayClick("tue")}
                  />
                  <TagDefault
                    key="wed"
                    color="var(--light-gray)"
                    text="수"
                    isSelected={selectedDays["wed"]}
                    onClick={() => handleDayClick("wed")}
                  />
                  <TagDefault
                    key="thu"
                    color="var(--light-gray)"
                    text="목"
                    isSelected={selectedDays["thu"]}
                    onClick={() => handleDayClick("thu")}
                  />
                  <TagDefault
                    key="fri"
                    color="var(--light-gray)"
                    text="금"
                    isSelected={selectedDays["fri"]}
                    onClick={() => handleDayClick("fri")}
                  />
                  <TagDefault
                    key="sat"
                    color="var(--light-gray)"
                    text="토"
                    isSelected={selectedDays["sat"]}
                    onClick={() => handleDayClick("sat")}
                  />
                  <TagDefault
                    key="sun"
                    color="var(--light-gray)"
                    text="일"
                    isSelected={selectedDays["sun"]}
                    onClick={() => handleDayClick("sun")}
                  />
                </DaysWrapper>
              </FieldWithLabel>
              <FieldWithLabel label="예상 소요시간">
                <TimeFieldInput
                  type="number"
                  min="0"
                  value={estimatedTime}
                  onChange={(e) => setEstimatedTime(parseFloat(e.target.value))}
                  placeholder="숫자 입력 (ex. 12)"
                />
                {timeError && (
                  <TextLight color="var(--orange)">{timeError}</TextLight>
                )}
              </FieldWithLabel>
            </>
          )}
        </InputContainer>
        {step === 1 ? (
          <TwoButton
            text1="완료하기"
            text2="캘린더에도 추가하기"
            onClick1={onClick3}
            onClick2={() => handleCalendarAddBtn()}
          />
        ) : (
          <LargeButtonActive
            text="완료하기"
            onClick={onClick3_calendarAddBtn}
          />
        )}
      </GoalCreateModalElementContainer>
    </GoalCreateModalContainer>
  );
};

export const GoalCreateModalContainer = styled.div`
  position: fixed;
  display: flex;
  width: 390px;
  padding: 10px 15px;
  align-items: flex-start;
  gap: 10px;
  height: 70%;
  border-radius: 25px 25px 0px 0px;
  background: var(--white);
  box-shadow: 0px 3px 30px 0px rgba(0, 0, 0, 0.16);
  bottom: 0;
  animation: ${slideUp} .3s ease-out 1;
`;

export const GoalCreateModalElementContainer = styled.div`
  display: flex;
  padding: 10px 0px 35px 0px;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  flex: 1 0 0;
`;

const InputContainer = styled.div`
  display: flex;
  width: 351px;
  height: 390px;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
  overflow: auto;
`;

const TagsWrapper = styled.div`
  display: flex;
  padding: 5px 2px;
  align-items: flex-start;
  align-content: flex-start;
  gap: 10px 12px;
  align-self: stretch;
  flex-wrap: wrap;
`;

const TodosWrapper = styled.div`
  display: flex;
  padding-bottom: 20px;
  flex-direction: column;
  align-items: right;
  align-content: flex-start;
  gap: 8px;
  align-self: stretch;
  flex-wrap: wrap;
`;

export const DaysWrapper = styled.div`
  display: flex;
  padding: 0px 4px;
  align-items: center;
  justify-content: space-between;
  gap: auto;
  width: 100%;
`;
