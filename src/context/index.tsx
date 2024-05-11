"use client";

import {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface IContext {
  values: {
    open: boolean;
    width: number;
    closable: boolean;
  };
  dispatch: {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
  };
  func: {
    onClose: () => void;
  };
}

//initial values:
const AppContext = createContext({
  values: {
    closable: true,
    open: false,
    width: 30,
  },
  dispatch: {
    setOpenModal: (isOpen: boolean) => {},
  },
  func: {
    onClose: () => {},
  },
});
export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const closeFunc = () => {
    setOpenModal(false);
  };
  const contextValues: IContext = {
    values: {
      closable: true,
      open: openModal,
      width: 30,
    },
    dispatch: {
      setOpenModal,
    },
    func: {
      onClose: closeFunc,
    },
  };

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
