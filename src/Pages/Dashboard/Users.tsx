import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Option } = Select;

interface UserData {
  key: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  joinDate: string;
  lastLogin: string;
}

interface UserFormValues {
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
}

const dummyData: UserData[] = [
  {
    key: "1",
    userId: "USR001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+123456789",
    role: "Barber",
    status: "Active",
    joinDate: "2023-05-10",
    lastLogin: "2024-12-18 10:30 AM",
  },
  {
    key: "2",
    userId: "USR002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+987654321",
    role: "Manager",
    status: "Active",
    joinDate: "2023-03-15",
    lastLogin: "2024-12-17 02:45 PM",
  },
  // Additional dummy data...
];

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>(dummyData);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [form] = Form.useForm<UserFormValues>();

  const columns: ColumnsType<UserData> = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
    },
    {
      title: "Last Login",
      dataIndex: "lastLogin",
      key: "lastLogin",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            status === "Active"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: UserData) => (
        <div className="flex gap-2">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleEdit = (user: UserData): void => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleDelete = (key: string): void => {
    setUsers(users.filter((user) => user.key !== key));
  };

  const handleAdd = (): void => {
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = async (): Promise<void> => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        // Update existing user
        setUsers(
          users.map((user) =>
            user.key === editingUser.key ? { ...user, ...values } : user
          )
        );
      } else {
        // Add new user
        const newUser: UserData = {
          key: Date.now().toString(),
          userId: `USR${String(users.length + 1).padStart(3, "0")}`,
          joinDate: new Date().toISOString().split("T")[0],
          lastLogin: "Never",
          ...values,
        };
        setUsers([...users, newUser]);
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleModalCancel = (): void => {
    setIsModalVisible(false);
    form.resetFields();
  };



  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Users Management</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          Add User
        </Button>
      </div>
      
      <Table
        columns={columns}
        dataSource={users}
        rowKey="key"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingUser ? "Edit User" : "Add New User"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={editingUser ? "Update" : "Add"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter valid email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: "Please enter phone" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select role" }]}
          >
            <Select>
              <Option value="Admin">Admin</Option>
              <Option value="Manager">Manager</Option>
              <Option value="Barber">Barber</Option>
              <Option value="Receptionist">Receptionist</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
