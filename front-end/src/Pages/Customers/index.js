import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Input, message, Typography, DatePicker } from "antd";

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/customer");
      if (!response.ok) {
        throw new Error("Failed to fetch customers");
      }
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleEdit = (record) => {
    setEditingKey(record.Customer_ID);
  };

  const handleSave = async (record) => {
    try {
      const updatedCustomer = { ...record };
      const response = await fetch(
        `http://127.0.0.1:5000/customer/${record.Customer_ID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCustomer),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update customer");
      }

      message.success("Customer updated successfully.");
      setEditingKey("");
      fetchCustomers(); 
    } catch (error) {
      console.error("Error updating customer:", error);
      message.error("Failed to update customer.");
    }
  };

  const handleDelete = async (record) => {
    try {
      await fetch(`http://127.0.0.1:5000/customer/${record.Customer_ID}`, {
        method: "DELETE",
      });
      setCustomers(customers.filter((item) => item.Customer_ID !== record.Customer_ID));
      message.success("Customer deleted successfully.");
    } catch (error) {
      console.error("Error deleting customer:", error);
      message.error("Failed to delete customer.");
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
      const response = await fetch("http://127.0.0.1:5000/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Failed to add customer");
      }
      message.success("Customer added successfully.");
      setAddModalVisible(false);
      fetchCustomers(); 
    } catch (error) {
      console.error("Error adding customer:", error);
      message.error("Failed to add customer.");
    }
  };

  const columns = [
    {
      title: "Customer ID",
      dataIndex: "Customer_ID",
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
      title: "Address",
      dataIndex: "Address",
      editable: true,
      render: (text, record) => renderCell(record, "Address", text),
    },
    {
      title: "Phone Number",
      dataIndex: "PhoneNumber",
      editable: true,
      render: (text, record) => renderCell(record, "PhoneNumber", text),
    },
    {
      title: "Email",
      dataIndex: "Email",
      editable: true,
      render: (text, record) => renderCell(record, "Email", text),
    },
    {
      title: "Employee ID",
      dataIndex: "Employee_ID",
      editable: true,
      render: (text, record) => renderCell(record, "Employee_ID", text),
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
        const editable = record.Customer_ID === editingKey;
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
 
    setCustomers(
      customers.map((item) =>
        item.Customer_ID === record.Customer_ID ? updatedRecord : item
      )
    );
  };

  const renderCell = (record, dataIndex, text) => {
    const editable = record.Customer_ID === editingKey && dataIndex !== "DOB";
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
    <div>
      <Typography.Text>Customer Table</Typography.Text>
      </div>
      <Button
        type="primary"
        onClick={handleAdd}
        style={{ marginBottom: "16px" }}
      >
        Add Customer
      </Button>
      <Table columns={columns} dataSource={customers} pagination={{ pageSize: 100 }} />
      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onOk={() => {
          handleDelete(deleteRecord);
          setDeleteModalVisible(false);
        }}
        onCancel={handleDeleteCancel}
      >
        <p>Are you sure you want to delete this customer?</p>
      </Modal>
      <Modal
        title="Add Customer"
        visible={addModalVisible}
        onCancel={handleAddCancel}
        footer={null}
      >
        <AddCustomerForm onSubmit={handleAddSubmit} />
      </Modal>
    </>
  );
};

const AddCustomerForm = ({ onSubmit }) => {
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
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item
        name="Address"
        label="Address"
        rules={[{ required: true, message: "Please input the address!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="PhoneNumber"
        label="Phone Number"
        rules={[{ required: true, message: "Please input the phone number!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="Email"
        label="Email"
        rules={[{ required: true, message: "Please input the email!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="Employee_ID"
        label="Employee ID"
        rules={[{ required: true, message: "Please input the employee ID!" }]}
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
          Add Customer
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomerTable;
