import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Input, message, Typography } from "antd";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/employee");
      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEdit = (record) => {
    setEditingKey(record.Employee_ID);
  };

  const handleSave = async (record) => {
    try {
      const updatedEmployee = { ...record };
      const response = await fetch(
        `http://127.0.0.1:5000/employee/${record.Employee_ID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEmployee),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

      message.success("Employee updated successfully.");
      setEditingKey("");
      fetchEmployees(); // Fetch updated employees after saving
    } catch (error) {
      console.error("Error updating employee:", error);
      message.error("Failed to update employee.");
    }
  };

  const handleDelete = async (record) => {
    try {
      await fetch(`http://127.0.0.1:5000/employee/${record.Employee_ID}`, {
        method: "DELETE",
      });
      setEmployees(employees.filter((item) => item.Employee_ID !== record.Employee_ID));
      message.success("Employee deleted successfully.");
    } catch (error) {
      console.error("Error deleting employee:", error);
      message.error("Failed to delete employee.");
    }
  };

  const handleDeleteConfirm = (record) => {
    setDeleteRecord(record);
    setDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  const handleAdd = () => {
    setAddModalVisible(true);
  };

  const handleAddCancel = () => {
    setAddModalVisible(false);
  };

  const handleAddSubmit = async (values) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Failed to add employee");
      }
      message.success("Employee added successfully.");
      setAddModalVisible(false);
      fetchEmployees(); // Fetch updated employees after adding
    } catch (error) {
      console.error("Error adding employee:", error);
      message.error("Failed to add employee.");
    }
  };

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "Employee_ID",
    },
    {
      title: "Name",
      dataIndex: "Name",
      editable: true,
      render: (text, record) => renderCell(record, "Name", text),
    },
    {
      title: "DOB",
      dataIndex: "DOB",
      editable: true,
      render: (text, record) => renderCell(record, "DOB", text),
    },
    {
      title: "Department",
      dataIndex: "Department",
      editable: true,
      render: (text, record) => renderCell(record, "Department", text),
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      editable: true,
      render: (text, record) => renderCell(record, "JobTitle", text),
    },
    {
      title: "Report To",
      dataIndex: "reportTo",
      editable: true,
      render: (text, record) => renderCell(record, "ReportTo", text),
    },
    {
      title: "Password",
      dataIndex: "Password",
      editable: true,
      render: (text, record) => renderCell(record, "Password", text),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => {
        const editable = record.Employee_ID === editingKey;
        return editable ? (
          <>
            <Button type="primary" onClick={() => handleSave(record)}>
              Save
            </Button>
            <Button type="danger" onClick={() => setEditingKey("")}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button type="primary" onClick={() => handleEdit(record)}>
              Edit
            </Button>
            <Button type="danger" onClick={() => handleDeleteConfirm(record)}>
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const handleFieldChange = (record, dataIndex, value) => {
    const updatedRecord = { ...record, [dataIndex]: value };
    // Update the employees state to reflect the changes
    setEmployees(
      employees.map((item) =>
        item.Employee_ID === record.Employee_ID ? updatedRecord : item
      )
    );
  };

  const renderCell = (record, dataIndex, text) => {
    const editable = record.Employee_ID === editingKey && dataIndex !== "DOB";
    return editable ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        initialValue={text}
        rules={[
          {
            required: true,
            message: `Please Input ${dataIndex}!`,
          },
        ]}
      >
        <Input
          onChange={(e) =>
            handleFieldChange(record, dataIndex, e.target.value)
          }
        />
      </Form.Item>
    ) : (
      text
    );
  };

  return (
    <>
      <Typography.Text>Employee Table</Typography.Text>
      <Button
        type="primary"
        onClick={handleAdd}
        style={{ marginBottom: "16px" }}
      >
        Add Employee
      </Button>
      <Table columns={columns} dataSource={employees} pagination={{ pageSize: 4 }} />
      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onOk={() => {
          handleDelete(deleteRecord);
          setDeleteModalVisible(false);
        }}
        onCancel={handleDeleteCancel}
      >
        <p>Are you sure you want to delete this employee?</p>
      </Modal>
      <Modal
        title="Add Employee"
        visible={addModalVisible}
        onCancel={handleAddCancel}
        footer={null}
      >
        <AddEmployeeForm onSubmit={handleAddSubmit} />
      </Modal>
    </>
  );
};

const AddEmployeeForm = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="Name"
        label="Name"
        rules={[{ required: true, message: "Please input the name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="DOB"
        label="DOB"
        rules={[{ required: true, message: "Please input the DOB!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="Department"
        label="Department"
        rules={[{ required: true, message: "Please input the department!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="JobTitle"
        label="Job Title"
        rules={[{ required: true, message: "Please input the job title!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="ReportTo"
        label="Report To"
        rules={[{ required: true, message: "Please input the report to!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="Password"
        label="Password"
        rules={[{ required: true, message: "Please input the password!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Employee
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmployeeTable;
