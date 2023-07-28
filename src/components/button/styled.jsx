import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { TextNormal } from "../text/styled";
import FloatingBtn from "../../asset/images/floatingBtn.png";
export const Frame = styled(Link)`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  gap: 5px;
  text-decoration: none;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;
export const Frame2 = styled(Link)`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  gap: 5px;
  text-decoration: none;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

export const LBtnNonActiveContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  width: 347px;
  height: 55px;
  border-radius: 8px;
  background: #eaeef1;
  margin: auto;
  margin-bottom: 14px;
`;

export const LBtnActiveContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  width: 347px;
  height: 55px;
  border-radius: 8px;
  background: ${(props) => props.backgroundColor || "#716a56"};
  margin: auto;
  margin-bottom: 14px;
`;

export const LBtnActiveContainer2 = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  width: 347px;
  height: 55px;
  border-radius: 8px;
  background: #ebe4d2;
  margin: auto;
  margin-bottom: 14px;
`;

export const LBtnNonActiveLabel = styled.p`
  margin: 0;
  white-space: pre-wrap;
  flex-grow: 0;
  flex-shrink: 0;
  font-family: Pretendard;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0px;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  color: #a3a2a4;
`;

export const LargeLabel = styled.p`
  margin: 0;
  white-space: pre-wrap;
  flex-grow: 0;
  flex-shrink: 0;
  font-family: Pretendard;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0px;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
`;

export const LargeButtonActiveContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  width: 347px;
  height: 55px;
  border-radius: 8px;
  background: #716a56;
  margin: auto;
  margin-bottom: 14px;
`;

export const LargeButtonNonActive = (props) => {
  return (
    <LBtnNonActiveContainer onClick={props.onClick}>
      <Frame>
        <LBtnNonActiveLabel>{props.text}</LBtnNonActiveLabel>
      </Frame>
    </LBtnNonActiveContainer>
  );
};

export const LargeButtonActive = (props) => {
  const buttonStyle = {
    color: props.textColor || "#FFFFFF", // Default text color is white if not provided
  };
  return (
    <LBtnActiveContainer
      onClick={props.onClick}
      backgroundColor={props.backgroundColor}
    >
      <Frame to={props.to} style={buttonStyle}>
        <LargeLabel className="text-[#fff]" onClick={props.onClick}>
          {props.text}
        </LargeLabel>
      </Frame>
    </LBtnActiveContainer>
  );
};

export const LargeButtonActive2 = (props) => {
  return (
    <LBtnActiveContainer2 type="button" onClick={props.onClick}>
      <LargeLabel className="text-[#000]">{props.text}</LargeLabel>
    </LBtnActiveContainer2>
  );
};

export const KakaoLoginContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  width: 347px;
  height: 55px;
  border-radius: 10px;
  background: #fae64e;
  margin: auto;
  margin-bottom: 14px;
`;

export const KakaoSvg = styled.svg`
  display: block;
  flex-grow: 0;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  position: relative;
