import styled from "styled-components";
import Ellipse from "../../asset/images/Ellipse.png";
import FloatingBtn from "../../asset/images/floatingBtn.png";
import { isValidProp } from "@emotion/is-prop-valid";

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
  color: ${(props) =>
    props.$issunday ? "var(--orange)" : "var(--black, #252525)"};
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

export const dateContainer = styled.div`
  box-sizing: border-box;
  display: block;
  flex-grow: 0;
  flex-shrink: 0;
  width: 56px;
  height: 105px;
  position: relative;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const dateToday = styled.span`
  padding: 2px 3px 2px 3px;
  font-family: Pretendard;
  font-size: 11px;
  line-height: 10%;
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
  color: ${(props) => (props.$issunday ? "#f19A37" : "#252525")};
  opacity: ${(props) => (props.$iscurrentMonth ? "1" : "0.3")};
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
    props.$isoff ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.05)"};
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
  left: ${(props) => (props.$isoff ? "2px" : "43px")};
  top: 2px;
  overflow: hidden;
  gap: 10px;
  padding: 2px 5px;
  border-radius: 23px;
  background: ${(props) => (props.$isoff ? "rgba(0,0,0,0.3)" : "#fff")};
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
  color: ${(props) => (props.$isoff ? "#fff" : "#000")};
`;

export const floatingBtnContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 30px;
  position: relative;
  z-index: 999;
  left: 150px;
  bottom: 70px;
  cursor: pointer;
  width: 60px;
  height: 60px;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
  background-image: url(${FloatingBtn});
  background-repeat: no-repeat;
  background-size: 60px 60px;
`;

export const GoalCreateModalContainer = styled.div`
  display: flex;
  width: 389px;
  padding: 10px 15px;
  align-items: flex-start;
  gap: 10px;
  height: 100px;
  border-radius: 25px 25px 0px 0px;
  background: var(white);
  box-shadow: 0px 3px 30px 0px rgba(0, 0, 0, 0.16);
`;

export const GoalCreateModalElementContainer = styled.div`
  display: flex;
  padding: 10px 0px 35px 0px;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  flex: 1 0 0;
`;
