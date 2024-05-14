// import { TaskStatus } from "./taskStatus";

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
export interface Task {
  id?: number;
  title: string;
  priority: TaskPriority; //"high" | "medium" | "low"
  status?: TaskStatus; //To Do  , In Progress  , Done
}
