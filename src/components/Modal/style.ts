"use client";

import styled from "styled-components";

// interface IModalProps {
//   $width: number | undefined;
// }

export const ModalContainer = styled.div<{ $width: number | undefined }>`
  //mask:
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(1, 4, 1, 0.4);
  }
  .modal-content {
    background-color: #ffffff;
    box-shadow: 0px 6px 58px rgba(121, 145, 173, 0.195504);
    border-radius: 24px;
    padding: 40px 60px;
    width: ${(props) => props.$width?.toString().concat("%")};
    min-height: 200px;
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 100;
  }
`;
