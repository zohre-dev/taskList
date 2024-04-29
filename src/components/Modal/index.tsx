import { Children, FC } from "react";
import { ModalContainer } from "./style";

type ModalProps = {
  children: React.ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  return (
    <ModalContainer>
      <div className="modal-content">{children}</div>
    </ModalContainer>
  );
};
export default Modal;
