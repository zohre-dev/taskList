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
    //mask:
    // <ModalContainer $width={width} onClick={ closable && onClose()}>
    <ModalContainer $width={width} onClick={() => closable && onClose()}>
      <div className="modal-content">{children}</div>
    </ModalContainer>
  );
};
export default Modal;
