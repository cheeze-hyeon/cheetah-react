import styled from "styled-components";

export const TitleHeavy = styled.p`
  margin: 0;
  white-space: pre-wrap;
  flex-grow: 0;
  flex-shrink: 0;
  font-family: Pretendard;
  font-size: 28px;
  line-height: 19px;
  letter-spacing: 0px;
  font-weight: 600;
  text-align: left;
`;

export const TitleNormal = styled.p`
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
`;

export const TextHeavy = styled.p`
  margin: 0;
  white-space: pre-wrap;
  flex-grow: 0;
  flex-shrink: 0;
  font-family: Pretendard;
  font-size: 18px;
  line-height: 19px;
  letter-spacing: 0px;
  text-align: left;
  font-weight: 600;
`;

export const TextNormal = styled.p`
  margin: 0;
  white-space: pre-wrap;
  flex-grow: 0;
  flex-shrink: 0;
  font-family: Pretendard;
  font-size: 15px;
  line-height: 19px;
  letter-spacing: 0px;
  font-weight: 500;
  text-align: left;
`;

export const TextLight = styled.p`
  margin: 0;
  white-space: pre-wrap;
  flex-grow: 1;
  font-family: Pretendard;
  font-size: 13px;
  line-height: 19px;
  letter-spacing: 0px;
  color: ${(props) => props.color};
  text-align: ${(props) => props ? props.text : 'left'};
  font-weight: ${(props) => props ? props.font_weight : 400};
`;
