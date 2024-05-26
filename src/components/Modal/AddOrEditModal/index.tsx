import { Button } from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import { ChangeEvent, FC, MouseEventHandler, useEffect, useState } from "react";
import Modal from "..";
import { useAppContext } from "@/context";
import { theme } from "@/app/styles/theme";
import {
  Task,
  TaskPriority,
  TaskPriorityType,
  TaskStatus,
} from "@/components/TaskList/models/task";

interface IAddOrEditProps {
  addOrEditFunc: (task: Task) => void;
  selectedTask: Task | undefined;
}
interface IErrors {
  [errorTitle: string]: string;
}
const defaultValue = {
  id: 0,
  title: "",
  priority: TaskPriority.Low,
  status: TaskStatus.TODO,
};

export const AddOrEditModal: FC<IAddOrEditProps> = ({
  addOrEditFunc,
  selectedTask,
}) => {
  const [lastId, setLastId] = useState<number>(0);
  const [temporaryTask, setTemporaryTask] = useState<Task>(defaultValue);
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [errors, setErrors] = useState<IErrors>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  //context destructure:
  const { values, func } = useAppContext();
  const { tasks, editMode } = values;
  const { onCloseMoadl } = func;

  const handleOnClose = () => {
    onCloseMoadl();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.trim().length > 0) setIsDisable(false);
    else {
      setIsDisable(true);
      setErrors({});
    }
    setTemporaryTask({
      ...temporaryTask,
      id: editMode ? selectedTask!.id : lastId! + 1,
      title: value,
    });
  };

  const validateForm = () => {
    let errorsObj: IErrors = {};
    //min-length
    if (temporaryTask.title.trim().length < 3) {
      errorsObj.minlengthErr = "min length are 3 characters";
    }
    //max-length
    if (temporaryTask.title.trim().length > 20) {
      errorsObj.maxlengthErr = "max length are 20 characters";
    }
    // true if its a number, false if not
    if (!isNaN(+temporaryTask.title.trim())) {
      errorsObj.onlyNumber = "at least one letter is required";
    }
    // console.log("errorsObj ", errorsObj.length);
    setErrors(errorsObj);
    console.log(
      "length of error is zero : ",
      Object.keys(errorsObj).length === 0
    );
    setIsFormValid(Object.keys(errorsObj).length === 0);
  };
  const AddOrEditButtonClicked = () => {
    validateForm();
  };

  const selectPriority = (priority: TaskPriorityType) => {
    setTemporaryTask((prevTasks) => ({ ...prevTasks, priority: priority }));
  };

  //destructure:
  const { title } = temporaryTask;
  const buttonsArr = [
    {
      className: `priorityBtn ${
        temporaryTask.priority === TaskPriority.High && "priorityBtn-selected"
      }`,
      bgcolor: `${theme.error}`,
      title: TaskPriority.High,
      onClick: () => {
        selectPriority(TaskPriority.High);
      },
    },
    {
      className: `priorityBtn ${
        temporaryTask.priority === TaskPriority.Medium && "priorityBtn-selected"
      }`,
      bgcolor: `${theme.warning}`,
      title: TaskPriority.Medium,
      onClick: () => selectPriority(TaskPriority.Medium),
    },
    {
      className: `priorityBtn ${
        temporaryTask.priority === TaskPriority.Low && "priorityBtn-selected"
      }`,
      bgcolor: `${theme.success}`,
      title: TaskPriority.Low,
      onClick: () => selectPriority(TaskPriority.Low),
    },
  ];
  useEffect(() => {
    //it's addMode:
    if (!editMode) {
      const id = tasks[tasks.length - 1].id;
      setLastId(id);
    } else {
      //it's editMode:
      if (selectedTask) {
        setTemporaryTask(selectedTask);
      }
    }
  }, [selectedTask, editMode]);
  /******************************************************* */
  useEffect(() => {
    console.log("i'm in useEffect");
    //if there are no errors:
    if (isFormValid) {
      console.log("form is valid");
      addOrEditFunc(temporaryTask);
      setTemporaryTask(defaultValue);
      onCloseMoadl();
    }
  }, [isFormValid]);
  /******************************************************* */
  return (
    <Modal
      show={values.openModal}
      width={values.width}
      closable={values.closable}
      onClose={func.onCloseMoadl}
    >
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex justify-between ">
          <span>{editMode ? "Edit Task" : "Add Task"}</span>
          <Image
            src="/assets/icons/close.svg"
            width={24}
            height={24}
            alt="close"
            onClick={handleOnClose}
          />
        </div>
        <ul className="errorBox">
          {Object.entries(errors)?.map(([key, value]) => (
            <li key={key} className="text-red-500">
              <span>{value}</span>
            </li>
          ))}
        </ul>
        <Input
          label="Task"
          placeholder="Type your task here..."
          onChange={onChange}
          name="title"
          value={title}
        />
        <div className="flex flex-col gap-2">
          <label>Priority</label>
          <div className="flex  gap-3">
            {buttonsArr.map((item, index) => (
              <Button
                className={item.className}
                bgcolor={item.bgcolor}
                onClick={item.onClick}
                key={index}
              >
                {item.title}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <Button
            bgcolor={`${theme.tertiary}`}
            onClick={AddOrEditButtonClicked}
            isdisabled={isDisable}
          >
            {editMode ? "Edit" : "Add"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
