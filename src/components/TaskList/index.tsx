"use client";
import { FC, useState } from "react";
import { TaskCard } from "./TaskCard";
import Image from "next/image";
import { TaskContainer } from "./style";
import { Button } from "../Button";
import { TaskStatus } from "./models/enums";
import { Task } from "./models/task";
import { AddOrEditModal } from "../Modal/AddOrEditModal";
import { useAppContext } from "@/context";

export const taskRecords: Task[] = [
  {
    id: 1,
    title: "Go to gym",
    priority: "high",
    status: TaskStatus.TODO,
    // progress: TaskProgress.TODO,
  },
  {
    id: 2,
    title: "Read a book",
    priority: "low",
    status: TaskStatus.DONE,
    // progress: TaskProgress.DONE,
  },
];

export const TaskList: FC = () => {
  const [tasks, setTasks] = useState<Task[]>(taskRecords);
  const { values, dispatch, func } = useAppContext();
  const AddBtnClicked = () => {
    dispatch.setOpenModal(true);
  };

  return (
    <TaskContainer>
      {[0, 10, 15]}
      <div className="flex justify-between items-center">
        <h2>Task List</h2>
        <button onClick={AddBtnClicked}>AddTask</button>
        <Button bgColor="#713fff">
          <Image
            src="/assets/icons/add.svg"
            height={16}
            width={16}
            alt="add"
            className="icon"
          />
          Add Task
        </Button>
      </div>
      <div>
        {taskRecords.map((tsk) => (
          <TaskCard task={tsk} />
        ))}
      </div>

      <AddOrEditModal editMode={false} />
    </TaskContainer>
  );
};
