import { FC } from "react";
import Modal from "..";
import { useAppContext } from "@/context";
import { Button } from "@/components/Button";
import { DeleteModalWrapper } from "./style";

export const DeleteModal: FC = () => {
  const { values, func } = useAppContext();
  const { deleteMode } = values;

  if (!deleteMode) return <></>;
  return (
    <Modal
      show={values.open}
      width={values.width}
      closable={values.closable}
      onClose={func.onClose}
    >
      <DeleteModalWrapper>
        <p>Are you sure you want to delete this task?</p>
        <div className="delete-modal-actions">
          <Button bgcolor="#713fff">Delete</Button>
          <Button bgcolor="#713fff">Cancel</Button>
        </div>
      </DeleteModalWrapper>
    </Modal>
  );
};
