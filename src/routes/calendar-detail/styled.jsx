import styled from "styled-components";
import { styled as muiStyled } from "@mui/system";
import {
  TextNormal,
  TextLight,
  TitleNormal,
} from "../../components/text/styled";
import Slider from "@mui/material/Slider";
import {
  LargeButtonActiveContainer,
  LargeLabel,
} from "../../components/button/styled";

export const calendarDetailRoot = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: var(--default-bold-body-size);
  color: var(--black);
  font-family: var(--font-pretendard);
  width: 390px;
  height: 844px;
  background: var(--background);
  overflow: hidden;
`;

export const headerContainer = styled.div`
  width: 390px;
  height: fit-content;
  padding-top: 47px;
  position: fixed;
  background: var(--orange);
`;

export const calendarHeader = styled.div`
  display: flex;
  padding: 15px 15px;
  justify-content: space-between;
  align-items: center;
`;

export const headerTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
  gap: 5px;
`;

export const titleText = styled(TitleNormal)`
  color: var(--white);
`;

export const headerIconContainer = styled.div`
  display: flex;
  position: relative;
  width: 30px;
  height: 30px;
  overflow: hidden;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
`;

export const headerMessageContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: left;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  height: 49px;
  gap: 5px;
  padding: 15px 20px;
  background: var(--white);
  border-top-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
  border-left-width: 0px;
  border-color: var(--light-gray);
  border-style: solid;
`;

export const headerMessageOrange = styled(TextNormal)`
  color: var(--orange);
  font-weight: 600;
`;

export const headerMessageGray = styled(TextNormal)`
  color: var(--darkgray2);
  font-weight: 200;
`;

export const CalendarDetailLayout = styled.div`
  margin-top: 176px;
  display: flex;
  padding: 0px 16px;
  width: 100%;
  height: 645px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
  overflow: auto;
`;

export const GoalCountWrapper = styled.div`
  display: flex;
  padding: 0px 10px;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

export const GoalCount = styled(TextNormal)`
  color: var(--darkgray);
`;

export const TasksContainer = styled.div`
  padding-bottom: 120px;
  display: flex;
  height: fit-content;
  flex-direction: column;
  align-items: center;
  gap: 17px;
  flex-shrink: 0;
  align-self: stretch;
  padding: 20px 3px;
`;

export const TaskLayout = styled.div`
  display: flex;
  padding: 15px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 16px;
  background: var(--white);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
`;

export const TaskTopFrame = styled.div`
  // padding-top: 3px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

export const TaskTLeftFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 13px;
  cursor: pointer;
  opacity: ${({ $isHidden }) => ($isHidden ? "0.3" : "1")};
`;

export const TaskTitle = styled(TextNormal)`
  font-weight: 600;
`;

export const TaskInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Tag = styled.div`
  display: flex;
  padding: 2px 7px;
  align-items: center;
  align-content: center;
  gap: 10px;
  flex-wrap: wrap;
  border-radius: 15px;
  background: ${(props) => props.color};
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px; /* 158.333% */
`;

export const Speed = styled(Tag)`
  background: var(--light-gray);
`;

export const Progress = styled(TextLight)`
  color: var(--darkgray2);
`;

export const TaskBtnContainer = styled.div`
  cursor: pointer;
`;

export const DueDateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 19px; /* 146.154% */
`;

export const DueDate = styled(TextLight)`
  opacity: ${({ $isHidden }) => ($isHidden ? "0.3" : "1")};
`;

export const GoalBottomText = styled.p`
  color: var(--orange, #f19a37);
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 19px; /* 146.154% */
`;

export const TaskCompleteModalContainer = styled.div`
  overflow: auto;
  background: var(--white);
  display: flex;
  width: 357px;
  height: 510px;
  // padding: 15px 15px 5px 15px;
  padding: 10px 15px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 15px;
  box-shadow: 0px 3px 30px 0px rgba(0, 0, 0, 0.16);
  cursor: default;
`;

export const Task = () => {};

export const modalElementContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  flex: 1 0 0;
  align-self: stretch;
`;

export const modalCenter = styled.div`
  margin-top: 60px;
  display: flex;
  height: 352px;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  align-self: stretch;
  padding: 30px 10px 0px 10px;
  overflow: auto;
`;

export const progressLargeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
  align-self: stretch;
`;

export const progressTopContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  padding-right: 15px;
`;

export const ProgressSlider = muiStyled(Slider)(() => ({
  height: 15,
  color: "var(--orange)",
}));

export const notiBox = styled.div`
  display: flex;
  padding: 17px 0px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 10px;
  background: var(--light-gray-2, #f5f5f5);
`;

export const todosContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
  align-self: stretch;
  overflow: auto;
`;

export const CompleteButtonContainer = styled(LargeButtonActiveContainer)`
  background: var(--orange);
  width: 100%;
`;
export const CompleteButton = (props) => {
  return (
    <CompleteButtonContainer>
      <LargeLabel className="text-white"onClick={props.onClick}>완료하기</LargeLabel>
    </CompleteButtonContainer>
  );
};

const EmptyMessageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  padding: 15px 20px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
  border-radius: 5px;
  background: var(--white);
`;

const EmptyMessageTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const EmptyMessage = (props) => {
  return (
    <EmptyMessageContainer>
      <EmptyMessageTextWrapper>
        <TextNormal className="text-darkgray">{props.text}</TextNormal>
      </EmptyMessageTextWrapper>
    </EmptyMessageContainer>
  );
};
