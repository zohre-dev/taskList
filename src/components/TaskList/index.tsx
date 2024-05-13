"use client";
import { FC, useEffect, useState } from "react";
import { TaskCard } from "./TaskCard";
import Image from "next/image";
import { TaskContainer } from "./style";
import { Button } from "../Button";
import { Task, TaskPriotity, TaskStatus } from "./models/task";
import { useAppContext } from "@/context";
import { AddOrEditModal } from "../Modal/AddOrEditModal";

export const TaskList: FC = () => {
  //destructure:
  const { values, dispatch, func } = useAppContext();
  const { tasks } = values;
  const { setOpenModal, setEditMode } = dispatch;

  const [newRecordId, setNewRecordId] = useState<number | undefined>(1);

  const AddBtnClicked = () => {
    console.log(tasks);
    const id = tasks[tasks.length - 1].id;
    setNewRecordId(id! + 1);

    setEditMode(false);
    setOpenModal(true);
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

      <AddOrEditModal newRecordId={newRecordId} />
    </TaskContainer>
  );
};
