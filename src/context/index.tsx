"use client";

import { Task } from "@/components/TaskList/models/task";
import {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
/************************************************************************************ */
type currentModeType = "add" | "edit" | "none";
interface IContext {
  values: {
    openModal: boolean;
    openDeleteModal: boolean;
    width: number;
    closable: boolean;
    currentMode: currentModeType; //"add" | "edit" | "none"
    tasks: Task[] | [];
  };
  dispatch: {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    setOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
    setCurrentMode: Dispatch<SetStateAction<currentModeType>>;
    setTasks: Dispatch<SetStateAction<Task[] | []>>;
  };
  func: {
    onCloseMoadl: () => void;
    onCloseDeleteModal: () => void;
  };
}
/************************************************************************************* */
//initial values:
const AppContext = createContext<IContext>({
  values: {
    closable: true,
    openModal: false,
    openDeleteModal: false,
    width: 30,
    currentMode: "none",
    tasks: [],
  },
  dispatch: {
    setOpenModal: () => {},
    setOpenDeleteModal: () => {},
    setCurrentMode: () => {},
    setTasks: () => {},
  },
  func: {
    onCloseMoadl: () => {},
    onCloseDeleteModal: () => {},
  },
});

/**************************************************************************************** */
export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[] | []>([]);
  const [currentMode, setCurrentMode] = useState<currentModeType>("none");

  const closeModalFunc = () => {
    setOpenModal(false);
  };

  const closeDeleteModalFunc = () => {
    setOpenDeleteModal(false);
  };
  const contextValues: IContext = {
    values: {
      closable: true,
      openModal: openModal,
      openDeleteModal: openDeleteModal,
      width: 30,
      currentMode: currentMode,
      tasks: tasks,
    },
    dispatch: {
      setOpenModal,
      setOpenDeleteModal,
      setTasks,
      setCurrentMode,
    },
    func: {
      onCloseMoadl: closeModalFunc,
      onCloseDeleteModal: closeDeleteModalFunc,
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
