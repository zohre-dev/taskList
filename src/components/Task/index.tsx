import { FC } from "react";
import { TaskCard } from "./TaskCard";
import Image from "next/image";
import { TakkContainer } from "./style";
import { Button } from "../Button";

export const Task: FC = () => {
  return (
    <TakkContainer>
      <div className="flex justify-between items-center">
        <h2>Task List</h2>
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
        <TaskCard />
        <TaskCard />
      </div>
    </TakkContainer>
  );
};
