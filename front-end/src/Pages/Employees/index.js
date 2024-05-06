import { Button, Form, Input, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";

function Employees() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm(); // Ant Design Form hook

  useEffect(() => {
    fetch('http://127.0.0.1:5000/employee') 
      .then(response => response.json())
      .then(data => {
        setEmployees(data);
      })
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  const isEditing = (record) => record.Employee_ID === editingKey;

  const edit = (record) => {
    setEditingKey(record.Employee_ID);
    form.setFieldsValue({ ...record }); // Set form values for the editing row
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields(); // Validate form fields
      // Perform save operation here, for example, update the employee record in the database
      console.log("Update employee with ID:", key, "and data:", row);
      setEditingKey('');
    } catch (errorInfo) {
      console.log('Validate Failed:', errorInfo);
    }
  };

  const handleSaveAll = () => {
    // Loop through all edited rows and save changes
    dataSource.forEach((record) => {
      if (isEditing(record)) {
        save(record.Employee_ID);
      }
    });
  };

  const columns = [
    {
      title: 'Employee ID',
      dataIndex: 'Employee_ID',
      key: 'Employee_ID',
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'DOB',
      dataIndex: 'DOB',
      key: 'DOB',
    },
    {
      title: 'Department',
      dataIndex: 'Department',
      key: 'Department',
    },
    {
      title: 'Job Title',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
    },
    {
      title: 'Report To',
      dataIndex: 'reportTo',
      key: 'reportTo',
    },
    {
      title: 'Password',
      dataIndex: 'Password',
      key: 'Password',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space size="middle">
            <Button type="primary" onClick={() => save(record.Employee_ID)}>Save</Button>
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
      <Typography.Title level={4}>Employees</Typography.Title>
      <Form form={form} component={false}>
        <Table
          columns={columns}
          dataSource={employees}
          loading={loading}
          rowKey="Employee_ID"
        />
      </Form>
      {editingKey !== '' && (
        <Button type="primary" onClick={handleSaveAll}>Save All</Button>
      )}
    </Space>
  );
}

export default Employees;
