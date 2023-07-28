import { format } from "date-fns";
import * as s from "./styled";
import * as t from "../../components/text/styled";
import { TextBtnWResetIcon } from "../../components/button/styled";
import { FieldWithLabel } from "../../components/input/styled";
import TodoCheck from "../goal/goaldetailmodal/TodoCheck";
import { ModalHeaderContainer } from "../../components/modal/styled";
import { ko } from "date-fns/locale"; // Import the ko locale
import { useNavigate } from "react-router-dom";
import PageBackIcon from "../../asset/images/pageBack.svg";
import CloseIcon from "../../asset/images/close.svg";
import { useState, useEffect } from "react";
import { getTodo, createTodo } from "../../apis/api_calendar";
import { TextLight, TextNormal } from "../../components/text/styled";
import { InputTextFieldActive } from "../../components/input/styled";
import { updateGoaldaily } from "../../apis/api_calendar";
export const CalendarDetailHeader = ({ selectedDate }) => {
  const navigate = useNavigate();
  const onBackBtnClick = () => {
    window.localStorage.removeItem("is_calendardetail");
    navigate("/calendar", {
      state: {
        backpath: selectedDate,
      },
    });
  };

  return (
    <s.calendarHeader>
      <s.headerIconContainer onClick={onBackBtnClick}>
        <img alt="pageBack" className="cursor-pointer" src={PageBackIcon} />
      </s.headerIconContainer>
      <s.headerTitle>
        <s.titleText>{format(selectedDate, "M")}월 </s.titleText>
        <s.titleText>{format(selectedDate, "d")}일</s.titleText>
        <s.titleText>{format(selectedDate, "(E)", { locale: ko })}</s.titleText>
      </s.headerTitle>
      <s.headerIconContainer></s.headerIconContainer>
    </s.calendarHeader>
  );
};

export const HeaderMessage = (props) => {
  return (
    <s.headerMessageContainer>
      <s.headerMessageOrange>{props.textOrange}</s.headerMessageOrange>
      <s.headerMessageGray>{props.textGray}</s.headerMessageGray>
    </s.headerMessageContainer>
  );
};

