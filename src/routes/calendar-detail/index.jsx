import { format } from "date-fns";
import * as s from "./styled";
import * as t from "../../components/text/styled";
import { TextBtnWResetIcon } from "../../components/button/styled";
import { FieldWithLabel, TodoCheck } from "../../components/input/styled";
import { ModalHeaderContainer } from "../../components/modal/styled";
import { ko } from "date-fns/locale"; // Import the ko locale
import { useNavigate } from "react-router-dom";
import PageBackIcon from "../../asset/images/pageBack.svg";
import CloseIcon from "../../asset/images/close.svg";

export const CalendarDetailHeader = ({ selectedDate }) => {
  const navigate = useNavigate();
  const currentMonth = format(selectedDate, "M");
  const currentYear = format(selectedDate, "yyyy");
  console.log("currentMonth", currentMonth);

  const onBackBtnClick = () => {
    navigate("/calendar", {
      state: {
        selectedDate: selectedDate,
      },
    });
  };

  return (
    <s.calendarHeader>
      <s.headerIconContainer onClick={onBackBtnClick}>
        <img alt="pageBack" className="cursor-pointer" src={PageBackIcon} />
      </s.headerIconContainer>
      <s.headerTitle>
        <s.titleText>{format(selectedDate, "M")}월 </s.titleText>
        <s.titleText>{format(selectedDate, "d")}일</s.titleText>
        <s.titleText>{format(selectedDate, "(E)", { locale: ko })}</s.titleText>
      </s.headerTitle>
      <s.headerIconContainer></s.headerIconContainer>
    </s.calendarHeader>
  );
};

export const HeaderMessage = () => {
  return (
    <s.headerMessageContainer>
      <s.headerMessageOrange>[한계속도]</s.headerMessageOrange>
      <s.headerMessageGray>전속력으로</s.headerMessageGray>
    </s.headerMessageContainer>
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
