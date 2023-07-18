import styled from "styled-components"
import { TitleNormal } from "../text/styled";
import { Link } from "react-router-dom";
import { useEffect } from "react";


export const HeaderBackSvg = styled.svg`
display: block;
flex-grow: 0;
flex-shrink: 0;
width: 30px;
height: 30px;
position: relative;
`;

export const HeaderBackArrow = () => {
  return (
    <HeaderBackSvg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
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


export const HeaderBackContainer = styled(Link)`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 390px;
  height: fit-content;
  position: relative;
  padding: 20px 15px;
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



export const HeaderBack = (props) => {
  const check = () => {
    console.log("check!");
  }
  return (
    <HeaderBackContainer className="m-auto mt-[47px]">
      <HeaderBackArrow />
      <TitleNormal>
        <Label onClick={check}>{props.text}</Label>
      </TitleNormal>
      <HeaderNone />
    </HeaderBackContainer>
  );
};
