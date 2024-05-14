import { Task, TaskPriority, TaskStatus } from "../TaskList/models/task";

export const taskRecords: Task[] = [
  {
    id: 1,
    title: "Go to gym",
    priority: TaskPriority.Low,
    status: TaskStatus.TODO,
    // progress: TaskProgress.TODO,
  },
  {
    id: 2,
    title: "Read a book",
    priority: TaskPriority.Medium,
    status: TaskStatus.DONE,
    // progress: TaskProgress.DONE,
  },
];