`;

export const KakaoLogo = () => {
  return (
    <KakaoSvg
      width={31}
      height={31}
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5 4.25C22.75 4.25 28.6263 8.83 28.6263 14.4813C28.6263 20.1313 22.75 24.7113 15.5013 24.7113C14.7795 24.7116 14.0584 24.6657 13.3425 24.5738L7.8325 28.1775C7.20625 28.5088 6.985 28.4725 7.2425 27.6613L8.3575 23.0638C4.7575 21.2388 2.37625 18.0763 2.37625 14.4813C2.37625 8.83125 8.25125 4.25 15.5013 4.25H15.5ZM22.885 14.325L24.7225 12.545C24.8285 12.4349 24.8877 12.2879 24.8875 12.1351C24.8873 11.9822 24.8278 11.8354 24.7215 11.7255C24.6152 11.6157 24.4704 11.5513 24.3177 11.5461C24.1649 11.5409 24.0161 11.5952 23.9025 11.6975L21.4925 14.03V12.1025C21.4925 11.946 21.4303 11.796 21.3197 11.6853C21.209 11.5747 21.059 11.5125 20.9025 11.5125C20.746 11.5125 20.596 11.5747 20.4853 11.6853C20.3747 11.796 20.3125 11.946 20.3125 12.1025V15.2987C20.2904 15.3899 20.2904 15.4851 20.3125 15.5763V17.375C20.3125 17.5315 20.3747 17.6815 20.4853 17.7922C20.596 17.9028 20.746 17.965 20.9025 17.965C21.059 17.965 21.209 17.9028 21.3197 17.7922C21.4303 17.6815 21.4925 17.5315 21.4925 17.375V15.6713L22.0263 15.155L23.8113 17.6962C23.8558 17.7597 23.9124 17.8137 23.9779 17.8553C24.0434 17.8969 24.1164 17.9251 24.1927 17.9385C24.2691 17.9518 24.3474 17.95 24.423 17.9331C24.4987 17.9162 24.5703 17.8846 24.6338 17.84C24.6972 17.7954 24.7512 17.7388 24.7928 17.6734C24.8344 17.6079 24.8626 17.5349 24.876 17.4585C24.8893 17.3821 24.8875 17.3039 24.8706 17.2282C24.8537 17.1525 24.8221 17.0809 24.7775 17.0175L22.885 14.3237V14.325ZM19.1875 16.73H17.3625V12.1213C17.3555 11.9696 17.2904 11.8265 17.1806 11.7217C17.0708 11.6169 16.9249 11.5584 16.7731 11.5584C16.6213 11.5584 16.4754 11.6169 16.3656 11.7217C16.2559 11.8265 16.1907 11.9696 16.1838 12.1213V17.32C16.1838 17.645 16.4462 17.91 16.7725 17.91H19.1875C19.344 17.91 19.494 17.8478 19.6047 17.7372C19.7153 17.6265 19.7775 17.4765 19.7775 17.32C19.7775 17.1635 19.7153 17.0135 19.6047 16.9028C19.494 16.7922 19.344 16.73 19.1875 16.73ZM11.8663 15.3662L12.7362 13.2313L13.5338 15.365L11.8663 15.3662ZM15.02 15.975L15.0225 15.955C15.0222 15.8064 14.9655 15.6634 14.8638 15.555L13.5563 12.055C13.5014 11.8882 13.397 11.7421 13.257 11.6362C13.1169 11.5304 12.9479 11.4698 12.7725 11.4625C12.5958 11.4617 12.4231 11.5148 12.2772 11.6146C12.1314 11.7144 12.0195 11.8562 11.9563 12.0212L9.87875 17.115C9.81957 17.2599 9.82037 17.4223 9.88097 17.5666C9.94157 17.7109 10.057 17.8252 10.2019 17.8844C10.3468 17.9436 10.5092 17.9428 10.6535 17.8822C10.7978 17.8216 10.9121 17.7061 10.9713 17.5613L11.3863 16.545H13.9738L14.3463 17.545C14.3717 17.6197 14.4118 17.6886 14.4643 17.7476C14.5169 17.8065 14.5807 17.8543 14.652 17.8882C14.7233 17.922 14.8007 17.9412 14.8796 17.9446C14.9585 17.9479 15.0372 17.9355 15.1112 17.9078C15.1852 17.8802 15.2528 17.8381 15.3102 17.7838C15.3676 17.7296 15.4135 17.6644 15.4452 17.5921C15.4769 17.5198 15.4938 17.4418 15.4948 17.3629C15.4958 17.284 15.481 17.2056 15.4513 17.1325L15.02 15.975ZM10.8675 12.1275C10.8675 11.9712 10.8055 11.8214 10.6951 11.7107C10.5848 11.6001 10.435 11.5378 10.2788 11.5375H6.2225C6.06602 11.5375 5.91595 11.5997 5.80531 11.7103C5.69466 11.821 5.6325 11.971 5.6325 12.1275C5.6325 12.284 5.69466 12.434 5.80531 12.5447C5.91595 12.6553 6.06602 12.7175 6.2225 12.7175H7.6725V17.3875C7.6725 17.544 7.73466 17.694 7.84531 17.8047C7.95595 17.9153 8.10602 17.9775 8.2625 17.9775C8.41898 17.9775 8.56905 17.9153 8.67969 17.8047C8.79034 17.694 8.8525 17.544 8.8525 17.3875V12.7175H10.2775C10.434 12.7175 10.584 12.6553 10.6947 12.5447C10.8053 12.434 10.8675 12.284 10.8675 12.1275Z"
        fill="black"
      />
    </KakaoSvg>
  );
};

export const KakaoLabel = styled.p`
  margin: 0;
  white-space: pre-wrap;
  flex-grow: 0;
  flex-shrink: 0;
  font-family: Pretendard;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0px;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  color: #222;
