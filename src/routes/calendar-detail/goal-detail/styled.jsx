import styled from "styled-components";
import { TitleNormal, TextLight } from "../../../components/text/styled";
import { HeaderModal } from "../../../components/header/styled";
import TodoCheck from "../../goal/goaldetailmodal/TodoCheck";
import { TextBtnSmall } from "../../../components/button/styled";
import { React, useState, useEffect } from "react";
import { createTodo, getTodo } from "../../../apis/api_calendar";
import GoalDetailModalHeader from "../../goal/goaldetailmodal/GoalDetailModalHeader";
import { slideUp } from "../../../components/modal/styled";

export const GoalDetialModalLight = ({ goal, onCloseGoalDetailModal }) => {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState(""); // 추가할 투두의 제목을 상태로 관리합니다.
  const [showAddTodoField, setShowAddTodoField] = useState(false);

  const getTodoAPI = async () => {
    try {
      const response = await getTodo(goal.id);
      setTodos((prevTodos) => [...prevTodos, ...response]);
      console.log(response);
    } catch (error) {
      // API 호출 실패 처리
      console.error("Failed to fetch todos:", error);
    }
  };

  useEffect(() => {
    getTodoAPI();
  }, [goal.id]);

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
      setShowAddTodoField(false); // 투두 추가 텍스트 필드를 숨깁니다.
    }
  };

  const handleCancelAddTodo = () => {
    // 취소 버튼을 누를 때 호출되는 함수입니다.
    setNewTodoTitle(""); // 입력 필드 초기화
    setShowAddTodoField(false); // 투두 추가 텍스트 필드를 숨깁니다.
  };

  // props.goal이 정의되지 않았을 경우 처리
  if (!goal) {
    return null;
  }
  return (
    <ModalLayout>
      <ElementsLayout className="cursor-default">
        <GoalDetailModalHeader
          goal_id={goal.id}
          onCloseModal={onCloseGoalDetailModal}
          goal_is_scheduled={goal.is_scheduled}
        />
        <TitleWrapper>
          <TitleNormal>{goal.title}</TitleNormal>
        </TitleWrapper>
        <ContentsContainer>
          <BottomContentsContainer>
            <TodosContainer>
              {todos.length > 0
                ? todos.map((todo) => (
                    <TodoCheck key={todo.id} todo={todo} setTodos={setTodos} />
                  ))
                : !showAddTodoField && (
                    <NoDataMesssageWrapper>
                      <TextLight className="text-darkgray">
                        하위 투두가 없어요 :)
                      </TextLight>
                    </NoDataMesssageWrapper>
                  )}
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
            </TodosContainer>
            {/* 투두 추가하기 버튼 */}
            {!showAddTodoField && (
              <TextBtnSmall onClick={handleAddTodo} text="+ 투두 추가하기" />
            )}
          </BottomContentsContainer>
        </ContentsContainer>
      </ElementsLayout>
    </ModalLayout>
  );
};

export const ModalLayout = styled.div`
  display: flex;
  width: 357px;
  height: 417px;
  padding: 10px 15px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 15px;
  background: #fff;
  box-shadow: 0px 3px 30px 0px rgba(0, 0, 0, 0.16);animation: ${slideUp} 0.5s ease-out 1;
`;

export const ElementsLayout = styled.div`
  display: flex;
  padding-bottom: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
`;

export const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  align-self: stretch;
`;

export const TitleWrapper = styled.div`
  display: flex;
  padding: 10px 0px 0px 15px;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  align-self: stretch;
`;

export const BottomContentsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  height: 285px;
  padding: 10px 0px;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  flex-shrink: 0;
  align-self: stretch;
  overflow: auto;
`;

export const BottomContentsContainer2 = styled.div`
  display: flex;
  height: 210px;
  padding: 5px 0px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
  align-self: stretch;
  overflow: auto;
  margin: 10px 0px;
`;

export const TodosContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  padding-bottom: 20px;
  padding-left: 10px;
`;

export const NoDataMesssageWrapper = styled.div`
  padding-left: 10px;
`;

export const AddTodoField = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 15px;
  padding: 5px 10px;
`;

export const NewTodoInput = styled.input`
  flex-grow: 1;
  display: block;
  width: 50%;
  padding: 10px;
  height: 100%;
  font-size: 14px;
  border: 1px solid #e5e5e5;
  font-family: Pretendard;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.15s ease-in-out;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.15rem rgba(0, 123, 255, 0.25);
  }
`;
