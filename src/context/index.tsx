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
    open: boolean;
    width: number;
    closable: boolean;
    editMode: boolean; //false ==> its addMode   , true ==> its editMode
    deleteMode: boolean;
    tasks: Task[];
    confirmDeletion: boolean;
  };
  dispatch: {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    setEditMode: Dispatch<SetStateAction<boolean>>;
    setDeleteMode: Dispatch<SetStateAction<boolean>>;
    setConfirmDeletion: Dispatch<SetStateAction<boolean>>;
    setTasks: Dispatch<SetStateAction<Task[]>>;
  };
  func: {
    onClose: () => void;
  };
}
/************************************************************************************* */
//initial values:
const AppContext = createContext<IContext>({
  values: {
    closable: true,
    open: false,
    width: 30,
    editMode: false,
    deleteMode: false,
    tasks: taskRecords,
    confirmDeletion: false,
  },
  dispatch: {
    setOpenModal: () => {},
    setEditMode: () => {},
    setDeleteMode: () => {},
    setTasks: () => {},
    setConfirmDeletion: () => {},
  },
  func: {
    onClose: () => {},
  },
});

/**************************************************************************************** */
export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>(taskRecords);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [confirmDeletion, setConfirmDeletion] = useState<boolean>(false);

  const closeFunc = () => {
    setOpenModal(false);
  };

  const contextValues: IContext = {
    values: {
      closable: true,
      open: openModal,
      width: 30,
      editMode: editMode,
      deleteMode: deleteMode,
      confirmDeletion,
      tasks: tasks,
    },
    dispatch: {
      setOpenModal,
      setTasks,
      setEditMode,
      setDeleteMode,
      setConfirmDeletion,
    },
    func: {
      onClose: closeFunc,
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
