import { Button, Modal } from "antd";
import { deleteTask } from "../api/mockApi";
import { toast } from "react-toastify";
import type { TaskDeleteProps } from "./types";

export default function UserDelete({
  setIsDelete,
  deleteId,
  isDelete,
  setFilteredTasks,
  setTasks,
}: TaskDeleteProps) {
  // Handle delete
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDelete = async (deleteId: any) => {
    try {
      await deleteTask(deleteId);
      setTasks((prev) => prev.filter((task) => task.id !== deleteId));
      setFilteredTasks?.((prev) => prev.filter((task) => task.id !== deleteId));
      toast.success("Task deleted successfully!");
      setIsDelete(false);
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task.");
    }
  };

  return (
    <Modal visible={isDelete} footer={null} onCancel={() => setIsDelete(false)}>
      <h3 className="font-semibold text-xl mb-6">Delete confirmation</h3>
      <p className="md:text-lg">Are you sure, want to delete this user?</p>
      <div className="flex gap-4 justify-end mt-8">
        <Button onClick={() => setIsDelete(false)}>Cancel</Button>
        <Button
          className="bg-[#3982C6] text-white"
          onClick={() => handleDelete(deleteId)}
          type="primary"
        >
          Yes
        </Button>
      </div>
    </Modal>
  );
}