`;

export const KakaoLogin = (props) => {
  return (
    <KakaoLoginContainer>
      <Frame to={props.to}>
        <KakaoLogo />
        <KakaoLabel>카카오로 시작</KakaoLabel>
      </Frame>
    </KakaoLoginContainer>
  );
};

export const TextBtnMContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  width: 114px;
  height: 24px;
  position: relative;
  padding: 0px 10px;
  margin: auto;
`;

export const TextBtnMLabel = styled.p`
  margin: 0;
  white-space: pre-wrap;
  flex-grow: 0;
  flex-shrink: 0;
  font-family: Pretendard;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0px;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  color: #222;
`;

export const TextBtnMedium = (props) => {
  return (
    <TextBtnMContainer>
      <Frame to={props.to}>
        <TextBtnMLabel>{props.text}</TextBtnMLabel>
      </Frame>
    </TextBtnMContainer>
  );
};

export const TextBtnSContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-grow: 0;
  flex-shrink: 0;
  height: 24px;
  position: relative;
  padding: 0px 10px;
`;

export const TextBtnSComponent = styled.p`
  margin: 0;
  white-space: pre-wrap;
  flex-grow: 0;
  flex-shrink: 0;
  font-family: Pretendard;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0px;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  color: #222;
`;

export const TextBtnSmall = (props) => {
  return (
    <TextBtnSContainer onClick={props.onClick}>
      <Frame2 to={props.to}>
        <TextBtnSComponent>{props.text}</TextBtnSComponent>
      </Frame2>
    </TextBtnSContainer>
  );
};

export const CheckBoxContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  width: auto;
  height: 24px;
  position: relative;
  padding: 0px 10px;
  // margin: auto;
`;

export const CheckBoxInput = styled.input`
  flex-grow: 0;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  border-radius: 2px;
  border-width: 1.5px;
  border-color: #a3a2a4;
  border-style: solid;
`;

export const CheckBoxTextContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  padding: 0px 10px;
`;

export const CheckBoxLabel = styled.p`
  margin: 0;
  white-space: pre-wrap;
  flex-grow: 0;
  flex-shrink: 0;
  font-family: Pretendard;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: center;
  text-transform: uppercase;
  color: #000;
`;

export const CheckBox = (props) => {
  return (
    <CheckBoxContainer>
      <CheckBoxInput
        type="checkbox"
        checked={props.checked}
        name={props.name}
        id={props.id}
        onChange={props.onChange}
      />
      <CheckBoxTextContainer>
        <CheckBoxLabel>{props.text}</CheckBoxLabel>
      </CheckBoxTextContainer>
    </CheckBoxContainer>
  );
};

const TwoButtonContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  width: 347px;
  height: 55px;
  gap: 10px;
  margin: auto;
`;

export const OneButtonContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  width: 133px;
  height: 55px;
  border-radius: 8px;
  background: var(--brown);
  margin: auto;
  margin-bottom: 14px;
`;

export const TwoButtonActiveContainer1 = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  width: 133px;
  height: 55px;
  border-radius: 8px;
  background: var(--brown);
  margin: auto;
  margin-bottom: 14px;
`;

export const TwoButtonActiveContainer2 = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  width: 204px;
  height: 55px;
  border-radius: 8px;
  background: var(--orange);
  margin: auto;
  margin-bottom: 14px;
`;

export const TwoButton = (props) => {
  return (
    <TwoButtonContainer>
      <TwoButtonActiveContainer1 onClick={props.onClick1}>
        <Frame>
          <LargeLabel className="text-[#fff]">{props.text1}</LargeLabel>
        </Frame>
      </TwoButtonActiveContainer1>
      <TwoButtonActiveContainer2 onClick={props.onClick2}>
        <Frame>
          <LargeLabel className="text-[#fff]">{props.text2}</LargeLabel>
        </Frame>
      </TwoButtonActiveContainer2>
    </TwoButtonContainer>
  );
};

export const MBtnActiveContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  width: 150px;
  height: 50px;
  border-radius: 8px;
  background: #f19a37;
  margin: auto;
`;

const MLabel = styled.p`
  margin: 0;
  white-space: pre-wrap;
  flex-grow: 0;
  flex-shrink: 0;
  font-family: Pretendard;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0px;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
`;

