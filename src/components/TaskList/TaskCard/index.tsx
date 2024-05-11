import Image from "next/image";
import { FC, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { TaskWrapper } from "./style";
import { Task } from "../models/task";
import { TaskStatus } from "../models/enums";
import { AddOrEditModal } from "@/components/Modal/AddOrEditModal";
import { useAppContext } from "@/context";

interface TaskCardProps {
  task: Task;
}

export const TaskCard: FC<TaskCardProps> = ({ task }) => {
  //Destructure:
  const { id, title, priority, status } = task;

  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const { dispatch } = useAppContext();

  const editBtnClicked = () => {
    setShowEditForm(true);
    dispatch.setOpenModal(true);
  };

  return (
    <>
      <TaskWrapper>
        <div className="flex flex-col">
          <span className="header">Task</span>
          <span className="title">{title}</span>
        </div>
        <div className="flex flex-col">
          <span className="header">Priority</span>
          <span className={`title priority ${priority}-priority`}>
            {priority}
          </span>
        </div>
        <div className="">
          <button className="status"> {status}</button>
        </div>
        {/* <div className="progress">
        <CircularProgressbar
          value={value}
          maxValue={1}
          text={`${value * 100}%`}
        />
      </div> */}
        <div className="flex items-center justify-between gap-3">
          <Image
            className="icon"
            src="/assets/icons/edit.svg"
            height={24}
            width={24}
            alt="edit icon"
            onClick={editBtnClicked}
          />
          <Image
            className="icon"
            src="/assets/icons/delete.svg"
            height={24}
            width={24}
            alt="delete icon"
          />
        </div>
      </TaskWrapper>
      {showEditForm && <AddOrEditModal editMode={true} />}
    </>
  );
};
