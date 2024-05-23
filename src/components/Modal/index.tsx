import React, { Children, FC } from "react";
import { ModalContainer } from "./style";

interface IModalProps {
  show?: boolean;
  width?: number | undefined;
  closable?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ show, width, closable, onClose, children }: IModalProps) => {
  //if show is false:
  if (!show) return <></>;
  return (
    <ModalContainer $width={width}>
      <div className="mask" onClick={() => closable && onClose()}></div>
      <div className="modal-content">{children}</div>
    </ModalContainer>
  );
};
export default Modal;
