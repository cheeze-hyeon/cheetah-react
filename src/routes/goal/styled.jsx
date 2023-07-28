import styled from "styled-components";
import { TextNormal } from "../../components/text/styled";
import { CheckBox, SlimButtonActive } from "../../components/button/styled";
import { deleteGoal, deleteGoalwithCalendar } from "../../apis/api_calendar";
import { useState } from "react";

export const GoalMainRoot = styled.div`
  top: 0;
  left: 50%;
  transform: translate(-50%);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: var(--default-bold-body-size);
  color: var(--black);
  font-family: var(--font-pretendard);
  width: 390px;
  height: 844px;
  overflow: hidden;
  background: var(--background);
`;

export const ModalContainer = styled.div`
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  box-sizing: border-box;
  justify-content: center;
  align-items: flex-start;
  width: 347px;
  height: fit-content;
  overflow: hidden;
  gap: 10px;
  padding-top: 40px;
  padding-right: 10px;
  padding-bottom: 20px;
  padding-left: 10px;
  border-radius: 15px;
  background: #fff;
  box-shadow: 0px 3px 30px 0 rgba(0, 0, 0, 0.16);
  margin: auto;
`;

export const Frame = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  flex-basis: 100%;
  gap: 25px;
  background: #fff;
  z-index: 100px;
`;

export const TextContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  // gap: 20px;
`;

export const ButtonsContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  width: 315px;
  gap: 10px;
  padding: 0px 20px;
`;

export const ButtonContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  width: 132.5px;
  height: 40px;
  padding: 0px 20px;
  border-radius: 10px;
  margin: auto;
`;

export const SmallSlimBtnContainer2 = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  width: 132.5px;
  height: 40px;
  padding: 0px 20px;
  border-radius: 10px;
  background: #eaeef1;
  margin: auto;
`;

export const Label = styled.p`
  margin: 0;
  white-space: pre-wrap;
  flex-grow: 0;
  flex-shrink: 0;
  font-family: Pretendard;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0px;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
`;

export const GoalDeleteModal = (props) => {
  console.log(props);

  const [isChecked, setIsChecked] = useState(false);
  console.log("isChecked", isChecked);

  const changeCheckedstate = () => {
    setIsChecked(!isChecked);
  };

  const handleDeleteGoal = () => {
    const deleteGoalAPI = async () => {
      const response = await deleteGoal(props.goal_id);
      console.log("캘린더에서만 삭제", response);
      props.onCloseModal();
    };
    const deleteGoalwithCalendarAPI = async () => {
      const response = await deleteGoalwithCalendar(props.goal_id);
      console.log("캘린더와 같이 삭제", response);
      props.onCloseModal();
    };
    if (isChecked === true) {
      deleteGoalAPI();
    } else {
      deleteGoalwithCalendarAPI();
    }
    window.location.reload();
  };

  return (
    <ModalContainer>
      <Frame>
        <div>
          <TextContainer className="mb-[10px]">
            <TextNormal>목표를 삭제하시겠습니까?</TextNormal>
          </TextContainer>
          {props.is_scheduled && (
            <CheckBox
              onChange={changeCheckedstate}
              text="캘린더에서만 삭제하기"
            ></CheckBox>
          )}
        </div>
        <ButtonsContainer>
          <ButtonContainer
            onClick={handleDeleteGoal}
            className="bg-[#f19a37] cursor-pointer"
          >
            <Label className="text-[#fff]">삭제</Label>
          </ButtonContainer>
          <ButtonContainer
            onClick={props.onCloseModal}
            className="bg-[#eaeef1] cursor-pointer"
          >
            <Label className="text-[#000]">취소</Label>
          </ButtonContainer>
        </ButtonsContainer>
      </Frame>
    </ModalContainer>
  );
};

export const ReturnAlertModal = (props) => {
  return (
    <ModalContainer>
      <Frame>
        <TextContainer>
          <TextNormal>미완료상태로 변경하시겠습니까?</TextNormal>
        </TextContainer>
        <ButtonsContainer>
          <ButtonContainer className="bg-[#f19a37]">
            <Label className="text-[#fff]">변경</Label>
          </ButtonContainer>
          <ButtonContainer className="bg-[#eaeef1]">
            <Label className="text-[#000]">취소</Label>
          </ButtonContainer>
        </ButtonsContainer>
      </Frame>
    </ModalContainer>
  );
};

export const TagDeleteAlertModal = (props) => {
  return (
    <ModalContainer>
      <Frame>
        <TextContainer className="flex flex-col">
          <TextNormal>태그 삭제 시 하위 목표도 함께 삭제됩니다.</TextNormal>
          <TextNormal>정말로 삭제하시겠습니까?</TextNormal>
        </TextContainer>
        <ButtonsContainer>
          <ButtonContainer
            onClick={props.onCloseModal}
            className="bg-[#f19a37] cursor-pointer"
          >
            <Label className="text-[#fff]">삭제</Label>
          </ButtonContainer>
          <ButtonContainer
            onClick={props.onCloseModal}
            className="bg-[#eaeef1] cursor-pointer"
          >
            <Label className="text-[#000]">취소</Label>
          </ButtonContainer>
        </ButtonsContainer>
      </Frame>
    </ModalContainer>
  );
};
