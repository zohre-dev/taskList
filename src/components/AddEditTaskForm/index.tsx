import { FC } from "react";

import Modal from "../Modal";
import Image from "next/image";
import { Button } from "../Button";
import Input from "../Input";

export const AddEditTaskForm: FC = () => {
  return (
    <Modal>
      <form className="flex flex-col gap-5">
        <div className="flex justify-between ">
          <span>Add Task</span>
          <Image
            src="/assets/icons/close.svg"
            width={24}
            height={24}
            alt="close"
          />
        </div>
        <Input
          label="Task"
          placeholder="Type your task here..."
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
          <Button bgColor="#713fff">Add</Button>
        </div>
      </form>
    </Modal>
  );
};