export const MediumButtonActive = (props) => {
  return (
    <MBtnActiveContainer>
      <Frame>
        <MLabel className="text-[#fff]">확인</MLabel>
      </Frame>
    </MBtnActiveContainer>
  );
};

export const MBtnNonActiveContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  width: 150px;
  height: 50px;
  border-radius: 8px;
  background: #eaeef1;
  margin: auto;
`;

export const MediumButtonNonActive = (props) => {
  return (
    <MBtnNonActiveContainer>
      <MLabel className="text-[#a3a2a4]">확인</MLabel>
    </MBtnNonActiveContainer>
  );
};

export const SBtnActiveContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  width: 83px;
  height: 50px;
  border-radius: 8px;
  background: #f19a37;
  margin: auto;
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
  color: ${(props) => (props.color ? props.color : "#000")};
`;

export const SmallButtonActive = (props) => {
  return (
    <SBtnActiveContainer>
      <Frame>
        <SLabel className="text-[#fff]">확인</SLabel>
      </Frame>
    </SBtnActiveContainer>
  );
};

export const SBtnNonActiveContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  width: 83px;
  height: 50px;
  border-radius: 8px;
  background: #eaeef1;
  margin: auto;
`;

export const SmallButtonNonActive = (props) => {
  return (
    <SBtnNonActiveContainer>
      <SLabel className="text-[#a3a2a4]">확인</SLabel>
    </SBtnNonActiveContainer>
  );
};

export const SlimButtonContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  height: 40px;
  padding: 0px 20px;
  border-radius: 10px;
  background: ${(props) => (props.bg ? props.bg : "#f19a37")};
  margin: auto;
`;

export const SlimButtonActive = (props) => {
  return (
    <SlimButtonContainer bg={props.bg} onClick={props.onClick}>
      <Frame to={props.to}>
        <SLabel color={props.color}>{props.text}</SLabel>
      </Frame>
    </SlimButtonContainer>
  );
};

export const TagContainer = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  padding: ${(props) => (props.$isSelected ? "6px 10px" : "8px 11px")};
  border-radius: 20px;
  background: ${(props) => props.color};
  border-width: ${(props) => (props.$isSelected ? "4px" : "2px")};
  border-color: #fff;
  border-style: solid;
  opacity: ${(props) => (props.$isSelected ? "1" : "0.8")};
  box-shadow: ${(props) =>
    props.$isSelected
      ? "0px 0px 4px 0px rgba(0, 0, 0, 0.4)"
      : "0px 0px 6px 0 rgba(0, 0, 0, 0.2)"};
`;

export const TagLabel = styled.p`
  margin: 0;
  white-space: pre-wrap;
  flex-grow: 0;
  flex-shrink: 0;
  font-family: Pretendard;
  font-size: 15px;
  line-height: 19px;
  letter-spacing: 0px;
  font-weight: ${(props) => (props.$isSelected ? "600" : "500")};
  text-align: left;

  color: var(--black);
  align-items: center;
  opacity: ${(props) => (props.$isSelected ? "1" : "0.8")};
`;

export const TagDefault = (props) => {
  return (
    <TagContainer
      color={props.color}
      $isSelected={props.isSelected}
      onClick={props.onClick}
      setSelected={props.setSelected}
    >
      <TagLabel $isSelected={props.isSelected}>{props.text}</TagLabel>
    </TagContainer>
  );
};

const ResetSvg = styled.svg`
  display: block;
  flex-grow: 0;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  position: a;
`;

export const IconReset = () => {
  return (
    <ResetSvg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.773 13.773C13.1469 14.4007 12.4029 14.8986 11.5838 15.2378C10.7647 15.5771 9.8866 15.7512 9 15.75C5.27213 15.75 2.25 12.7279 2.25 9C2.25 5.27213 5.27213 2.25 9 2.25C10.8637 2.25 12.5513 3.00563 13.773 4.227C14.3948 4.84875 15.75 6.375 15.75 6.375"
        stroke="black"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.75 3V6.375H12.375"
        stroke="black"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </ResetSvg>
  );
};

export const LogoutSvg = styled.svg`
  display: block;
  flex-grow: 0;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  position: relative;
