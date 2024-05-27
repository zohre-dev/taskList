"use client";
import React, { FC, useEffect, useState } from "react";
import { TaskCard } from "./TaskCard";
import Image from "next/image";
import { TaskContainer } from "./style";
import { Button } from "../Button";
import { Task, TaskPriority, TaskStatus } from "./models/task";
import { useAppContext } from "@/context";
import { AddOrEditModal } from "../Modal/AddOrEditModal";
import { DeleteModal } from "../Modal/DeleteModal";
import { Fahkwang } from "next/font/google";

export const TaskList: FC = () => {
  const [selectedTaskId, setSelectedTaskId] = useState<number>(0);
  const [selectedTask, setSelectedTask] = useState<Task>();
  //context destructure:
  const { values, dispatch, func } = useAppContext();
  const { tasks, editMode } = values;
  const { setOpenModal, setEditMode, setTasks, setOpenDeleteModal } = dispatch;

  const AddBtnClicked = () => {
    setEditMode(false);
    setOpenDeleteModal(false); //close DeleteModal
    setOpenModal(true); //open AddModal
  };

  const onEdit = (task: Task) => {
    setSelectedTask(task);
    setEditMode(true);
    setOpenDeleteModal(false); //close DeleteModal
    setOpenModal(true); //open EditModal
  };
  const onDelete = (id: number) => {
    setSelectedTaskId(id);
    setOpenModal(false); //close AddOrEditModal
    setOpenDeleteModal(true); //open DeleteModal
  };
  const deleteFunc = () => {
    setTasks((prev) => prev.filter((item) => item.id !== selectedTaskId));
    setOpenDeleteModal(false); //close DeleteModal
  };
  const addOrEditFunc = (task: Task) => {
    //it's addMode:
    if (!editMode) {
      setTasks([...tasks, task]);
      setEditMode(true);
    }
    //it's editMode:
    else {
      const editedTasks = tasks.map((tsk) => (tsk.id === task.id ? task : tsk));
      setTasks(editedTasks);
    }
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

      <DeleteModal deleteFunc={deleteFunc} />
      <AddOrEditModal
        addOrEditFunc={addOrEditFunc}
        selectedTask={selectedTask}
      />
    </TaskContainer>
  );
};
