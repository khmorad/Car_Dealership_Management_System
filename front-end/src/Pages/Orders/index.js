import { Avatar, Button, Form, Input, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";

function Orders() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm(); // Ant Design Form hook


  useEffect(() => {
    fetch('http://127.0.0.1:5000/transactions') 
      .then(response => response.json())
      .then(data => {
        setTransactions(data);
      })
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  const isEditing = (record) => record.Transaction_ID === editingKey;

  const edit = (record) => {
    setEditingKey(record.Transaction_ID);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields(); // Validate form fields
      const newData = [...transactions];
      const index = newData.findIndex((item) => key === item.Transaction_ID);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setTransactions(newData);
        setEditingKey('');
      }
    } catch (errorInfo) {
      console.log('Validate Failed:', errorInfo);
    }
  };
  const handleSaveAll = () => {
    // Loop through all edited rows and save changes
    transactions.forEach((record) => {
      if (isEditing(record)) {
        save(record.Transaction_ID);
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
            <Button type="danger">Delete</Button>
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
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: (props) => <EditableCell {...props} form={form} />,
            },
          }}
          columns={mergedColumns}
          dataSource={transactions}
          loading={loading}
          rowKey="Transaction_ID"
        />
      </Form>
      {editingKey !== '' && (
        <Button type="primary" onClick={handleSaveAll}>Save All</Button>
      )}
    </Space>
  );
}
const EditableCell = ({ editing, dataIndex, title, form, record, index, children, ...restProps }) => {
  const inputNode = <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Please Input ${title}!` }]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default Orders;
