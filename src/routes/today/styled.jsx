import styled from "styled-components";

import userprofiles from "../../data/userprofiles";
import goals from "../../data/goals";
import { useEffect, useState } from "react";
import { TextNormal } from "../../components/text/styled";
import {
  HamburgerHeaderModal,
  HeaderModal,
} from "../../components/header/styled";
import { Link } from "react-router-dom";
import {
  TextBtnSmall,
  TextBtnSmallWithLogout,
} from "../../components/button/styled";
import today_cheetah from "../../asset/images/today_cheetah.png";

// Back에서 API 제작할 때 오늘에 해당하는 goals 보내줌.
// API 명세 참고

// calendarDetail 페이지 API 활용할 수도 있을 것 같습니다!
// const [todayGoals, setTodayGoals] = useState([]);

// tdoayGoals 바탕으로 useEffect 활용해서 totalHours, completedHours 업데이트하기
// const [totalHours, setTotalHours] = useState(1.5);
// const [completedHours, setCompletedHours] = useState(6);

// export const dealt = Math.floor((completedHours / totalHours) * 100);

export const dealt = Math.floor((1.8 / 6) * 100);

export const Progress = styled.div`
  width: 300px;
  height: 10px;
  background-color: #716a56;
  border-radius: 5px;
  margin: auto;
`;

export const Dealt = styled.div`
  background-color: #f19a37;
  width: ${(props) => props.dealt + "%"};
  height: 100%;
  border-radius: 5px;
`;

export const MenuContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  height: 59px;
  gap: 10px;
  padding: 20px;
  border-top-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
  border-left-width: 0px;
  border-color: #eaeef1;
  border-style: solid;
`;

export const Frame = styled(Link)`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  gap: 16px;
  text-decoration: none;
`;

export const MenuList = (props) => {
  return (
    <MenuContainer>
      <Frame to={props.to}>
        <TextNormal>{props.text}</TextNormal>
      </Frame>
    </MenuContainer>
  );
};
export const HamburgerContainer = styled.div`
  display: flex;
  justify-content: end;
  box-sizing: border-box;
  display: block;
  width: 251px;
  height: 844px;
  position: relative;
  background: #fff;
  box-shadow: -2px 0px 4px 0 rgba(0, 0, 0, 0.1);
  margin-left: 139px;
`;
// clickMenu={clickMenu} setClickMenu={onClickMenu}
export const HamburgerMenu = (props) => {
  const [cM, sCM] = useState(true);
  const oCM = () => {
    console.log("here!");
    return sCM(!cM);
  };
  return (
    <HamburgerContainer>
      <div className="flex flex-col gap-[20px] mb-[473px]">
        <HeaderModal
          clickMenu={props.clickMenu}
          onClickMenu={props.onClickMenu}
        ></HeaderModal>
        <div>
          <MenuList to="/today/mypage" text="마이페이지"></MenuList>
          <MenuList to="/today/mypage/info" text="계정 정보"></MenuList>
          <MenuList text="알림 설정"></MenuList>
        </div>
      </div>
      <div className="flex justify-end place-content-end mr-[24px]">
        <TextBtnSmallWithLogout onClick = {props.onClickLogOut} to = {props.toHomePage}></TextBtnSmallWithLogout>
      </div>
    </HamburgerContainer>
  );
};

export const MyContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 344px;
  height: fit-content;
  position: relative;
  gap: 25px;
  padding: 20px 50px;
  border-radius: 15px;
  background: #fff;
`;

export const MySlimButtonContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  width: auto;
  height: 40px;
  padding: 0px 20px;
  border-radius: 10px;
  margin: auto;
  background: ${(props) => props.color || "black"};
`;

export const SLabel = styled.p`
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

export const MySlimButtonActive = (props) => {
  return (
    <MySlimButtonContainer color={props.color}>
      <Frame to={"/today/mypage" + props.to}>
        <SLabel>{props.text}</SLabel>
      </Frame>
    </MySlimButtonContainer>
  );
};
