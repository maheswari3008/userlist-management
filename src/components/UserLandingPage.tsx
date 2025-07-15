import React, { useState, useEffect } from "react";
import { Input, Button, Table } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getTasks } from "../api/mockApi";
import CreateUser from "./createUser/CreateUser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userFormSchema } from "./createUser/UserSchema";
import type { Task } from "./types";
import UserDelete from "./UserDelete";
import UserCard from "./UserCard";
import { AiOutlineTable } from "react-icons/ai";
import { FaList } from "react-icons/fa";

export default function TaskDashboard() {
  const form = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(userFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      imageLink: "",
    },
  });

  const [tasks, setTasks] = useState<Task[]>([]);
  const [tab, setTab] = useState("Tab1");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<number | undefined>(undefined);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [mode, setMode] = useState<"create" | "edit" | undefined>();
  const [searchActive, setSearchActive] = useState(false);

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
        setFilteredTasks(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Handle search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    if (value === "") {
      setFilteredTasks([]);
      setSearchActive(false);
    } else {
      const filtered = tasks.filter((task: Task) =>
        Object.values(task)
          .filter((val) => typeof val === "string" || typeof val === "number")
          .some((val) => val.toString().toLowerCase().includes(value))
      );
      setFilteredTasks(filtered);
      setSearchActive(true);
    }
  };

  // Show modal (create or edit)
  const showModal = (mode: "create" | "edit", task?: Task) => {
    setMode(mode);
    setCurrentTask(task || null);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "Profile",
      dataIndex: "imageLink",
      key: "imageLink",
      render: (url: string) => (
        <img
          src={url}
          alt="Profile"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "actions",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (item: any) => (
        <div className="flex gap-2">
          <Button
            icon={<EditOutlined />}
            onClick={() => showModal("edit", item)}
            variant="outlined"
            color="primary"
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => {
              setDeleteId(item.id);
              setIsDelete(true);
            }}
            variant="outlined"
            color="danger"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="pt-8">
      {/* Tabs */}
      <div className="bg-[#fff] px-4 p-2">
        <div className="hidden sm:block md:text-lg font-semibold">Users</div>
        <div className="flex flex-wrap justify-between items-center">
          <div className="sm:hidden font-semibold pr-2">Users</div>
          <div className="flex items-center border rounded-sm">
            <button
              onClick={() => setTab("Tab1")}
              className={`flex cursor-pointer items-center gap-1 px-2 py-1 text-sm font-medium transition-all
                  ${
                    tab === "Tab1"
                      ? "text-blue-500 border border-blue-500 bg-blue-50"
                      : "text-gray-600 hover:bg-gray-100 border-transparent"
                  }
                `}
            >
              <AiOutlineTable className="text-lg" />
              Table
            </button>
            <button
              onClick={() => setTab("Tab2")}
              className={`flex cursor-pointer items-center gap-1 px-2 py-1  text-sm font-medium transition-all
                  ${
                    tab === "Tab2"
                      ? "text-blue-500 border border-blue-500 bg-blue-50"
                      : "text-gray-600 hover:bg-gray-100 border-transparent"
                  }
                `}
            >
              <FaList className="md:text-lg" />
              Card
            </button>
          </div>

          {/* Search and Add */}
          <div className="flex justify-between gap-2 mt-4 md:mt-0 mb-4 md:w-1/3 sm:ml-auto">
            <Input
              placeholder="Search..."
              onChange={handleInputChange}
              allowClear
              className="w-full lg:w-1/3"
            />
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => showModal("create")}
            >
              Create User
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      {tab === "Tab1" ? (
        <Table
          columns={columns}
          dataSource={searchActive ? filteredTasks : tasks}
          loading={loading}
          rowKey="id"
          className="w-full"
          style={{ backgroundColor: "#ffffff", overflowX: "scroll" }}
          pagination={{
            pageSize: 5,
          }}
        />
      ) : (
        <UserCard
          tasks={searchActive ? filteredTasks : tasks}
          onEdit={(task) => showModal("edit", task)}
          onDelete={(id) => {
            setDeleteId(id);
            setIsDelete(true);
          }}
        />
      )}

      {/* Create/Edit Modal */}
      <CreateUser
        form={form}
        mode={mode}
        currentTask={currentTask}
        setTasks={setTasks}
        setFilteredTasks={setFilteredTasks}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />

      {/* Delete Confirmation */}
      <UserDelete
        isDelete={isDelete}
        deleteId={deleteId}
        setIsDelete={setIsDelete}
        setTasks={setTasks}
        setFilteredTasks={setFilteredTasks}
      />
    </div>
  );
}
