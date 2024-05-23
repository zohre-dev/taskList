"use client";
import { FC, useEffect, useState } from "react";
import { TaskCard } from "./TaskCard";
import Image from "next/image";
import { TaskContainer } from "./style";
import { Button } from "../Button";
import { Task, TaskPriority, TaskStatus } from "./models/task";
import { useAppContext } from "@/context";
import { AddOrEditModal } from "../Modal/AddOrEditModal";
import { DeleteModal } from "../Modal/DeleteModal";

export const TaskList: FC = () => {
  // const [selectedTask, setSelectedTask] = useState<{}>({});

  //TODO
  const [selectedTask, setSelectedTask] = useState<Task>();
  //destructure:
  const { values, dispatch } = useAppContext();
  const { tasks, editMode } = values;

  const { setOpenModal, setEditMode, setTasks, setDeleteMode } = dispatch;

  const AddBtnClicked = () => {
    setEditMode(false);
    setOpenModal(true);
  };

  const onEdit = (task: Task) => {
    setEditMode(true);
    setDeleteMode(false);
    setSelectedTask(task);

    setOpenModal(true);
  };
  const onDelete = (id: number) => {
    setEditMode(false);
    setDeleteMode(true);
    setOpenModal(true);

    // setTasks((prev) => prev.filter((item) => item.id !== id));
  };
  const onStatus = (id: number) => {
    const statusChengedTasks = tasks.map((tsk) => {
      if (tsk.id === id) {
        switch (tsk.status) {
          case TaskStatus.TODO: {
            return { ...tsk, status: TaskStatus.IN_PROGRESS };
          }
          case TaskStatus.IN_PROGRESS: {
            return { ...tsk, status: TaskStatus.DONE };
          }
          case TaskStatus.DONE: {
            return { ...tsk, status: TaskStatus.TODO };
          }
          default:
            return tsk;
        }
      } else {
        return tsk;
      }
    });

    setTasks(statusChengedTasks);
  };

  const addOrEditFunc = (task: Task) => {
    //it's addMode:
    if (!editMode) {
      setTasks([task, ...tasks]);
    }
    //it's editMode:
    else {
      const editedTasks = tasks.map((tsk) => (tsk.id === task.id ? task : tsk));
      console.log(editedTasks);
      setTasks(editedTasks);
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
          <TaskCard
            task={tsk}
            key={tsk.id}
            onEdit={() => onEdit(tsk)}
            onDelete={() => onDelete(tsk.id)}
            onStatus={() => onStatus(tsk.id)}
          />
        ))}
      </div>

      <AddOrEditModal
        addOrEditFunc={addOrEditFunc}
        selectedTask={selectedTask}
      />
      <DeleteModal />
    </TaskContainer>
  );
};
