import * as s from "./styled";
import * as t from "../../components/text/styled";
import { format, parse } from "date-fns";
import CompletedIcon from "../../asset/images/completed.svg";
import PawIcon from "../../asset/images/cheetah_paw.png";
import CloseIcon from "../../asset/images/close.svg";
import { FieldWithLabel, TodoCheck } from "../../components/input/styled";
import { useState } from "react";
import { HeaderModal } from "../../components/header/styled";
import {
  TextBtnSmallWithLogout,
  TextBtnWResetIcon,
} from "../../components/button/styled";
import { ModalOverlay } from "../../components/modal/styled";
import { ModalHeaderContainer } from "../../components/modal/styled";
import ko from "date-fns/locale/ko";

export const MenuList = (props) => {
  return (
    <s.MenuContainer>
      <s.Frame to={props.to}>
        <t.TextNormal>{props.text}</t.TextNormal>
      </s.Frame>
    </s.MenuContainer>
  );
};

export const HamburgerMenu = (props) => {
  const [cM, sCM] = useState(true);
  const oCM = () => {
    console.log("here!");
    return sCM(!cM);
  };
  return (
    <s.HamburgerContainer>
      <div className="flex flex-col gap-[20px] mb-[473px]">
        <HeaderModal
          clickMenu={props.clickMenu}
          onClick={props.onClickMenu}
        ></HeaderModal>
        <div>
          <MenuList to="/today/mypage" text="마이페이지"></MenuList>
          <MenuList to="/today/info" text="계정 정보"></MenuList>
          <MenuList text="알림 설정"></MenuList>
        </div>
      </div>
      <div className="flex justify-end place-content-end mr-[24px]">
        <TextBtnSmallWithLogout
          onClick={props.onClickLogOut}
          to={props.toHomePage}
        ></TextBtnSmallWithLogout>
      </div>
    </s.HamburgerContainer>
  );
};

export const MySlimButtonActive = (props) => {
  return (
    <s.MySlimButtonContainer color={props.color}>
      <s.Frame to={"/today/mypage" + props.to}>
        <s.SLabel>{props.text}</s.SLabel>
      </s.Frame>
    </s.MySlimButtonContainer>
  );
};

export const TodayTask = ({goal, tag}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCompleteModalOpen, setisCompleteModalOpen] = useState(false);

  const showCompleteModal = (e) => {
    setisCompleteModalOpen(!isCompleteModalOpen);
  };

  const onClickTaskBtn = () => {
    showCompleteModal();
  };

  const formattedDueDate = format(new Date(goal.finish_at), "M/d(E)", {
    locale: ko,
  });

  return (
    <s.task>
      <s.task_top>
        <s.task_top_left>
          <s.taskTitle>{goal.title}</s.taskTitle>
          <s.taskInfo>
            <s.tag col={tag.color}>{tag.title}</s.tag>
            {/* goal.speed 맞나? */}
            <s.speed>{goal.speed}</s.speed>
            <s.progress>현재까지 {goal.progress_rate * 100}%</s.progress>
          </s.taskInfo>
        </s.task_top_left>
        <s.taskBtnContainer onClick={onClickTaskBtn}>
          <img alt="button" src={isCompleted ? CompletedIcon : PawIcon} />
        </s.taskBtnContainer>
      </s.task_top>
      <s.task_bottom>
        <s.dueDate>{formattedDueDate}까지 달리기</s.dueDate>
      </s.task_bottom>
      {isCompleteModalOpen && (
        <ModalOverlay onClick={showCompleteModal}>
          <TaskCompleteModal showCompleteModal={showCompleteModal} />
        </ModalOverlay>
      )}
    </s.task>
  );
};

export const TaskCompleteModal = ({ showCompleteModal }) => {
  return (
    <s.TaskCompleteModalContainer>
      <s.modalElementContainer>
        <ModalHeaderContainer>
          <s.headerIconContainer></s.headerIconContainer>
          <t.TitleNormal>멋사 해커톤 기획안 발표</t.TitleNormal>
          <s.headerIconContainer>
            <img
              alt="closebtn"
              className="cursor-pointer"
              onClick={showCompleteModal}
              src={CloseIcon}
            />
          </s.headerIconContainer>
        </ModalHeaderContainer>
        <s.modalCenter>
          <s.progressLargeContainer>
            <s.progressTopContainer>
              <t.TextNormal>진행률</t.TextNormal>
              <s.ProgressSlider valueLabelDisplay="on" />
            </s.progressTopContainer>
            <TextBtnWResetIcon />
          </s.progressLargeContainer>
          <s.notiBox>
            <t.TextNormal>
              앞으로 ~시간 더 달려야할 것으로 예상돼요
            </t.TextNormal>
          </s.notiBox>
          <FieldWithLabel label="하위 투두">
            <s.todosContainer>
              <TodoCheck defaultvalue="첫 번째 투두" />
              <TodoCheck defaultvalue="두 번째 투두" />
              <TodoCheck defaultvalue="투두" />
              <TodoCheck defaultvalue="투두" />
              <TodoCheck defaultvalue="투두" />
              <TodoCheck defaultvalue="투두" />
            </s.todosContainer>
          </FieldWithLabel>
        </s.modalCenter>
        <s.CompleteButton />
      </s.modalElementContainer>
    </s.TaskCompleteModalContainer>
  );
};
