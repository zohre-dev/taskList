import styled from "styled-components";

export const ButtonContainer = styled.button<{
  $bgcolor: string | undefined;
}>`
  background: ${(props) => props.$bgcolor};
  box-shadow: 0px 6px 12px rgba(113, 63, 255, 0.25);
  border-radius: 14px;
  padding: 13px 30px;
  outline: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;

  &:disabled {
    background-color: #91929e;
    cursor: not-allowed;
  }

  &.outline {
    background: #ffffff;
    border: 1px solid #d8e0f0;
    box-shadow: 0px 1px 2px rgba(184, 200, 224, 0.222055);
    font-weight: 400;
    color: #7d8592;
  }
  &.priorityBtn {
    background-color: white;
    border: 1px solid ${(props) => props.$bgcolor};
    color: ${(props) => props.$bgcolor};
    text-transform: capitalize;
    &-selected {
      background-color: ${(props) => props.$bgcolor};
      color: #ffffff;
    }
  }
`;
