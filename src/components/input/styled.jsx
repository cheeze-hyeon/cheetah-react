import styled from "styled-components";
import { TextNormal } from "../text/styled";
import { Link } from "react-router-dom";

export const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

export const FieldWithLabel = (props) => (
  <LabelContainer>
    <TextNormal>{props.label}</TextNormal>
    {props.children}
  </LabelContainer>
);

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
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
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
        <TextNormal>
          <input
            className="outline-none"
            placeholder={props.placeholder}
            defaultValue={props.defaultvalue}
            type={props.type}
            value={props.value}
            id={props.id}
            required
          />
        </TextNormal>
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

export const CalendarIcon = () => {
  return (
    <CalendarSvg
      width={18}
      height={21}
      viewBox="0 0 18 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x={1}
        y={3.29999}
        width={16}
        height={16.2}
        rx={2}
        stroke="#8F9BB3"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.556 1.5V5.1"
        stroke="#8F9BB3"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.44397 1.5V5.1"
        stroke="#8F9BB3"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 8.70001H17"
        stroke="#8F9BB3"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </CalendarSvg>
  );
};

export const CalendarSvg = styled.svg`
  flex-grow: 0;
  flex-shrink: 0;
  width: 16px;
  height: 18px;
`;

export const DateFieldContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  height: 50px;
  width: 48%;
  padding: 0px 7px;
  border-radius: 8px;
  background: #fff;
  border-width: 2px;
  border-color: #f5f5f5;
  border-style: solid;
  margin: 0;
`;

export const InputDateField = (props) => {
  return (
    <DateFieldContainer>
      <input type="Date" />
      {/* <CalendarIcon /> */}
    </DateFieldContainer>
  );
};
export const TwoDateFieldContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  height: 50px;
  padding: 0px 2px;
`;

export const TwoInputDateField = (props) => {
  return (
    <TwoDateFieldContainer>
      <InputDateField></InputDateField>
      <InputDateField></InputDateField>
    </TwoDateFieldContainer>
  );
};

export const ClockSvg = styled.svg`
  flex-grow: 0;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
`;

export const ClockIcon = () => {
  return (
    <ClockSvg
      width={20}
      height={21}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx={10}
        cy={10.5}
        r={9}
        stroke="#8F9BB3"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5558 5.09998V10.5L14.1558 12.3"
        stroke="#8F9BB3"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </ClockSvg>
  );
};

export const TimeFieldContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  height: 50px;
  padding: 0px 15px;
  border-radius: 8px;
  background: #fff;
  border-width: 2px;
  border-color: #f5f5f5;
  border-style: solid;
  margin: 0;
`;

export const InputTimeField = (props) => {
  return (
    <TimeFieldContainer>
      {/* <Text> */}
      <input type="number" className="w-[275px]" />
      <ClockIcon />
    </TimeFieldContainer>
  );
};

export const CheckTrue = () => {
  return (
    <CheckTrueSvg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.4375 2.8125H6.5625C5.56827 2.81359 4.61507 3.20902 3.91205 3.91205C3.20902 4.61507 2.81359 5.56827 2.8125 6.5625V23.4375C2.81359 24.4317 3.20902 25.3849 3.91205 26.088C4.61507 26.791 5.56827 27.1864 6.5625 27.1875H23.4375C24.4317 27.1864 25.3849 26.791 26.088 26.088C26.791 25.3849 27.1864 24.4317 27.1875 23.4375V6.5625C27.1864 5.56827 26.791 4.61507 26.088 3.91205C25.3849 3.20902 24.4317 2.81359 23.4375 2.8125ZM21.3428 10.9154L13.4678 20.2904C13.3814 20.3933 13.2739 20.4764 13.1526 20.5342C13.0313 20.5919 12.899 20.6229 12.7646 20.625H12.7488C12.6174 20.625 12.4875 20.5973 12.3675 20.5438C12.2475 20.4903 12.14 20.4122 12.0521 20.3145L8.67715 16.5645C8.59144 16.4735 8.52476 16.3664 8.48104 16.2494C8.43732 16.1323 8.41744 16.0077 8.42256 15.8829C8.42769 15.758 8.45771 15.6355 8.51088 15.5224C8.56404 15.4093 8.63928 15.308 8.73215 15.2245C8.82503 15.1409 8.93367 15.0767 9.0517 15.0357C9.16973 14.9947 9.29476 14.9777 9.41945 14.9858C9.54414 14.9938 9.66597 15.0266 9.77777 15.0824C9.88958 15.1382 9.98911 15.2158 10.0705 15.3105L12.7242 18.259L19.9072 9.70957C20.0683 9.52329 20.2963 9.40789 20.5418 9.38833C20.7873 9.36877 21.0307 9.4466 21.2193 9.60502C21.4079 9.76343 21.5265 9.9897 21.5497 10.2349C21.5728 10.4801 21.4984 10.7246 21.3428 10.9154Z"
        fill="#A3A2A4"
      />
    </CheckTrueSvg>
  );
};

export const CheckTrueSvg = styled.svg`
  display: block;
  flex-grow: 0;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  position: relative;
