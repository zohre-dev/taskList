"use client";
import { FC, useEffect, useState } from "react";
import { TaskCard } from "./TaskCard";
import Image from "next/image";
import { TaskContainer } from "./style";
import { Button } from "../Button";
import { TaskStatus } from "./models/taskStatus";
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
  const [editMode, setEditMode] = useState<boolean>(false);
  const { values, dispatch, func } = useAppContext();
  const lastId = tasks[tasks.length - 1].id;

  const AddBtnClicked = () => {
    dispatch.setOpenModal(true);
  };

  const AddOrEditTask = (task: Task) => {
    //it's addMode - editMode is false
    if (!editMode) {
      console.log("addMode ", task);
      setTasks((prevTasks) => [task, ...prevTasks]);
    }
  };

  return (
    <TaskContainer>
      <div className="flex justify-between items-center">
        <h2>Task List</h2>
        <Button onClick={AddBtnClicked} bgcolor="#713fff">
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
        {tasks.map((tsk) => (
          <TaskCard task={tsk} key={tsk.id} />
        ))}
      </div>

      <AddOrEditModal
        editMode={editMode}
        newRecordId={lastId ? lastId + 1 : 1}
        AddOrEditTask={AddOrEditTask}
      />
    </TaskContainer>
  );
};
