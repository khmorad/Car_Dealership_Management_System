import { Button, Form, Input, Space, Table, Typography, Modal, message, DatePicker } from "antd";
import { useEffect, useState } from "react";
import moment from 'moment';
function Employees() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [form] = Form.useForm(); // Ant Design Form hook

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/employee');
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleEdit = (record) => {
    setEditingKey(record.Employee_ID);
  };

  const handleSave = async (record) => {
    try {
      const updatedEmployee = { ...record };
      const response = await fetch(`http://127.0.0.1:5000/employee/${record.Employee_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmployee),
      });

      if (!response.ok) {
        throw new Error('Failed to update employee');
      }

      message.success('Employee updated successfully.');
      setEditingKey('');
      fetchEmployees(); // Fetch updated employees after saving
    } catch (error) {
      console.error('Error updating employee:', error);
      message.error('Failed to update employee.');
    }
  };

  const handleDelete = async (record) => {
    try {
      await fetch(`http://127.0.0.1:5000/employee/${record.Employee_ID}`, {
        method: 'DELETE',
      });
      setEmployees(employees.filter(item => item.Employee_ID !== record.Employee_ID));
      message.success('Employee deleted successfully.');
    } catch (error) {
      console.error('Error deleting employee:', error);
      message.error('Failed to delete employee.');
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
      const response = await fetch('http://127.0.0.1:5000/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error('Failed to add employee');
      }
      message.success('Employee added successfully.');
      setAddModalVisible(false);
      fetchEmployees(); // Fetch updated employees after adding
    } catch (error) {
      console.error('Error adding employee:', error);
      message.error('Failed to add employee.');
    }
  };
  
  const columns = [
    {
      title: 'Employee ID',
      dataIndex: 'Employee_ID',
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      editable: true,
    },
    {
      title: 'DOB',
      dataIndex: 'DOB',
      editable: true,
      render: (text, record) => (
        <DatePicker 
          defaultValue={text ? moment(text) : null} 
          onChange={(date, dateString) => handleDatePickerChange(dateString, record.Employee_ID)} 
        />
      ),
    },
    {
      title: 'Department',
      dataIndex: 'Department',
      editable: true,
    },
    {
      title: 'Job Title',
      dataIndex: 'jobTitle',
      editable: true,
    },
    {
      title: 'Report To',
      dataIndex: 'reportTo',
      editable: true,
    },
    {
      title: 'Password',
      dataIndex: 'Password',
      editable: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => {
        const editable = record.Employee_ID === editingKey;
        return editable ? (
          <>
            <Button type="primary" onClick={() => handleSave(record)}>Save</Button>
            <Button type="danger" onClick={() => setEditingKey('')}>Cancel</Button>
          </>
        ) : (
          <>
            <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
            <Button type="danger" onClick={() => handleDeleteConfirm(record)}>Delete</Button>
          </>
        );
      },
    },
  ];

  const handleDatePickerChange = (dateString, employeeId) => {
    const updatedEmployees = employees.map(employee => {
      if (employee.Employee_ID === employeeId) {
        return { ...employee, DOB: dateString };
      }
      return employee;
    });
    setEmployees(updatedEmployees);
  };

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Employees</Typography.Title>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: '16px' }}>Add Employee</Button>
      <Table
        columns={columns}
        dataSource={employees}
        pagination={{ pageSize: 4 }}
        rowKey="Employee_ID"
      />
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
        <Form form={form} onFinish={handleAddSubmit}>
          <Form.Item name="Name" label="Name" rules={[{ required: true, message: 'Please input the name of the employee!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="DOB" label="DOB" rules={[{ required: true, message: 'Please select the date of birth of the employee!' }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="Department" label="Department" rules={[{ required: true, message: 'Please input the department of the employee!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="jobTitle" label="Job Title" rules={[{ required: true, message: 'Please input the job title of the employee!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="reportTo" label="Report To" rules={[{ required: true, message: 'Please input the reporting manager of the employee!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="Password" label="Password" rules={[{ required: true, message: 'Please input the password of the employee!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Add Employee</Button>
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
}

export default Employees;