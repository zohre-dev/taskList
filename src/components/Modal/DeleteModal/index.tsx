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

  const handleDelete = () => {
    deleteFunc();
  };

  return (
    <Modal
      show={values.openDeleteModal}
      width={values.width}
      closable={values.closable}
      onClose={func.onCloseDeleteMoadl}
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
