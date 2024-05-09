import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Input, message, Typography } from "antd";

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/transactions");
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleEdit = (record) => {
    setEditingKey(record.Transaction_ID);
  };

  const handleSave = async (record) => {
    try {
      const updatedTransaction = { ...record };
      const response = await fetch(
        `http://127.0.0.1:5000/transactions/${record.Transaction_ID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTransaction),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update transaction");
      }

      message.success("Transaction updated successfully.");
      setEditingKey("");
      fetchTransactions(); // Fetch updated transactions after saving
    } catch (error) {
      console.error("Error updating transaction:", error);
      message.error("Failed to update transaction.");
    }
  };

  const handleDelete = async (record) => {
    try {
      await fetch(`http://127.0.0.1:5000/transactions/${record.Transaction_ID}`, {
        method: "DELETE",
      });
      setTransactions(transactions.filter((item) => item.Transaction_ID !== record.Transaction_ID));
      message.success("Transaction deleted successfully.");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      message.error("Failed to delete transaction.");
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
      const response = await fetch("http://127.0.0.1:5000/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Failed to add transaction");
      }
      message.success("Transaction added successfully.");
      setAddModalVisible(false);
      fetchTransactions(); // Fetch updated transactions after adding
    } catch (error) {
      console.error("Error adding transaction:", error);
      message.error("Failed to add transaction.");
    }
  };

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "Transaction_ID",
    },
    {
      title: "VIN",
      dataIndex: "VIN",
      editable: true,
      render: (text, record) => renderCell(record, "VIN", text),
    },
    {
      title: "Date",
      dataIndex: "Date",
      editable: true,
      render: (text, record) => renderCell(record, "Date", text),
    },
    {
      title: "Price",
      dataIndex: "Price",
      editable: true,
      render: (text, record) => renderCell(record, "Price", text),
    },
    {
      title: "Employee ID",
      dataIndex: "Employee_ID",
      editable: true,
      render: (text, record) => renderCell(record, "Employee_ID", text),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => {
        const editable = record.Transaction_ID === editingKey;
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
    // Update the transactions state to reflect the changes
    setTransactions(
      transactions.map((item) =>
        item.Transaction_ID === record.Transaction_ID ? updatedRecord : item
      )
    );
  };

  const renderCell = (record, dataIndex, text) => {
    const editable = record.Transaction_ID === editingKey && dataIndex !== "Date";
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
      <Typography.Text>Transaction Table</Typography.Text>
      <Button
        type="primary"
        onClick={handleAdd}
        style={{ marginBottom: "16px" }}
      >
        Add Transaction
      </Button>
      <Table columns={columns} dataSource={transactions} pagination={{ pageSize: 100 }} />
      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onOk={() => {
          handleDelete(deleteRecord);
          setDeleteModalVisible(false);
        }}
        onCancel={handleDeleteCancel}
      >
        <p>Are you sure you want to delete this transaction?</p>
      </Modal>
      <Modal
        title="Add Transaction"
        visible={addModalVisible}
        onCancel={handleAddCancel}
        footer={null}
      >
        <AddTransactionForm onSubmit={handleAddSubmit} />
      </Modal>
    </>
  );
};

const AddTransactionForm = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">

      <Form.Item
        name="VIN"
        label="VIN"
        rules={[{ required: true, message: "Please input the VIN!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="Date"
        label="Date"
        rules={[{ required: true, message: "Please input the Date!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="Price"
        label="Price"
        rules={[{ required: true, message: "Please input the Price!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="Employee_ID"
        label="Employee ID"
        rules={[{ required: true, message: "Please input the Employee ID!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Transaction
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TransactionTable;
