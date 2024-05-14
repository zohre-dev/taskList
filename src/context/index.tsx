"use client";

import {
  Task,
  TaskPriotity,
  TaskStatus,
} from "@/components/TaskList/models/task";
import { taskRecords } from "@/components/data/taskInfos";
import {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
/************************************************************************************ */
interface IContext {
  values: {
    open: boolean;
    width: number;
    closable: boolean;
    selectedTask: Task;
    editMode: boolean;
    tasks: Task[];
  };
  dispatch: {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    setEditMode: Dispatch<SetStateAction<boolean>>;
    setSelectedTask: Dispatch<SetStateAction<Task>>;
    setTasks: Dispatch<SetStateAction<Task[]>>;
  };
  func: {
    onClose: () => void;
    addOrEditTask: (task: Task) => void;
  };
}
/************************************************************************************* */
//initial values:
const AppContext = createContext<IContext>({
  values: {
    closable: true,
    open: false,
    width: 30,
    selectedTask: {
      id: 0,
      title: "",
      priority: TaskPriotity.Low,
      status: TaskStatus.TODO,
    },
    editMode: false,
    tasks: taskRecords,
  },
  dispatch: {
    setOpenModal: () => {},
    setEditMode: () => {},
    setTasks: () => {},
    setSelectedTask: () => {},
  },
  func: {
    onClose: () => {},
    addOrEditTask: (task: Task) => {},
  },
});

/**************************************************************************************** */
export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>(taskRecords);
  const [editMode, setEditMode] = useState<boolean>(false);
  // const [selectedTask, setSelectedTask] = useState<{}>({});
  const [selectedTask, setSelectedTask] = useState<Task>({
    title: "",
    priority: TaskPriotity.Low,
    status: TaskStatus.TODO,
  });
  const closeFunc = () => {
    setOpenModal(false);
  };
  const addOrEditFunc = (task: Task) => {
    //it is addMode:
    if (!editMode) setTasks((prevTasks) => [...prevTasks, task]);
    //it is editMode:
    else {
      const editedTasks = tasks.map((tsk) =>
        tsk.id === selectedTask.id ? task : tsk
      );
      setTasks(editedTasks);
    }
  };

  const contextValues: IContext = {
    values: {
      closable: true,
      open: openModal,
      width: 30,
      selectedTask: selectedTask,
      editMode: editMode,
      tasks: tasks,
    },
    dispatch: {
      setOpenModal,
      setTasks,
      setEditMode,
      setSelectedTask,
    },
    func: {
      onClose: closeFunc,
      addOrEditTask: addOrEditFunc,
    },
  };

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};
/************************************************************************************************** */
export const useAppContext = () => {
  return useContext(AppContext);
};
