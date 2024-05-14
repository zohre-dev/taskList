import { Button } from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import { ChangeEvent, FC, useEffect, useState } from "react";
import Modal from "..";
import { useAppContext } from "@/context";
import {
  Task,
  TaskPriotity,
  TaskStatus,
} from "@/components/TaskList/models/task";

interface IAddOrEditProps {}

export const AddOrEditModal: FC<IAddOrEditProps> = () => {
  const [lastId, setLastId] = useState<number | undefined>(0);
  const [temporaryTask, setTemporaryTask] = useState<Task>({
    title: "",
    priority: TaskPriotity.Low,
    status: TaskStatus.TODO,
  });
  //destructure:
  const { values, dispatch, func } = useAppContext();
  const { tasks, editMode, selectedTask } = values;
  const { addOrEditTask, onClose } = func;

  const handleOnClose = () => {
    onClose();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTemporaryTask({ id: lastId! + 1, ...temporaryTask, title: value });
  };
  const AddOrEditButtonClicked = () => {
    //it's addMode:
    if (!editMode) {
      addOrEditTask(temporaryTask);
      func.onClose();
    }
  };
  //destructure:
  const { title } = temporaryTask;

  useEffect(() => {
    //if editMode is true:
    if (editMode) {
      temporaryTask.id = selectedTask.id;
      temporaryTask.title = selectedTask.title;
      temporaryTask.priority = selectedTask.priority;
      temporaryTask.status = selectedTask.status;
      console.log(temporaryTask);
    } else {
      console.log("tasks are : ", tasks);
      const id = tasks[tasks.length - 1].id;
      setLastId(id);
    }
  });
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
