import styled from "styled-components";
import { TitleNormal } from "../text/styled";
import { Link, useNavigate } from "react-router-dom";
import { Close } from "../input/styled";

export const HeaderContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 390px;
  height: fit-content;
  position: relative;
  padding: 20px 15px;
`;

export const ModalContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  height: 44px;
  position: relative;
  padding: 10px;
`;

export const HeaderNone = styled.div`
  box-sizing: border-box;
  display: block;
  flex-grow: 0;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  position: relative;
  overflow: hidden;
`;

export const HeaderBackSvg = styled.svg`
  display: block;
  flex-grow: 0;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  position: relative;
`;

export const HeaderBackArrow = ({ onClick }) => {
  return (
    <HeaderBackSvg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M6.5625 14.0625H25.3125C25.5611 14.0625 25.7996 14.1613 25.9754 14.3371C26.1512 14.5129 26.25 14.7514 26.25 15C26.25 15.2486 26.1512 15.4871 25.9754 15.6629C25.7996 15.8387 25.5611 15.9375 25.3125 15.9375H6.5625C6.31386 15.9375 6.0754 15.8387 5.89959 15.6629C5.72377 15.4871 5.625 15.2486 5.625 15C5.625 14.7514 5.72377 14.5129 5.89959 14.3371C6.0754 14.1613 6.31386 14.0625 6.5625 14.0625Z"
        fill="black"
      />
      <path
        d="M6.95062 15L14.7262 22.7737C14.9023 22.9498 15.0012 23.1885 15.0012 23.4375C15.0012 23.6864 14.9023 23.9252 14.7262 24.1012C14.5502 24.2773 14.3115 24.3762 14.0625 24.3762C13.8135 24.3762 13.5748 24.2773 13.3987 24.1012L4.96125 15.6637C4.87394 15.5767 4.80467 15.4732 4.75741 15.3593C4.71015 15.2454 4.68582 15.1233 4.68582 15C4.68582 14.8767 4.71015 14.7546 4.75741 14.6407C4.80467 14.5268 4.87394 14.4233 4.96125 14.3362L13.3987 5.89874C13.5748 5.72271 13.8135 5.62381 14.0625 5.62381C14.3115 5.62381 14.5502 5.72271 14.7262 5.89874C14.9023 6.07478 15.0012 6.31354 15.0012 6.56249C15.0012 6.81145 14.9023 7.05021 14.7262 7.22624L6.95062 15Z"
        fill="black"
      />
    </HeaderBackSvg>
  );
};

export const HeaderMenuIcon = () => {
  return (
    <MenuSvg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_356_8991"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={30}
        height={30}
      >
        <rect width={30} height={30} fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_356_8991)">
        <path
          d="M3.75 22.5V20H26.25V22.5H3.75ZM3.75 16.25V13.75H26.25V16.25H3.75ZM3.75 10V7.5H26.25V10H3.75Z"
          fill="#1C1B1F"
        />
      </g>
    </MenuSvg>
  );
};

const MenuSvg = styled.svg`
  display: block;
  flex-grow: 0;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  position: relative;
`;

const HeaderMoreIcon = () => {
  return (
    <MoreSvg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 23.75C12.5 25.125 13.625 26.25 15 26.25C16.375 26.25 17.5 25.125 17.5 23.75C17.5 22.375 16.375 21.25 15 21.25C13.625 21.25 12.5 22.375 12.5 23.75ZM12.5 6.25C12.5 7.625 13.625 8.75 15 8.75C16.375 8.75 17.5 7.625 17.5 6.25C17.5 4.875 16.375 3.75 15 3.75C13.625 3.75 12.5 4.875 12.5 6.25ZM12.5 15C12.5 16.375 13.625 17.5 15 17.5C16.375 17.5 17.5 16.375 17.5 15C17.5 13.625 16.375 12.5 15 12.5C13.625 12.5 12.5 13.625 12.5 15Z"
        fill="black"
      />
    </MoreSvg>
  );
};

