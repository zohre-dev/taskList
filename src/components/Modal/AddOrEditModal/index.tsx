import { Button } from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import { ChangeEvent, FC, useState } from "react";
import Modal from "..";
import { useAppContext } from "@/context";
import { Task } from "@/components/TaskList/models/task";
import { TaskStatus } from "@/components/TaskList/models/taskStatus";

interface IAddOrEditProps {
  editMode: boolean;
  newRecordId?: number | undefined;
  AddOrEditTask: (tsk: Task) => void;
}

export const AddOrEditModal: FC<IAddOrEditProps> = ({
  editMode,
  newRecordId,
  AddOrEditTask,
}) => {
  const [temporaryTask, setTemporaryTask] = useState<Task>({
    title: "",
    priority: "low",
    status: TaskStatus.TODO,
  });
  //destructure:
  const { values, func } = useAppContext();
  const handleOnClose = () => {
    func.onClose();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTemporaryTask({ ...temporaryTask, id: newRecordId, title: value });
  };
  const AddOrEditButtonClicked = () => {
    AddOrEditTask(temporaryTask);
  };
  const { title } = temporaryTask;
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
          placeholder="Type your task here..."
          onChange={onChange}
          name="title"
          value={title}
        />
        <div className="flex flex-col gap-2">
          <label>Priority</label>
          <div className="flex  gap-3">
            <Button className="priorityBtn" bgcolor="#f73446">
              High
            </Button>
            <Button
              className="priorityBtn priorityBtn-selected"
              bgcolor="#ffbd21"
            >
              Medium
            </Button>
            <Button className="priorityBtn" bgcolor="#0ac947">
              Low
            </Button>
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <Button bgcolor="#713fff" onClick={AddOrEditButtonClicked}>
            {editMode ? "Edit" : "Add"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
