"use client";

import { Task } from "@/components/TaskList/models/task";
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
    openModal: boolean;
    openDeleteModal: boolean;
    width: number;
    closable: boolean;
    editMode: boolean; //false ==> its addMode   , true ==> its editMode
    tasks: Task[];
  };
  dispatch: {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    setOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
    setEditMode: Dispatch<SetStateAction<boolean>>;
    setTasks: Dispatch<SetStateAction<Task[]>>;
  };
  func: {
    onCloseMoadl: () => void;
    onCloseDeleteMoadl: () => void;
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
    editMode: false,
    tasks: taskRecords,
  },
  dispatch: {
    setOpenModal: () => {},
    setOpenDeleteModal: () => {},
    setEditMode: () => {},
    setTasks: () => {},
  },
  func: {
    onCloseMoadl: () => {},
    onCloseDeleteMoadl: () => {},
  },
});

/**************************************************************************************** */
export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>(taskRecords);
  const [editMode, setEditMode] = useState<boolean>(false);

  const closeModalFunc = () => {
    setOpenModal(false);
  };

  const cloaseDeleteModalFunc = () => {
    setOpenDeleteModal(false);
  };
  const contextValues: IContext = {
    values: {
      closable: true,
      openModal: openModal,
      openDeleteModal: openDeleteModal,
      width: 30,
      editMode: editMode,
      tasks: tasks,
    },
    dispatch: {
      setOpenModal,
      setOpenDeleteModal,
      setTasks,
      setEditMode,
    },
    func: {
      onCloseMoadl: closeModalFunc,
      onCloseDeleteMoadl: cloaseDeleteModalFunc,
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
