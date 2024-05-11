import { Button } from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import { FC } from "react";
import Modal from "..";
import { useAppContext } from "@/context";

interface IAddOrEditProps {
  editMode: boolean;
}

export const AddOrEditModal: FC<IAddOrEditProps> = ({ editMode }) => {
  //destructure:
  const { values, dispatch, func } = useAppContext();
  const handleOnClose = () => {
    func.onClose();
  };
  return (
    <Modal
      show={values.open}
      width={values.width}
      closable={values.closable}
      onClose={func.onClose}
    >
      <form className="flex flex-col gap-5">
        <div className="flex justify-between ">
          <span>{editMode ? "Edit Task" : "Add Task"}</span>
          <Image
            src="/assets/icons/close.svg"
            width={24}
            height={24}
            alt="close"
            onClick={handleOnClose}
          />
        </div>
        <Input
          label="Task"
          placeholder={"Type your task here..."}
          name="title"
          value=""
        />
        <div className="flex flex-col gap-2">
          <label>Priority</label>
          <div className="flex  gap-3">
            <Button className="priorityBtn" bgColor="#f73446">
              High
            </Button>
            <Button
              className="priorityBtn priorityBtn-selected"
              bgColor="#ffbd21"
            >
              Medium
            </Button>
            <Button className="priorityBtn" bgColor="#0ac947">
              Low
            </Button>
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <Button bgColor="#713fff" isDisabled={true}>
            {editMode ? "Edit" : "Add"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