export const TaskCompleteModal = ({
  today,
  showCompleteModal,
  goal,
  onCloseGoalCompleteModal,
  progressRate,
  setProgressRate,
  dailyHour,
  setDailyHour,
  onCloseGoalFinishModal,

}) => {
  const [todos, setTodos] = useState([]); // 투두 목록을 상태로 관리합니다.
  const [possibleDays, setPossibleDays] = useState(0);

  const getTodoAPI = async () => {
    const response = await getTodo(goal.id);
    setTodos(response);
    console.log(response);
  };
  useEffect(() => {

    getTodoAPI();

    var impossibledays = 0;
    var impossibledates_set = goal.impossibledates_set
    console.log(goal)
    if(impossibledates_set.length !== 0){
      
      for(var i = 0; i < impossibledates_set.length; i++){
        if(impossibledates_set[i] > today){
          impossibledays++;
        }
      }
    }

    var datedifference = Math.ceil(
      (goal.finish_at.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;
    impossibledays = impossibledays + datedifference
    setPossibleDays(impossibledays)
  }, []);

  useEffect(() => {
    var defaultProgressRate = progressRate;
    if(possibleDays !== 0) defaultProgressRate = defaultProgressRate + (100 - defaultProgressRate)/possibleDays;
    else defaultProgressRate = 100;

    if(defaultProgressRate/10 - parseInt(defaultProgressRate/10) < 0.5 ) defaultProgressRate = parseInt(defaultProgressRate/10)*10
    else defaultProgressRate = (parseInt(defaultProgressRate/10) + 0.5)*10;
    setProgressRate(defaultProgressRate)
  }, [possibleDays])

  const CompleteGoalAPI = async () => {
    const response = await updateGoaldaily(goal.id, {
      daily_time: dailyHour,
      progress_rate: progressRate,
    });
    console.log(response);
    
  };

  const onCompleteGoalFinishModal = async (e) => {
    if (e.target === e.currentTarget) {
      onCloseGoalFinishModal(e)
      await CompleteGoalAPI();
      window.location.reload()
    }
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

  const handleResetProgress = () => {
    setProgressRate(goal.progress_rate ? goal.progress_rate : 0);
    console.log("되돌리기 눌림");
    console.log("되돌리기 눌린 뒤", progressRate);
  };
  
  useEffect(() => {
    var newDailyHour = 0;
    newDailyHour = goal.residual_time * (progressRate - goal.progress_rate)/ (100 - goal.progress_rate);
    console.log(newDailyHour);
    setDailyHour(newDailyHour);
  }, [progressRate]);

  const hasTodos = todos.length > 0 || showAddTodoField == true;

  return (
    <s.TaskCompleteModalContainer>
      <s.modalElementContainer>
        <ModalHeaderContainer>
          <s.headerIconContainer></s.headerIconContainer>
          <t.TitleNormal>{goal.title}</t.TitleNormal>
          <s.headerIconContainer>
            <img
              alt="closebtn"
              className="cursor-pointer"
              onClick={onCloseGoalFinishModal}
              src={CloseIcon}
            />
          </s.headerIconContainer>
        </ModalHeaderContainer>
        <s.modalCenter>
          <s.progressLargeContainer>
            <s.progressTopContainer>
              <t.TextNormal>진행률</t.TextNormal>
              <s.ProgressSlider
                value={progressRate}
                valueLabelDisplay="on"
                defaultValue={goal.progress_rate}
                step={5}
                onChange={(event, newValue) => {
                  setProgressRate(newValue);
                }}
              />
            </s.progressTopContainer>
            <TextBtnWResetIcon onClick={handleResetProgress} />
          </s.progressLargeContainer>
          <s.notiBox>
            {parseInt(60 * ((goal.residual_time - dailyHour) - parseInt((goal.residual_time - dailyHour)))) !== 0 && (
              <t.TextNormal>
                앞으로 {parseInt((goal.residual_time - dailyHour))}시간{" "}
                {parseInt(60 * ((goal.residual_time - dailyHour) - parseInt((goal.residual_time - dailyHour))))}분 더 달려야할
                것으로 예상돼요
              </t.TextNormal>
            )}
            {parseInt(60 * ((goal.residual_time - dailyHour) - parseInt((goal.residual_time - dailyHour)))) === 0 && (
              <t.TextNormal>
                앞으로 {parseInt((goal.residual_time - dailyHour))}시간 더 달려야할 것으로 예상돼요
              </t.TextNormal>
            )}
          </s.notiBox>
          <FieldWithLabel label="하위 투두">
            <s.todosContainer>
              {!hasTodos && (
                <TextLight className="self-start px-[10px]">할일이 없어요:</TextLight>
              )}
              {hasTodos && (
                <div className="flex flex-col gap-[5px] pt-[10px]">
                  {hasTodos &&
                    todos.map((todo) => (
                      <TodoCheck
                        key={todo.id}
                        todo={todo}
                        setTodos={setTodos}
                      />
                    ))}
                </div>
              )}
              {showAddTodoField ? (
                <div className="flex flex-row items-center w-full box-border gap-[15px]">
                  <InputTextFieldActive
                    width="260"
                    type="text"
                    value={newTodoTitle}
                    onChange={(e) => {
                      console.log(e.target);
                      setNewTodoTitle(e.target.value);
                    }}
                    onKeyPress={handleAddTodoEnter}
                    placeholder="할일을 입력하세요"
                  />
                  <button
                    className="font-['Pretendard'] text-[13px] text-black font-medium"
                    onClick={handleCancelAddTodo}
                  >
                    <TextNormal>취소</TextNormal>
                  </button>
                </div>
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
            </s.todosContainer>
          </FieldWithLabel>
        </s.modalCenter>
        <s.CompleteButton onClick={onCompleteGoalFinishModal} />
      </s.modalElementContainer>
    </s.TaskCompleteModalContainer>
  );
};