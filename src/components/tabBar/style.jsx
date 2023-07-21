import styled from "styled-components";

export const tabBarContainer = styled.div`
  bottom: 0%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  width: 390px;
  height: 83px;
  position: fixed;
  background: #fff;
  box-shadow: 0px -0.5px 0px 0 rgba(0, 0, 0, 0.2);
`;

export const tabs = styled.div`
  display: flex;
  padding: 0px 27px 0px 26px;
  justify-content: center;
  align-items: flex-start;
  gap: 56px;
  align-self: stretch;
  position: relative;
`;

export const homeIndicator = styled.div`
  box-sizing: border-box;
  display: block;
  flex-grow: 0;
  flex-shrink: 0;
  width: 375px;
  height: 34px;
`;

export const tabBarItem = styled.div`
  display: flex;
  width: 75px;
  height: 49px;
  padding: 4px 22px 2.134px 23px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.866px;
  cursor: pointer;
`;

export const tabLabel = styled.p`
  margin: 0;
  white-space: pre-wrap;
  top: 34.87px;
  left: 25px;
  font-family: Pretendard;
  font-size: 10px;
  line-height: normal;
  letter-spacing: -0.23999999463558197px;
  font-weight: 600;
  text-align: center;
  color: #ddd;
`;

export const tabLabelSelected = styled.p`
  margin: 0;
  white-space: pre-wrap;
  // position: absolute;
  top: 34.87px;
  left: 25px;
  font-family: Pretendard;
  font-size: 10px;
  line-height: normal;
  letter-spacing: -0.23999999463558197px;
  font-weight: 600;
  text-align: center;
  color: #f19a37;
`;
