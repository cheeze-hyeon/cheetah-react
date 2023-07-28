import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  left: 50%;
  transform: translate(-50%);
  width: 390px;
  height: 844px;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  z-index: 99;
`;

export const ModalHeaderContainer = styled.div`
  position: fixed;
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  background: var(--white);
  width: 327px;
`;
