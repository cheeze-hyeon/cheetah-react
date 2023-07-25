import styled from "styled-components";
import { TitleNormal, TextLight } from "../../../components/text/styled";
import { HeaderModal } from "../../../components/header/styled";
import TodoCheck from "../../goal/goaldetailmodal/TodoCheck";
import { TextBtnSmall } from "../../../components/button/styled";
import { useState } from "react";

const ModalLayout = styled.div`
  display: flex;
  width: 357px;
  height: 417px;
  padding: 10px 15px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 15px;
  background: #fff;
  box-shadow: 0px 3px 30px 0px rgba(0, 0, 0, 0.16);
`;

const ElementsLayout = styled.div`
  display: flex;
  padding-bottom: 25px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  align-self: stretch;
`;

const TitleWrapper = styled.div`
  display: flex;
  padding: 0px 10px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  flex: 1 0 0;
  align-self: stretch;
`;

const BottomContentsContainer = styled.div`
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

const TodosContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  padding-bottom: 10px;
`;

const NoDataMesssageWrapper = styled.div`
  padding-left: 10px;
`;

const AddTodoField = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 15px;
  padding: 5px 10px;
`;

const NewTodoInput = styled.input`
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

export const GoalDetialModalLight = (props) => {
  const { goal, onCloseGoalDetailModal, todos } = props;

  const filteredTodos = todos.filter((todo) => todo.goal_id === goal.id);

  const [newTodoTitle, setNewTodoTitle] = useState(""); // 추가할 투두의 제목을 상태로 관리합니다.

  const [showAddTodoField, setShowAddTodoField] = useState(false);

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
        goal_id: goal.id,
        title: newTodoTitle.trim(),
        is_completed: false,
      };

      setNewTodoTitle("");
      todos.push(newTodo);
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
      <ElementsLayout>
        <HeaderModal clickBtn={onCloseGoalDetailModal} />
        <TitleWrapper>
          <TitleNormal>{goal.title}</TitleNormal>
        </TitleWrapper>
        <ContentsContainer>
          <BottomContentsContainer>
            <TodosContainer>
              {filteredTodos.length > 0
                ? filteredTodos.map((todo) => (
                    <TodoCheck key={todo.id} todo={todo} />
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
