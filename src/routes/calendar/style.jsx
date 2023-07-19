import styled from "styled-components";
import Ellipse from "../../asset/images/Ellipse.png";
import FloatingBtn from "../../asset/images/floatingBtn.png";

export const main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

export const calendarMainRoot = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: var(--default-bold-body-size);
  color: #010101;
  font-family: var(--font-pretendard);
  width: 390px;
  height: 844px;
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
`;

export const day = styled.div`
  display: flex;
  width: 56px;
  height: 25px;
  padding: 5px 0px 6px 0px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: ${({ isSunday }) =>
    isSunday ? "var(--orange)" : "var(--black, #252525)"};
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
  height: 95px;
  position: relative;
  overflow: hidden;
  align-items: center;
  justify-content: center;
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
  color: ${(props) => (props.isSunday ? "#f19A37" : "#252525")};
  opacity: ${(props) => (props.isCurrentMonth ? "1" : "0.3")};
`;

export const week = styled.div`
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid var(--light-gray-2, #f5f5f5);
`;

export const month = styled.div`
  margin-top: 193px;
  padding-bottom: 100px;
  display: flex;
  height: 550px;
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

export const titleNormal = styled.span`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 19px;
`;

export const titleHeavy = styled.span`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: 19px; /* 67.857% */
`;

export const textHeavy = styled.span`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 19px; /* 105.556% */
`;

export const textNormal = styled.span`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px; /* 126.667% */
`;

export const textLight = styled.span`
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px; /* 146.154% */
`;

export const switchFrame = styled.div`
  box-sizing: border-box;
  display: block;
  flex-grow: 0;
  flex-shrink: 0;
  width: 80px;
  height: 30px;
  position: relative;
`;

export const track = styled.div`
  width: 80px;
  height: 30px;
  position: absolute;
  left: 0px;
  top: 0px;
  border-radius: 100px;
  background: ${(props) =>
    props.isOff ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.05)"};
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
  left: ${(props) => (props.isOff ? "2px" : "43px")};
  top: 2px;
  overflow: hidden;
  gap: 10px;
  padding: 2px 5px;
  border-radius: 23px;
  background: ${(props) => (props.isOff ? "rgba(0,0,0,0.3)" : "#fff")};
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
  color: ${(props) => (props.isOff ? "#fff" : "#000")};
`;

export const headerContainer = styled.div`
  padding-top: 47px;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  background: var(--background);
`;

export const floatingBtnContainer = styled.div`
  left: 38%;
  bottom: 17%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  position: relative;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
  background-image: url(${FloatingBtn});
  background-repeat: no-repeat;
  background-size: 60px 60px;
`;
