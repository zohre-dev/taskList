"use client";

import styled from "styled-components";

export const TaskWrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 58px rgba(196, 203, 214, 0.103611);
  border-radius: 24px;
  padding: 22px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;

  .header {
    font-size: 14px;
    font-weight: 400;
    color: $secondary-color;
    margin-bottom: 7px;
  }
  .priority {
    text-transform: capitalize;
  }
  .high-priority {
    color: #f73446;
  }
  .medium-priority {
    color: #ffbd21;
  }
  .low-priority {
    color: #0ac947;
  }

  .status {
    background: rgba(125, 133, 146, 0.14);
    border-radius: 8px;
    padding: 7px 14px;
    color: #7d8592;
    font-weight: 700;
    font-size: 12px;
    outline: none;
    border: none;
    cursor: pointer;
  }
  .icon {
    cursor: pointer;
  }
`;
