import { Button, Form, Input, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";

function Inventory() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [cars, setCars] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm(); // Ant Design Form hook

  useEffect(() => {
    fetch('http://127.0.0.1:5000/cars/all') 
      .then(response => response.json())
      .then(data => {
        setCars(data);
      })
      .catch(error => console.error('Error fetching cars:', error));
  }, []);

  const isEditing = (record) => record.VIN === editingKey;

  const edit = (record) => {
    setEditingKey(record.VIN);
    form.setFieldsValue({ ...record }); // Set form values for the editing row
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields(); // Validate form fields
      // Perform save operation here, for example, update the car record in the database
      console.log("Update car with VIN:", key, "and data:", row);
      setEditingKey('');
    } catch (errorInfo) {
      console.log('Validate Failed:', errorInfo);
    }
  };

  const handleSaveAll = () => {
    // Loop through all edited rows and save changes
    dataSource.forEach((record) => {
      if (isEditing(record)) {
        save(record.VIN);
      }
    });
  };

  const columns = [
    {
      title: 'VIN',
      dataIndex: 'VIN',
      key: 'VIN',
    },
    {
      title: 'Year of Manufacturing',
      dataIndex: 'Year_of_manufacturing',
      key: 'Year_of_manufacturing',
    },
    {
      title: 'Brand',
      dataIndex: 'Brand',
      key: 'Brand',
    },
    {
      title: 'Model',
      dataIndex: 'Model',
      key: 'Model',
    },
    {
      title: 'Trim',
      dataIndex: 'Trim',
      key: 'Trim',
    },
    {
      title: 'Mileage',
      dataIndex: 'Mileage',
      key: 'Mileage',
    },
    {
      title: 'Type',
      dataIndex: 'Type',
      key: 'Type',
    },
    {
      title: 'Gas Type',
      dataIndex: 'Gas_Type',
      key: 'Gas_Type',
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      key: 'Price',
    },
    {
      title: 'Customer ID',
      dataIndex: 'Customer_ID',
      key: 'Customer_ID',
    },

    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space size="middle">
            <Button type="primary" onClick={() => save(record.VIN)}>Save</Button>
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

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Inventory</Typography.Title>
      <Form form={form} component={false}>
        <Table
          columns={columns}
          dataSource={cars}
          loading={loading}
          rowKey="VIN"
        />
      </Form>
      {editingKey !== '' && (
        <Button type="primary" onClick={handleSaveAll}>Save All</Button>
      )}
    </Space>
  );
}

export default Inventory;
