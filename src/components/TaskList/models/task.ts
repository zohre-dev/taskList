import { TaskStatus } from "./taskStatus";

export interface Task {
  id?: number;
  title: string;
  priority: "high" | "medium" | "low";
  status?: TaskStatus; //To Do  , In Progress  , Done
}