`;

export const IconLogout = () => {
  return (
    <LogoutSvg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.99689 2.25H2.25V15.75H9"
        stroke="black"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.375 12.375L15.75 9L12.375 5.625"
        stroke="black"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 8.99689H15.75"
        stroke="black"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </LogoutSvg>
  );
};

export const TextBtnSwIconContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  width: 92px;
  height: 24px;
  gap: 5px;
  padding: 0px 10px;
  margin-top: 390px;
  margin-left: 135px;
  margin-right: 24px;
`;

export const TextBtnSContainer2 = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  height: 24px;
  position: relative;
`;

export const TextBtnWIconSmall = (props) => {
  return (
    <TextBtnSContainer2>
      <Frame to={props.to}>
        {props.children}
        <TextBtnSComponent>{props.text}</TextBtnSComponent>
      </Frame>
    </TextBtnSContainer2>
  );
};

export const TextBtnWResetIcon = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <TextBtnWIconSmall text="되돌리기">
        <IconReset />
      </TextBtnWIconSmall>
    </div>
  );
};

export const TextBtnSmallWithicon = () => {
  return (
    <TextBtnSwIconContainer>
      <IconReset />
      <TextBtnWIconSmall text="되돌리기"></TextBtnWIconSmall>
    </TextBtnSwIconContainer>
  );
};

export const TextBtnSmallWithLogout = (props) => {
  return (
    <TextBtnSwIconContainer onClick={props.onClick} to={props.to}>
      <IconLogout />
      <TextBtnWIconSmall text="로그아웃"></TextBtnWIconSmall>
    </TextBtnSwIconContainer>
  );
};

export const Ellipse4Svg = styled.svg`
  flex-grow: 0;
  flex-shrink: 0;
`;

const Ellipse4 = () => {
  return (
    <Ellipse4Svg
      width={120}
      height={120}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_10_5147)">
        <circle cx={60} cy={57} r={30} fill="#F19A37" />
      </g>
      <defs>
        <filter
          id="filter0_d_10_5147"
          x={0}
          y={0}
          width={120}
          height={120}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={3} />
          <feGaussianBlur stdDeviation={15} />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0784314 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_10_5147"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_10_5147"
            result="shape"
          />
        </filter>
      </defs>
    </Ellipse4Svg>
  );
};

export const ShapeSvg = styled.svg`
  position: absolute;
  left: 15px;
  top: 15px;
`;

export const Shape = () => {
  return (
    <ShapeSvg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.8158 14.8158H17.1842V2.18421C17.1842 1.53019 16.654 1 16 1C15.346 1 14.8158 1.53019 14.8158 2.18421V14.8158H2.18421C1.53019 14.8158 1 15.346 1 16C1 16.654 1.53019 17.1842 2.18421 17.1842H14.8158V29.8158C14.8158 30.4698 15.346 31 16 31C16.654 31 17.1842 30.4698 17.1842 29.8158V17.1842H29.8158C30.4698 17.1842 31 16.654 31 16C31 15.346 30.4698 14.8158 29.8158 14.8158Z"
        fill="white"
        stroke="white"
      />
    </ShapeSvg>
  );
};

export const FloatingBtnContainer = styled.div`
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
`;

// export const FloatingButton = () => {
//   return (
//     <FloatingBtnContainer>
//       <Ellipse4 />
//       <Shape />
//     </FloatingBtnContainer>
//   );
// };

export const ColorBtnContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-grow: 0;
  flex-shrink: 0;
  width: 37px;
  height: 37px;
  position: relative;
  gap: 10px;
  padding: 5px;
`;

export const Color = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  width: 27px;
  height: 27px;
  border-radius: 2px;
  background: ${(props) => props.color};
`;

export const ColorBtnDefault = (props) => {
  return (
    <ColorBtnContainer onClick={props.onClick}>
      <Color color={props.color} />
    </ColorBtnContainer>
  );
};

const ColorBtnSelect1 = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  gap: 10px;
  padding: 5px;
`;

export const ColorBtnSelect = (props) => {
  return (
    <ColorBtnContainer>
      <ColorBtnSelect1>
        <Color />
      </ColorBtnSelect1>
    </ColorBtnContainer>
  );
};

export const FloatingButton = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 100;
  right: 5%;
  bottom: 12%;
  cursor: pointer;
  width: 60px;
  height: 60px;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
  background-image: url(${FloatingBtn});
  background-repeat: no-repeat;
  background-size: 60px 60px;
`;
