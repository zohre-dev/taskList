// import { TaskStatus } from "./taskStatus";

import exp from "constants";

export enum TaskStatus {
  TODO = "To Do",
  IN_PROGRESS = "In Progress",
  DONE = "Done",
}

export enum TaskPriority {
  High = "high",
  Medium = "medium",
  Low = "low",
}
export type TaskPriorityType = "high" | "medium" | "low";
export interface Task {
  id: number;
  title: string;
  priority: TaskPriorityType; //"high" | "medium" | "low"
  status?: TaskStatus; //To Do  , In Progress  , Done
}
