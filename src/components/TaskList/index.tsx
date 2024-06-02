"use client";
import React, { FC, useEffect, useState } from "react";
import { TaskCard } from "./TaskCard";
import Image from "next/image";
import { TaskContainer } from "./style";
import { Button } from "../Button";
import { Task, TaskStatus } from "./models/task";
import { useAppContext } from "@/context";
import { AddOrEditModal } from "../Modal/AddOrEditModal";
import { DeleteModal } from "../Modal/DeleteModal";

export const TaskList: FC = () => {
  const [selectedTaskId, setSelectedTaskId] = useState<number>(0);
  const [selectedTask, setSelectedTask] = useState<Task>();
  //context destructure:
  const { values, dispatch } = useAppContext();
  const { tasks, currentMode } = values;
  const { setOpenModal, setCurrentMode, setTasks, setOpenDeleteModal } =
    dispatch;

  const AddBtnClicked = () => {
    setCurrentMode("add");
    setOpenDeleteModal(false); //close DeleteModal
    setOpenModal(true); //open AddModal
  };

  const onEdit = (task: Task) => {
    setSelectedTask(task);
    setCurrentMode("edit");
    setOpenDeleteModal(false); //close DeleteModal
    setOpenModal(true); //open EditModal
  };
  const onDelete = (id: number) => {
    setSelectedTaskId(id);
    setOpenModal(false); //close AddOrEditModal
    setOpenDeleteModal(true); //open DeleteModal
  };
  const deleteFunc = () => {
    setTasks((prev) => prev?.filter((item) => item.id !== selectedTaskId));
    setOpenDeleteModal(false); //close DeleteModal
  };
  const addOrEditFunc = (task: Task) => {
    //it's addMode:
    if (currentMode === "add") {
      setTasks([...tasks, task]);
    }
    //it's editMode:
    else if (currentMode === "edit") {
      const editedTasks = tasks!.map((tsk) =>
        tsk.id === task.id ? task : tsk
      );
      setTasks(editedTasks);
    }
    setCurrentMode("none");
  };

  const onStatus = (id: number) => {
    const statusChengedTasks = tasks?.map((tsk) => {
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
  const getAllTasks = () => {
    try {
      setTasks(JSON.parse(localStorage.tasksInfo));
    } catch (e) {
      return [];
    }
  };
  useEffect(() => {
    getAllTasks();
  }, []);

  useEffect(() => {
    localStorage.tasksInfo = JSON.stringify(tasks);
  }, [tasks]);

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
        {tasks?.map((tsk) => (
          <TaskCard
            task={tsk}
            key={tsk.id}
            onEdit={() => onEdit(tsk)}
            onDelete={() => onDelete(tsk.id)}
            onStatus={() => onStatus(tsk.id)}
          />
        ))}
      </div>

      <DeleteModal deleteFunc={deleteFunc} />
      <AddOrEditModal
        addOrEditFunc={addOrEditFunc}
        selectedTask={selectedTask}
      />
    </TaskContainer>
  );
};
