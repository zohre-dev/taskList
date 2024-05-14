"use client";
import { FC, useEffect, useState } from "react";
import { TaskCard } from "./TaskCard";
import Image from "next/image";
import { TaskContainer } from "./style";
import { Button } from "../Button";
import { Task, TaskPriority, TaskStatus } from "./models/task";
import { useAppContext } from "@/context";
import { AddOrEditModal } from "../Modal/AddOrEditModal";

export const TaskList: FC = () => {
  // const [selectedTask, setSelectedTask] = useState<{}>({});

  const [selectedTask, setSelectedTask] = useState<Task>({
    title: "",
    priority: TaskPriority.Low,
    status: TaskStatus.TODO,
  });
  //destructure:
  const { values, dispatch, func } = useAppContext();
  const { tasks, editMode } = values;
  const { setOpenModal, setEditMode, setTasks } = dispatch;

  const AddBtnClicked = () => {
    setEditMode(false);
    setOpenModal(true);
  };

  const addOrEditFunc = (task: Task) => {
    //it's addMode
    if (!editMode) {
      setTasks([task, ...tasks]);
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
          <TaskCard task={tsk} key={tsk.id} setSelectedTask={setSelectedTask} />
        ))}
      </div>

      <AddOrEditModal
        addOrEditFunc={addOrEditFunc}
        selectedTask={selectedTask}
      />
    </TaskContainer>
  );
};