`;

export const TodoContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  width: 307px;
  height: 38px;
  padding: 0px 5px;
  border-radius: 8px;
  background: #fff;
  border-width: 2px;
  border-color: #f5f5f5;
  border-style: solid;
`;

export const Frame3672 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
`;

export const TodoNormal = (props) => {
  return (
    <TodoContainer>
      <Frame3668>
        <Frame3672>
          <CheckTrue />
          <TextNormal>
            <input defaultValue={props.defaultvalue} />
          </TextNormal>
        </Frame3672>
      </Frame3668>
    </TodoContainer>
  );
};

export const Close = ({ onClick, color }) => {
  return (
    <CloseSvg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.99999 11.1783L14.7142 15.8925C14.8713 16.0443 15.0818 16.1283 15.3003 16.1264C15.5188 16.1245 15.7278 16.0368 15.8823 15.8823C16.0369 15.7278 16.1245 15.5188 16.1264 15.3003C16.1283 15.0818 16.0443 14.8713 15.8925 14.7142L11.1783 9.99999L15.8925 5.28583C16.0443 5.12866 16.1283 4.91816 16.1264 4.69966C16.1245 4.48116 16.0369 4.27215 15.8823 4.11764C15.7278 3.96314 15.5188 3.8755 15.3003 3.8736C15.0818 3.8717 14.8713 3.95569 14.7142 4.10749L9.99999 8.82166L5.28583 4.10749C5.12795 3.95945 4.91867 3.87863 4.70227 3.88214C4.48587 3.88566 4.27932 3.97323 4.12634 4.12632C3.97335 4.27941 3.88593 4.48602 3.88257 4.70243C3.87921 4.91883 3.96017 5.12805 4.10833 5.28583L8.82166 9.99999L4.10749 14.7142C4.0279 14.791 3.96442 14.883 3.92074 14.9847C3.87707 15.0863 3.85408 15.1957 3.85312 15.3063C3.85216 15.417 3.87324 15.5267 3.91514 15.6291C3.95704 15.7315 4.01892 15.8246 4.09717 15.9028C4.17541 15.9811 4.26845 16.0429 4.37087 16.0848C4.47328 16.1267 4.58301 16.1478 4.69366 16.1469C4.80431 16.1459 4.91366 16.1229 5.01533 16.0792C5.117 16.0356 5.20896 15.9721 5.28583 15.8925L9.99999 11.1783Z"
        fill={color ? color : "black"}
      />
    </CloseSvg>
  );
};

const CloseSvg = styled.svg`
  display: block;
  flex-grow: 0;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  position: relative;
`;

export const TodoWCloseContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  height: 38px;
  padding-right: 10px;
  padding-left: 5px;
  border-radius: 8px;
  background: #fff;
  border-width: 2px;
  border-color: #f5f5f5;
  border-style: solid;
`;

export const TodoCheckContainer = styled(TodoWCloseContainer)`
  border-style: none;
  border-bottom: 1px solid var(--light-gray, #f5f5f5);
  background: var(--white, #fff);
  border-radius: 0px;
`;

export const TodoWithCloseBtn = (props) => {
  return (
    <TodoWCloseContainer>
      <div className="flex flex-row gap-2 w-full items-center">
        <CheckTrue />
        <TextNormal>
          <input defaultValue={props.defaultvalue} />
        </TextNormal>
      </div>
      <Close onClick={props.clickBtn} />
    </TodoWCloseContainer>
  );
};

export const TodoCheck = (props) => {
  return (
    <TodoCheckContainer>
      <div className="flex flex-row gap-2 w-full items-center">
        <CheckTrue />
        <TextNormal className="w-5/6">
          <input className="w-full" defaultValue={props.defaultvalue} />
        </TextNormal>
      </div>
      <Close onClick={props.clickBtn} />
    </TodoCheckContainer>
  );
};
