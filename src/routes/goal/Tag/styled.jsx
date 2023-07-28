import styled from "styled-components"
import { slideUp } from "../../../components/modal/styled";

export const TagModalContainer = styled.div`
  position: fixed;
  width: 390px;
  padding: 10px 15px;
  align-items: flex-start;
  height: auto;
  border-radius: 25px 25px 0px 0px;
  background: var(--white);
  box-shadow: 0px 3px 30px 0px rgba(0, 0, 0, 0.16);
  bottom: 0;
  left: 0;
  margin: auto;
  animation: ${slideUp} .5s ease-out 1;
`;

