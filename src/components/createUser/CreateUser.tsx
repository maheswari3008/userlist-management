import { useEffect } from "react";
import { Modal, Input, Button } from "antd";
import { Controller, FormProvider } from "react-hook-form";
import { addTask, updateTask } from "../../api/mockApi";
import { toast } from "react-toastify";
import type { TaskFormProps, UserFormValues } from "../types";

export default function CreateUser({
  currentTask,
  form,
  mode,
  setFilteredTasks,
  setIsModalVisible,
  setTasks,
  isModalVisible,
}: TaskFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (isModalVisible) {
      if (mode === "edit" && currentTask) {
        reset(currentTask);
        console.log("currentTask :", currentTask);
      } else {
        reset({ firstName: "", lastName: "", email: "", imageLink: "" });
      }
    }
  }, [mode, currentTask, isModalVisible, reset]);

  const onSubmit = async (values: UserFormValues) => {
    try {
      if (mode === "edit" && currentTask) {
        const updated = await updateTask({
          id: Number(currentTask.id),
          updatedTask: values,
        });
        setTasks((prev) =>
          prev.map((task) =>
            task.id === currentTask.id ? { ...task, ...updated } : task
          )
        );
        setFilteredTasks?.((prev) =>
          prev.map((task) =>
            task.id === currentTask.id ? { ...task, ...updated } : task
          )
        );
        toast.success("User updated!");
      } else {
        const newTask = await addTask(values);
        setTasks((prev) => [...prev, newTask]);
        setFilteredTasks?.((prev) => [...prev, newTask]);
        toast.success("User created!");
      }

      setIsModalVisible(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("error :", error);
      toast.error("Failed to submit form.");
    }
  };

  return (
    <Modal
      title={mode === "edit" ? "Edit User" : "Create User"}
      open={isModalVisible}
      footer={null}
      onCancel={() => setIsModalVisible(false)}
    >
      <FormProvider {...form}>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="First Name" />
              )}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Last Name" />
              )}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Email" />}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Controller
              name="imageLink"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Image URL" />
              )}
            />
            {errors.imageLink && (
              <p className="text-red-500 text-sm mt-1">
                {errors.imageLink.message}
              </p>
            )}
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outlined" onClick={() => setIsModalVisible(false)}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}
