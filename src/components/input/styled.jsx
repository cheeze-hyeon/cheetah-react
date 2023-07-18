import styled from "styled-components";
import { TextNormal } from "../text/styled";
import { Link } from "react-router-dom";

export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  width: 350px;
  height: 50px;
  gap: 16px;
`;

export const InputTextField = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  flex-basis: 100%;
  height: 50px;
  padding: 0px 15px;
  border-radius: 8px;
  background: #fff;
  border-width: 2px;
  border-color: #f5f5f5;
  border-style: solid;
`;

export const InputTextFieldNon = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  flex-basis: 100%;
  height: 50px;
  padding: 0px 15px;
  border-radius: 8px;
  background: #f5f5f5;
  border-width: 2px;
  border-color: #f5f5f5;
  border-style: solid;
`;

export const SmallButtonActive = styled.div`
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
`;

export const Frame3668 = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-grow: 1;
  flex-basis: 100%;
  height: 19px;
  gap: 10px;
`;

export const Frame = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  gap: 16px;
`;

export const Label = styled(Link)`
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
  color: #fff;
`;

export const Text = styled.p`
  margin: 0;
  white-space: pre-wrap;
  flex-grow: 1;
  font-family: Pretendard;
  font-size: 15px;
  line-height: 19px;
  letter-spacing: 0px;
  font-weight: 500;
  text-align: left;
  color: #000;
`;

export const InputTextFieldActive = (props) => {
  return (
    <Container>
      <InputTextField>
        <Frame3668>
          <TextNormal>
            <Text>
              <input
                className="outline-none"
                placeholder={props.placeholder}
                defaultValue={props.defaultvalue}
                type={props.type}
                value={props.value}
                id={props.id}
                required
              />
            </Text>
          </TextNormal>
        </Frame3668>
      </InputTextField>
    </Container>
  );
};

export const InputTextFieldNonActive = (props) => {
  return (
    <Container>
      <InputTextFieldNon>
        <Frame3668>
          <TextNormal>
            <Text>{props.text}</Text>
          </TextNormal>
        </Frame3668>
      </InputTextFieldNon>
    </Container>
  );
};

export const InputTextFieldButton = (props) => {
  return (
    <Container>
      <InputTextField>
        <Frame3668>
          <TextNormal>
            <Text>
              <input
                className="outline-none"
                placeholder={props.placeholder}
                defaultValue={props.defaultvalue}
                type={props.type}
                value={props.value}
                id={props.id}
                required
              />
            </Text>
          </TextNormal>
        </Frame3668>
      </InputTextField>
      <SmallButtonActive>
        <Frame>
          <Label>{props.text}</Label>
        </Frame>
      </SmallButtonActive>
    </Container>
  );
};

export const FormLabel = styled.p`
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
  color: #000;
`;

export const FieldContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  height: 103px;
  gap: 5px;
`;

export const FieldDefault = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  gap: 10px;
`;

export const AlertLabel = styled.p`
  margin: 0;
  white-space: pre-wrap;
  flex-grow: 1;
  font-family: Pretendard;
  font-size: 13px;
  line-height: 19px;
  letter-spacing: 0px;
  text-align: left;
  color: #f19a37;
`;
