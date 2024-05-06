import { Avatar, Button, Form, Input, Rate, Space, Table, Typography, message } from "antd";
import { useEffect, useState } from "react";

function Orders() {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('http://127.0.0.1:5000/transactions') 
      .then(response => response.json())
      .then(data => {
        setTransactions(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
        setLoading(false);
        message.error('Failed to fetch transactions.');
      });
  }, []);

  const isEditing = (record) => record.Transaction_ID === editingKey;

  const edit = (record) => {
    setEditingKey(record.Transaction_ID);
  };
  
  const cancel = () => {
    setEditingKey('');
  };

  const save = async (record) => {
    try {
      const newData = [...transactions];
      const index = newData.findIndex((item) => record.Transaction_ID === item.Transaction_ID);

      if (index > -1) {
        const updatedRecord = { ...newData[index], ...record };
        newData.splice(index, 1, updatedRecord);
        setTransactions(newData);
        setEditingKey('');
        // Send request to update the transaction on the server
        await fetch(`http://127.0.0.1:5000/transactions/${record.Transaction_ID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedRecord),
        });
        message.success('Transaction updated successfully.');
      }
    } catch (errorInfo) {
      console.log('Validate Failed:', errorInfo);
      message.error('Failed to update transaction.');
    }
  };
  const deleteTransaction = async (record) => {
    try {
      console.log("transaction id delete:", record.Transaction_ID)
      const response = await fetch(`http://127.0.0.1:5000/transactions/${record.Transaction_ID}`, {
        method: 'DELETE', // Change method to POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'delete' }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete transaction on the server.');
      }
      // Remove the deleted transaction from the local state
      setTransactions(transactions.filter(item => item.Transaction_ID !== record.Transaction_ID));
      message.success('Transaction deleted successfully.');
    } catch (error) {
      console.error('Error deleting transaction on the server:', error);
      message.error('Failed to delete transaction.');
    }
  };
  
  const handleSaveAll = () => {
    // Loop through all edited rows and save changes
    transactions.forEach((record) => {
      if (isEditing(record)) {
        save(record);
      }
    });
  };

  const columns = [
    {
      title: 'Transaction ID',
      dataIndex: 'Transaction_ID',
      key: 'Transaction_ID',
    },
    {
      title: 'Part ID',
      dataIndex: 'Part_ID',
      key: 'Part_ID',
    },
    {
      title: 'VIN',
      dataIndex: 'VIN',
      key: 'VIN',
    },
    {
      title: 'Date',
      dataIndex: 'Date',
      key: 'Date',
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      key: 'Price',
    },
    {
      title: 'Employee ID',
      dataIndex: 'Employee_ID',
      key: 'Employee_ID',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space size="middle">
            <Button type="primary" onClick={() => save(record)}>Save</Button>
            <Button onClick={cancel}>Cancel</Button>
          </Space>
        ) : (
          <Space size="middle">
            <Button type="primary" disabled={editingKey !== ''} onClick={() => edit(record)}>Edit</Button>
            <Button type="danger" onClick={() => deleteTransaction(record)}>Delete</Button> {/* Modify this line */}
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => ({
    ...col,
    onCell: (record) => ({
      record,
      dataIndex: col.dataIndex,
      title: col.title,
      editing: isEditing(record),
    }),
  }));

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Orders</Typography.Title>
      <Table
        columns={mergedColumns}
        dataSource={transactions}
        loading={loading}
        rowKey="Transaction_ID"
      />
      {editingKey !== '' && (
        <Button type="primary" onClick={handleSaveAll}>Save All</Button>
      )}
    </Space>
  );
}

export default Orders;
