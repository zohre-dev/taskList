import { FC } from "react";
import Modal from "..";
import { useAppContext } from "@/context";
import { Button } from "@/components/Button";
import { DeleteModalWrapper } from "./style";

interface IDelete {
  deleteFunc: () => void;
}
export const DeleteModal: FC<IDelete> = ({ deleteFunc }) => {
  const { values, func } = useAppContext();
  const { onClose } = func;
  const { deleteMode } = values;

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteFunc();
  };

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
          <Button bgcolor="#713fff" onClick={handleDelete}>
            Delete
          </Button>
          <Button bgcolor="#713fff">Cancel</Button>
        </div>
      </DeleteModalWrapper>
    </Modal>
  );
};
