import styled from "styled-components";
import Ellipse from "../../asset/images/Ellipse.png";
import FloatingBtn from "../../asset/images/floatingBtn.png";

export const calendarMainRoot = styled.div`
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
`;

export const headerContainer = styled.div`
  padding-top: 47px;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  background: var(--background);
`;

export const calendarHeader = styled.div`
  display: flex;
  padding: 15px 15px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  background: var(--background);
`;

export const headerTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
  gap: 5px;
`;

export const headerIcon = styled.img`
  position: relative;
  width: 30px;
  height: 30px;
  overflow: hidden;
  flex-shrink: 0;
  cursor: pointer;
`;

export const day = styled.div`
  display: flex;
  width: 56px;
  height: 25px;
  padding: 5px 0px 6px 0px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: ${({ $isSunday }) =>
    $isSunday ? "var(--orange)" : "var(--black, #252525)"};
  text-align: center;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
  line-height: 125%;
  opacity: 0.6000000238418579;
`;

export const daysOfWeek = styled.div`
  display: flex;
  padding: 0px 0px;
  justify-content: center;
  align-items: center;
  postion: fixed;
  background: var(--white);
  border-bottom: 1px solid var(--light-gray-2, #f5f5f5);
`;

export const DateContainer = styled.div`
  display: flex;
  width: 56px;
  height: 95px;
  padding: 2px;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  flex-shrink: 0;
`;
export const DateWrapper = styled.div`
  display: flex;
  width: 18px;
  height: 20px;
  padding: 2px 3px 4px 3px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const dateToday = styled.span`
  padding: 2px 3px 2px 3px;
  font-family: Pretendard;
  font-size: 11px;
  line-height: 125%;
  letter-spacing: 0%;
  font-weight: 500;
  text-align: center;
  color: #ffff;
  background-image: url(${Ellipse});
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;

export const dateNotToday = styled.span`
  margin: 0;
  white-space: pre-wrap;
  top: 2px;
  left: 3px;
  font-family: Pretendard;
  font-size: 11px;
  line-height: 125%;
  letter-spacing: 0%;
  text-align: center;
  color: ${(props) => (props.$isSunday ? "#f19A37" : "#252525")};
  opacity: ${(props) => (props.$isCurrentMonth ? "1" : "0.3")};
`;
export const EventsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  align-self: stretch;
`;

const EventContainer = styled.div`
  display: flex;
  width: 100%;
  height: 15px;
  padding: 1.5px 0px 2px 2px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 2px;
  overflow: hidden;
  background: ${(props) => {
    return props.color;
  }};
`;

const EventLabel = styled.span`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 10.8px;
  font-style: normal;
  font-weight: 400;
  overflow: hidden;
  height: 100%;
`;

export const EventElement = (props) => {
  return (
    <EventContainer color={props.color}>
      <EventLabel>{props.title}</EventLabel>
    </EventContainer>
  );
};

export const MoreEventText = styled.span`
  color: var(--brown, #716a56);
  font-family: Pretendard;
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%; /* 10px */
  text-align: right;
  width: 100%;
  padding-top: 4px;
`;

export const week = styled.div`
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid var(--light-gray-2, #f5f5f5);
`;

export const month = styled.div`
  position: relative;
  margin-top: 190px;
  padding-bottom: 30px;
  display: flex;
  height: 570px;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  background: var(--white);
`;

export const buttonContainer = styled.div`
  display: flex;
  padding: 10px 20px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  background: var(--background);
`;

export const switchFrame = styled.div`
  box-sizing: border-box;
  display: block;
  flex-grow: 0;
  flex-shrink: 0;
  width: 80px;
  height: 30px;
  position: relative;
  cursor: pointer;
`;

export const track = styled.div`
  width: 80px;
  height: 30px;
  position: absolute;
  left: 0px;
  top: 0px;
  border-radius: 100px;
  background: ${(props) =>
    props.$isOff ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.05)"};
  box-shadow: 0px 0px 4px 0 rgba(0, 0, 0, 0.25);
`;

export const onOffCircle = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 26px;
  position: absolute;
  left: ${(props) => (props.$isOff ? "2px" : "43px")};
  top: 2px;
  overflow: hidden;
  gap: 10px;
  padding: 2px 5px;
  border-radius: 23px;
  background: ${(props) => (props.$isOff ? "rgba(0,0,0,0.3)" : "#fff")};
`;

export const onOffText = styled.p`
  margin: 0;
  white-space: pre-wrap;
  flex-grow: 0;
  flex-shrink: 0;
  font-family: Pretendard;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0px;
  font-weight: 600;
  text-align: center;
  color: ${(props) => (props.$isOff ? "#fff" : "#000")};
`;

export const floatingBtnContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 30px;
  position: relative;
  z-index: 999;
  left: 150px;
  bottom: 80px;
  cursor: pointer;
  width: 60px;
  height: 60px;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
  background-image: url(${FloatingBtn});
  background-repeat: no-repeat;
  background-size: 60px 60px;
`;

export const GoalCreateModalContainer = styled.div`
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

export const GoalCreateModalElementContainer = styled.div`
  display: flex;
  padding: 10px 0px 35px 0px;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  flex: 1 0 0;
`;

export const InputContainer = styled.div`
  display: flex;
  width: 351px;
  height: 390px;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
  overflow: auto;
`;

export const TagsWrapper = styled.div`
  display: flex;
  padding: 5px 2px;
  align-items: flex-start;
  align-content: flex-start;
  gap: 10px 12px;
  align-self: stretch;
  flex-wrap: wrap;
`;

export const TodosWrapper = styled.div`
  display: flex;
  padding-bottom: 20px;
  flex-direction: column;
  align-items: right;
  align-content: flex-start;
  gap: 8px;
  align-self: stretch;
  flex-wrap: wrap;
`;

export const RunDayWrapper = styled.div`
  display: flex;
  padding: 0px 5px;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

export const DatepickerWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  height: 50px;
  border-radius: 8px;
  background: #fff;
  border-width: 2px;
  border-color: #f5f5f5;
  border-style: solid;
  margin-left: 0px;
`;

export const DaysWrapper = styled.div`
  display: flex;
  padding: 0px 4px;
  align-items: center;
  justify-content: space-between;
  gap: auto;
  width: 100%;
`;
