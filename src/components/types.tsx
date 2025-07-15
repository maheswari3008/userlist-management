import type { ReactNode } from "react";
import type { InferType } from "yup";
import type { userFormSchema } from "./createUser/UserSchema";

export type LoginFormInputs = {
  email: string;
  password: string;
};

export type DashboardLayoutProps = {
  children: ReactNode;
  setIsAuthenticated: (auth: boolean) => void;
};
export type LoginProps = {
  setIsAuthenticated: (auth: boolean) => void;
};

export type Task = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageLink: string;
};

export type TaskDeleteProps = {
  isDelete?: boolean;
  deleteId?: number | undefined;
  setIsDelete: (val: boolean) => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setFilteredTasks?: React.Dispatch<React.SetStateAction<Task[]>>;
};

export type TaskFormProps = {
  currentTask?: Task | null;
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setFilteredTasks?: React.Dispatch<React.SetStateAction<Task[]>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  mode?: string;
};

export type UserCardProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number | undefined) => void;
};

export type UserFormValues = InferType<typeof userFormSchema>;
