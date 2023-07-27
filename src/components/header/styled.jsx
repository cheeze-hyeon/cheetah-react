import styled from "styled-components";
import { TitleNormal } from "../text/styled";
import { Link, useNavigate } from "react-router-dom";
import { Close } from "../input/styled";
import HeaderClose from "../../routes/goal/goaldetailmodal/HeaderClose";

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

export const TagSvg = styled.svg`
  // display: block;
  flex-grow: 0;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  position: relative;
`;

export const HeaderPlusIcon = () => {
  return (
    <HeaderPlusSvg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1269_771)">
        <path
          d="M28.3333 14.9998C28.3333 17.6369 27.5513 20.2148 26.0863 22.4074C24.6212 24.6001 22.5388 26.3091 20.1024 27.3182C17.6661 28.3274 14.9852 28.5914 12.3988 28.077C9.81238 27.5625 7.43661 26.2926 5.57191 24.4279C3.70721 22.5632 2.43733 20.1875 1.92286 17.601C1.40839 15.0146 1.67243 12.3337 2.6816 9.89739C3.69077 7.46104 5.39974 5.37866 7.59239 3.91358C9.78505 2.44849 12.3629 1.6665 15 1.6665C18.5362 1.6665 21.9276 3.07126 24.4281 5.57175C26.9286 8.07223 28.3333 11.4636 28.3333 14.9998ZM21.325 13.7498H16.25V8.67484C16.25 8.34332 16.1183 8.02537 15.8839 7.79095C15.6495 7.55653 15.3315 7.42484 15 7.42484C14.6685 7.42484 14.3505 7.55653 14.1161 7.79095C13.8817 8.02537 13.75 8.34332 13.75 8.67484V13.7498H8.675C8.34348 13.7498 8.02553 13.8815 7.79111 14.116C7.55669 14.3504 7.425 14.6683 7.425 14.9998C7.425 15.3314 7.55669 15.6493 7.79111 15.8837C8.02553 16.1181 8.34348 16.2498 8.675 16.2498H13.75V21.3248C13.75 21.6564 13.8817 21.9743 14.1161 22.2087C14.3505 22.4431 14.6685 22.5748 15 22.5748C15.3315 22.5748 15.6495 22.4431 15.8839 22.2087C16.1183 21.9743 16.25 21.6564 16.25 21.3248V16.2498H21.325C21.6565 16.2498 21.9745 16.1181 22.2089 15.8837C22.4433 15.6493 22.575 15.3314 22.575 14.9998C22.575 14.6683 22.4433 14.3504 22.2089 14.116C21.9745 13.8815 21.6565 13.7498 21.325 13.7498Z"
          fill="#716A56"
        />
      </g>
      <defs>
        <clipPath id="clip0_1269_771">
          <rect width={30} height={30} fill="white" />
        </clipPath>
      </defs>
    </HeaderPlusSvg>
  );
};

const HeaderPlusSvg = styled.svg`
  display: block;
  flex-grow: 0;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  position: relative;
`;

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

export const HeaderPlus = (props) => {
  const navigate = useNavigate();
  return (
    <HeaderContainer className="m-auto mt-[47px]">
      <Button to={props.to} onClick={() => navigate(-1)}>
        <HeaderBackArrow />
      </Button>
      <TitleNormal>{props.text}</TitleNormal>
      <Button onClick={props.onClickPlus}>
        <HeaderPlusIcon />
      </Button>
    </HeaderContainer>
  );
};

const ButtonWrapper = styled.div`
  cursor: pointer;
`;

export const HeaderModal = (props, onClose) => {
  return (
    <ModalContainer className="m-auto">
      <HeaderNone />
      <TitleNormal>{props.text}</TitleNormal>
      <Button onClick={props.onClick}>
        <Close />
      </Button>
    </ModalContainer>
  );
};

export const HeaderHamburgerModal = (props, onClose) => {
  return (
    <ModalContainer className="mr-[15px]">
      <HeaderNone />
      <TitleNormal>{props.text}</TitleNormal>
      <Button onClick={props.onClick} className="mr-[5px]">
        <HeaderClose width={props.width} height={props.height}/>
      </Button>
    </ModalContainer>
  );
};

export const HeaderTagModal = (props, onClose) => {
  const handleCloseModal = () => {
    onClose(); // 부모 컴포넌트에서 전달된 onClose 함수를 호출하여 모달을 닫습니다.
  };
  return (
    <ModalContainer className="m-auto">
      <HeaderNone />
      <TitleNormal>{props.text}</TitleNormal>
      <Button onClick={handleCloseModal}>
        <Close />
      </Button>
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