const MoreSvg = styled.svg`
  display: block;
  flex-grow: 0;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  position: relative;
`;

export const TagSvg = styled.svg`
  // display: block;
  flex-grow: 0;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  position: relative;
`;

export const HeaderTagIcon = (props) => {
  return (
    <TagSvg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="#716A56"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.875 8.75C6.37772 8.75 5.90081 8.55246 5.54917 8.20083C5.19754 7.84919 5 7.37228 5 6.875C5 6.37772 5.19754 5.90081 5.54917 5.54917C5.90081 5.19754 6.37772 5 6.875 5C7.37228 5 7.84919 5.19754 8.20083 5.54917C8.55246 5.90081 8.75 6.37772 8.75 6.875C8.75 7.37228 8.55246 7.84919 8.20083 8.20083C7.84919 8.55246 7.37228 8.75 6.875 8.75ZM26.7625 14.475L15.5125 3.225C15.0625 2.775 14.4375 2.5 13.75 2.5H5C3.6125 2.5 2.5 3.6125 2.5 5V13.75C2.5 14.4375 2.775 15.0625 3.2375 15.5125L14.475 26.7625C14.9375 27.2125 15.5625 27.5 16.25 27.5C16.9375 27.5 17.5625 27.2125 18.0125 26.7625L26.7625 18.0125C27.225 17.5625 27.5 16.9375 27.5 16.25C27.5 15.55 27.2125 14.925 26.7625 14.475Z"
        fill="#716A56"
      />
    </TagSvg>
  );
};

export const Label = styled.p`
  margin: 0;
  white-space: pre-wrap;
  flex-grow: 0;
  flex-shrink: 0;
  font-family: Pretendard;
  font-size: 20px;
  line-height: 19px;
  letter-spacing: 0px;
  font-weight: 600;
  text-align: left;
  color: #000;('
`;

export const Button = styled(Link)`
  margin: 0;
`;

export const HeaderBack = (props) => {
  // const onClickBack
  const navigate = useNavigate();
  return (
    <HeaderContainer className="m-auto mt-[47px]">
      <Button to={props.to} onClick={() => navigate(-1)}>
        <HeaderBackArrow />
      </Button>
      <TitleNormal>{props.text}</TitleNormal>
      <HeaderNone />
    </HeaderContainer>
  );
};

export const HeaderMenu = (props) => {
  return (
    <HeaderContainer className="m-auto mt-[47px]">
      <HeaderNone />
      <TitleNormal>{props.text}</TitleNormal>
      <Button onClick={props.onClickMenu}>
        <HeaderMenuIcon />
      </Button>
    </HeaderContainer>
  );
};

export const HeaderMore = (props) => {
  return (
    <HeaderContainer className="m-auto mt-[47px]">
      <HeaderBackArrow />
      <TitleNormal>{props.text}</TitleNormal>
      <HeaderMoreIcon />
    </HeaderContainer>
  );
};

export const HeaderTag = (props) => {
  return (
    <HeaderContainer className="mt-[47px] border-b-">
      <HeaderNone />
      <TitleNormal>{props.text}</TitleNormal>
      <Button to={props.to}>
        <HeaderTagIcon />
      </Button>
    </HeaderContainer>
  );
};

const ButtonWrapper = styled.div`
  cursor: pointer;
`;

export const HeaderModal = (props) => {
  return (
    <ModalContainer className="m-auto">
      <HeaderNone />
      <TitleNormal>{props.text}</TitleNormal>
      <Close type="button" onClick={props.onClickMenu} />
    </ModalContainer>
  );
};
export const HeaderModalBack = (props) => {
  return (
    <ModalContainer className="m-auto">
      <ButtonWrapper>
        <HeaderBackArrow onClick={props.clickBtnBack} />
      </ButtonWrapper>
      <TitleNormal>{props.text}</TitleNormal>
      <ButtonWrapper>
        <Close onClick={props.clickBtnClose} />
      </ButtonWrapper>
    </ModalContainer>
  );
};