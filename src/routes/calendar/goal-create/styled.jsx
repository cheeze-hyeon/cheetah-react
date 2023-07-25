import styled from "styled-components";
import {
  HeaderModal,
  HeaderModalBack,
} from "../../../components/header/styled";
import {
  FieldWithLabel,
  InputTextFieldActive,
  TodoWithCloseBtn,
  TwoInputDateField,
  InputTimeField,
} from "../../../components/input/styled";
import {
  TagDefault,
  TextBtnSmall,
  TwoButton,
  LargeButtonActive,
} from "../../../components/button/styled";
import { useState } from "react";
import {
  AddTodoField,
  NewTodoInput,
} from "../../calendar-detail/goal-detail/styled";
import { NewTodo } from "../../../components/input/styled";

const GoalCreateModalContainer = styled.div`
  position: fixed;
  display: flex;
  width: 389px;
  padding: 10px 15px;
  align-items: flex-start;
  gap: 10px;
  height: 70%;
  border-radius: 25px 25px 0px 0px;
  background: var(--white);
  box-shadow: 0px 3px 30px 0px rgba(0, 0, 0, 0.16);
  bottom: 0;
`;

const GoalCreateModalElementContainer = styled.div`
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

const RunDayWrapper = styled.div`
  display: flex;
  padding: 0px 5px;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

export const DaysWrapper = styled.div`
  display: flex;
  padding: 0px 4px;
  align-items: center;
  justify-content: space-between;
  gap: auto;
  width: 100%;
`;

export const GoalCreateModal = ({
  clickBtnClose,
  clickBtnBack,
  step,
  to1,
  to2,
  clickCompleteBtn,
  tags,
}) => {
  const [selectedTagId, setSelectedTagId] = useState(null);
  const [selectedDays, setSelectedDays] = useState({
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: true,
    sun: true,
  });

  const handleTagClick = (tagId) => {
    setSelectedTagId(tagId);
    console.log(tagId);
  };

  const handleDayClick = (dayId) => {
    setSelectedDays((prevSelectedDays) => ({
      ...prevSelectedDays,
      [dayId]: !prevSelectedDays[dayId],
    }));
  };

  const isSelected = (tag) => {
    return selectedTagId === tag.id;
  };

  const [newTodoTitle, setNewTodoTitle] = useState(""); // 추가할 투두의 제목을 상태로 관리합니다.

  const [showAddTodoField, setShowAddTodoField] = useState(false);
  const [newTodos, setNewTodos] = useState([]);
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
        title: newTodoTitle.trim(),
        is_completed: false,
      };

      setNewTodoTitle("");
      setNewTodos((prevTodos) => [...prevTodos, newTodo]);
      setShowAddTodoField(false); // 투두 추가 텍스트 필드를 숨깁니다.
    }
  };
  const handleCancelAddTodo = () => {
    // 취소 버튼을 누를 때 호출되는 함수입니다.
    setNewTodoTitle(""); // 입력 필드 초기화
    setShowAddTodoField(false); // 투두 추가 텍스트 필드를 숨깁니다.
  };

  return (
    <GoalCreateModalContainer>
      <GoalCreateModalElementContainer>
        {step === 1 ? (
          <HeaderModal text="목표추가" clickBtnClose={clickBtnClose} />
        ) : (
          <HeaderModalBack
            text="캘린더에 추가"
            clickBtnClose={clickBtnClose}
            clickBtnBack={clickBtnBack}
          />
        )}
        <InputContainer>
          {step === 1 ? (
            <>
              <FieldWithLabel label="태그 선택">
                <TagsWrapper>
                  {tags.map((tag) => (
                    <TagDefault
                      key={tag.id}
                      color={tag.color}
                      text={tag.title}
                      isSelected={isSelected(tag)}
                      onClick={() => handleTagClick(tag.id)}
                    />
                  ))}
                </TagsWrapper>
              </FieldWithLabel>
              <FieldWithLabel label="일정 제목">
                <InputTextFieldActive placeholder="제목 입력" />
              </FieldWithLabel>
              <FieldWithLabel label="하위 투두">
                <TodosWrapper>
                  {newTodos.map((todo) => (
                    <NewTodo key={todo.id} todo={todo} />
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
                        onClick={handleCancelAddTodo} // 취소 버튼을 누르면 handleCancelAddTodo 함수가 호출됩니다.
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
                <TwoInputDateField />
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
                <InputTimeField />
              </FieldWithLabel>
            </>
          )}
        </InputContainer>
        {step === 1 ? (
          <TwoButton
            text1="완료하기"
            text2="캘린더에도 추가하기"
            to1={to1}
            to2={to2}
          />
        ) : (
          <LargeButtonActive text="완료하기" to={clickCompleteBtn} />
        )}
      </GoalCreateModalElementContainer>
    </GoalCreateModalContainer>
  );
};
