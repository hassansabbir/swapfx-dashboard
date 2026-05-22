import { useState } from "react";
import { Table, Button, Modal, Form, Input, Space, ConfigProvider } from "antd";
import { PlusOutlined, EyeOutlined, LockOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  companyName: string;
  designation: string;
}

const Vendors = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Dummy data for staff
  const staffList = {
    data: {
      data: [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          companyName: "TechCorp",
          designation: "manager",
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          companyName: "InnovateInc",
          designation: "developer",
        },
        {
          id: "3",
          name: "Sam Wilson",
          email: "sam@example.com",
          companyName: "RentMe",
          designation: "sales-executive",
        },
      ],
    },
  };

  const filteredData = staffList?.data?.data?.filter((staff: StaffMember) =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
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
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: StaffMember) => (
        <Space>
          <Link to={`/staff/profile/${record.id}`}>
            <EyeOutlined className="cursor-pointer" />
          </Link>

          <LockOutlined className="cursor-pointer text-red-600" />
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold my-5">Staff List</h1>
        <div className="flex items-center gap-5">
          <Input
            placeholder="Search"
            style={{ width: 400, height: 50, borderRadius: 30 }}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            value={searchTerm}
            prefix={<SearchOutlined className="text-primary" />}
          />
          <Button
            onClick={showModal}
            className="bg-primary border-none text-white py-6 rounded-3xl px-6"
          >
            <PlusOutlined /> Add Staff
          </Button>
        </div>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#D2EBC5",
              headerColor: "black",
              colorBgContainer: "white",
              colorText: "black",
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            pageSize: pageSize,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
            onChange: (_, size) => setPageSize(size || 10),
          }}
          rowKey={(record) => record.id}
          scroll={{ x: 1000 }}
        />
      </ConfigProvider>

      <Modal
        title="Add Staff"
        open={isModalOpen}
        onOk={handleOk}
        okButtonProps={{
          className: "bg-primary border-none text-white py-6 rounded-3xl px-6",
        }}
        cancelButtonProps={{
          className: "border border-primary text-primary py-6 rounded-3xl px-6",
        }}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item
            label="User Name"
            name="username"
            rules={[{ required: true, message: "Please enter user name" }]}
          >
            <Input placeholder="Enter user name" />
          </Form.Item>
          <Form.Item
            label="Designation"
            name="designation"
            rules={[{ required: true, message: "Please enter designation" }]}
          >
            <Input placeholder="Enter designation" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input type="email" placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input type="password" placeholder="Enter password" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Vendors;
