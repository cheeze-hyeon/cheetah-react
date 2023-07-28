// GoalDetailModal.js
import { React, useEffect, useState } from "react";
import GoalDetailModalHeader from "./GoalDetailModalHeader";
import "tailwindcss/tailwind.css";
import TodoCheck from "./TodoCheck";
import {
  TextNormal,
  TextLight,
  TitleNormal,
} from "../../../components/text/styled";
import { InputTextFieldActive } from "../../../components/input/styled";
import { SlimButtonActive } from "../../../components/button/styled";
import { blue, deepOrange, orange } from "@mui/material/colors";
import {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
  getGoaldetail,
} from "../../../apis/api_calendar";
import * as s from "../../calendar-detail/goal-detail/styled";
import { Tag } from "../../calendar-detail/styled";

const GoalDetailModal = ({ goal, onCloseModal, filtered_tagId }) => {
  const {
    title,
    estimated_time,
    progress_rate,
    cumulative_time,
    finish_at,
    tag_id,
    tag,
    update_at,
    is_scheduled,
  } = goal;

  const [todos, setTodos] = useState([]); // 투두 목록을 상태로 관리합니다.

  const getTodoAPI = async () => {
    const response = await getTodo(goal.id);
    setTodos(response);
    console.log(response);
  };

  useEffect(() => {
    getTodoAPI();
  }, []);

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
    if (dateString === null) return dateString;
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

  const [newTodoTitle, setNewTodoTitle] = useState(""); // 추가할 투두의 제목을 상태로 관리합니다.

  const [showAddTodoField, setShowAddTodoField] = useState(false);

  const handleAddTodo = () => {
    // "투두 추가하기" 버튼을 누를 때 호출되는 함수입니다.
    setShowAddTodoField(true); // 투두 추가 텍스트 필드를 보여주도록 상태를 업데이트합니다.
  };

  const handleAddTodoEnter = (e) => {
    // 투두 추가 텍스트 필드에서 엔터를 눌렀을 때 호출되는 함수입니다.
    console.log("enter!!!");
    if (e.key === "Enter" && newTodoTitle.trim() !== "") {
      // 엔터를 누르고 투두 제목이 비어있지 않은 경우에만 추가합니다.
      const newTodo = {
        id: Math.random().toString(),
        goal_id: goal.id,
        title: newTodoTitle.trim(),
        is_completed: false,
      };

      setNewTodoTitle("");

      const createTodoAPI = async () => {
        const response = await createTodo({
          goal_id: goal.id,
          title: newTodoTitle.trim(),
          is_completed: false,
        });
        newTodo.id = response.id;
        setTodos([...todos, newTodo]); // 기존 투두 목록에 새로운 투두를 추가합니다.
      };
      createTodoAPI();
      // setShowAddTodoField(false); // 투두 추가 텍스트 필드를 숨깁니다.
    }
  };

  const handleCancelAddTodo = () => {
    // 취소 버튼을 누를 때 호출되는 함수입니다.
    setNewTodoTitle(""); // 입력 필드 초기화
    setShowAddTodoField(false); // 투두 추가 텍스트 필드를 숨깁니다.
  };

  const handleEditButtonClick = () => {
    // "상세정보 수정하기" 버튼을 누를 때 호출되는 함수입니다.
    return console.log("상세정보 수정하기 버튼이 클릭되었습니다.");
  };

  const handleAddToCalendar = () => {
    // "캘린더에 추가하기" 버튼을 클릭했을 때 호출되는 함수입니다.
    console.log(" 버튼이 클릭되었습니다.");
    return (window.location.href = `/scheduledetailpage/${goal.id}`);
  };
  const hasTodos = todos.length > 0 || showAddTodoField == true;
  return (
    <s.ModalLayout>
      <s.ElementsLayout>
        <GoalDetailModalHeader
          goal_id={goal.id}
          onCloseModal={onCloseModal}
          goal_is_scheduled={goal.is_scheduled}
        />
        <div className="flex flex-col gap-[5px] w-full">
          <div className="flex flex-row gap-[8px] items-center px-[10px]">
            {tag && (
              <div
                className="flex flex-row item-stretch px-[7px] py-0.5 rounded-[15px] bg-${tag.color}"
                style={{ backgroundColor: tag.color }}
              >
                <TextLight className="whitespace-pre-wrap leading-[19px] font-medium text-left text-[#222b45]">
                  {tag.title}
                </TextLight>
              </div>
            )}
            {is_scheduled === false && (
              <TextLight
                className="whitespace-pre-wrap text-left text-[#222b45]"
                font_weight="600"
              >
                캘린더에 추가되지 않음
              </TextLight>
            )}
            {/* is_scheduled === 1인 경우에만 남은 시간 표시 */}
            {is_scheduled !== false && (
              <Tag color="var(--lightgray2)">{calculateRemainingTime()}</Tag>
            )}
            {is_scheduled !== false && (
              <Tag color="var(--lightgray2)">
                진행률 {Math.floor(progress_rate)}%
              </Tag>
            )}
          </div>
        </div>
        <s.TitleWrapper>
          <TitleNormal>{title}</TitleNormal>
          <TextLight color="var(--brown)" text="right" font_weight="600">
            {is_scheduled !== false && `${formattedFinishDate}까지 달리기`}
          </TextLight>
        </s.TitleWrapper>
        <s.BottomContentsContainer2>
          <s.TodosContainer>
            {hasTodos &&
              hasTodos &&
              todos.map((todo) => (
                <TodoCheck key={todo.id} todo={todo} setTodos={setTodos} />
              ))}
            {!hasTodos && (
              <s.NoDataMesssageWrapper>
                <TextLight className="text-darkgray">
                  하위 투두가 없어요 :)
                </TextLight>
              </s.NoDataMesssageWrapper>
            )}
            {showAddTodoField ? (
              <s.AddTodoField>
                <s.NewTodoInput
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
              </s.AddTodoField>
            ) : (
              <button className="self-end" onClick={handleAddTodo}>
                <TextLight
                  className="whitespace-pre-wrap text-left text-[#222b45] px-[10px]"
                  font_weight="600"
                >
                  + 투두 추가하기
                </TextLight>
              </button>
            )}
          </s.TodosContainer>
        </s.BottomContentsContainer2>
        <SlimButtonActive
          to={`/scheduledetailpage/${goal.id}`}
          text={`${!is_scheduled ? "캘린더에 추가하기" : "상세정보 수정하기"}`}
          bg={`${is_scheduled ? "#F19A37" : "#EAEEF1"}`}
          color={`${is_scheduled ? "#fff" : ""}`}
          onClick={is_scheduled ? handleAddToCalendar : handleEditButtonClick}
        />
      </s.ElementsLayout>
    </s.ModalLayout>
  );
};
export default GoalDetailModal;
