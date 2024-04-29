import Image from "next/image";
import { FC } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { TaskWrapper } from "./style";

export const TaskCard: FC = () => {
  const value = 0.66;
  return (
    <TaskWrapper>
      <div className="flex flex-col">
        <span className="header">Task</span>
        <span className="title">Go to gym</span>
      </div>
      <div className="flex flex-col">
        <span className="header">Priority</span>
        <span className="title priority high-priority">High</span>
      </div>
      <div className="">
        <button className="status">To Do</button>
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
  );
};
