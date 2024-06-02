import { FC } from "react";
import Modal from "..";
import { useAppContext } from "@/context";
import { Button } from "@/components/Button";
import { DeleteModalWrapper } from "./style";
import { theme } from "@/app/styles/theme";

interface IDelete {
  deleteFunc: () => void;
}
export const DeleteModal: FC<IDelete> = ({ deleteFunc }) => {
  const { values, func } = useAppContext();
  const { onCloseDeleteModal } = func;

  const handleDelete = () => {
    deleteFunc();
  };
  const handleCancle = () => {
    onCloseDeleteModal();
  };
  return (
    <Modal
      show={values.openDeleteModal}
      width={values.width}
      closable={values.closable}
      onClose={func.onCloseDeleteModal}
    >
      <DeleteModalWrapper>
        <p>Are you sure you want to delete this task?</p>
        <div className="delete-modal-actions">
          <Button bgcolor="#713fff" onClick={handleDelete}>
            Delete
          </Button>
          <Button bgcolor={`${theme.gray}`} onClick={handleCancle}>
            Cancel
          </Button>
        </div>
      </DeleteModalWrapper>
    </Modal>
  );
};
