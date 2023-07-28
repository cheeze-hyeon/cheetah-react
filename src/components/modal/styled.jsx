import styled, {keyframes} from "styled-components";

export const slideUp = keyframes`
from {
  transform: translateY(50%);
  opacity: 0%;
}
80%{
  opacity: 90%;
}
to {
  transform: translateY(0%);
  opacity: 100%;
}
}`;

export const brighten = keyframes`
from {
  opacity: 0%;
}
to {
  opacity: 100%;
}
}`;

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
  animation: ${brighten} 0.3s linear 1;
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
