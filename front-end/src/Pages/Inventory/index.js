import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Modal, Table, Typography, DatePicker } from "antd";

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const fetchCars = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/cars/all');
      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleEdit = (record) => {
    setEditingKey(record.VIN);
  };

  const handleSave = async (record) => {
    try {
      const updatedCar = { ...record };
      const response = await fetch(`http://127.0.0.1:5000/update/cars`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCar),
      });

      if (!response.ok) {
        throw new Error('Failed to update car');
      }

      message.success('Car updated successfully.');
      setEditingKey('');
      fetchCars(); // Fetch updated cars after saving
    } catch (error) {
      console.error('Error updating car:', error);
      message.error('Failed to update car.');
    }
  };

  const handleDelete = async (record) => {
    try {
      await fetch(`http://127.0.0.1:5000/remove/cars/${record.VIN}`, {
        method: 'DELETE',
      });
      setCars(cars.filter(item => item.VIN !== record.VIN));
      message.success('Car deleted successfully.');
    } catch (error) {
      console.error('Error deleting car:', error);
      message.error('Failed to delete car.');
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
      const carData = { ...values };
      const response = await fetch('http://127.0.0.1:5000/add/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });
      if (!response.ok) {
        throw new Error('Failed to add car');
      }
      message.success('Car added successfully.');
      setAddModalVisible(false);
      fetchCars(); // Fetch updated cars after adding
    } catch (error) {
      console.error('Error adding car:', error);
      message.error('Failed to add car.');
    }
  };

  const columns = [
    {
      title: "VIN",
      dataIndex: "VIN",
    },
    {
      title: "Year",
      dataIndex: "Year_of_manufacturing",
      editable: true,
      render: (text, record) => renderCell(record, 'Year_of_manufacturing', text),
    },
    {
      title: "Brand",
      dataIndex: "Brand",
      editable: true,
      render: (text, record) => renderCell(record, 'Brand', text),
    },
    {
      title: "Model",
      dataIndex: "Model",
      editable: true,
      render: (text, record) => renderCell(record, 'Model', text),
    },
    {
      title: "Trim",
      dataIndex: "Trim",
      editable: true,
      render: (text, record) => renderCell(record, 'Trim', text),
    },
    {
      title: "Mileage",
      dataIndex: "Mileage",
      editable: true,
      render: (text, record) => renderCell(record, 'Mileage', text),
    },
    {
      title: "Type",
      dataIndex: "Type",
      editable: true,
      render: (text, record) => renderCell(record, 'Type', text),
    },
    {
      title: "Gas Type",
      dataIndex: "Gas_Type",
      editable: true,
      render: (text, record) => renderCell(record, 'Gas_Type', text),
    },
    {
      title: "Price",
      dataIndex: "Price",
      editable: true,
      render: (text, record) => renderCell(record, 'Price', text),
    },
    {
      title: "Customer ID",
      dataIndex: "Customer_ID",
      editable: true,
      render: (text, record) => renderCell(record, 'Customer_ID', text),
    },

    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => {
        const editable = record.VIN === editingKey;
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

  const handleFieldChange = (record, dataIndex, value) => {
    const updatedRecord = { ...record, [dataIndex]: value };
    // Update the cars state to reflect the changes
    setCars(cars.map(item => (item.VIN === record.VIN ? updatedRecord : item)));
  };

  const renderCell = (record, dataIndex, text) => {
    const editable = record.VIN === editingKey;
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
        <Input onChange={(e) => handleFieldChange(record, dataIndex, e.target.value)} />
      </Form.Item>
    ) : (
      text
    );
  };

  return (
    <>
      <div>
      <Typography.Text>Manage Cars</Typography.Text>
      </div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: '16px' }}>Add Car</Button>
      <Table
        columns={columns}
        dataSource={cars}
        pagination={{ pageSize: 100 }}
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
        <p>Are you sure you want to delete this car?</p>
      </Modal>
      <Modal
        title="Add Car"
        visible={addModalVisible}
        onCancel={handleAddCancel}
        footer={null}
      >
        <AddCarForm onSubmit={handleAddSubmit} />
      </Modal>
    </>
  );
};

const AddCarForm = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="VIN" label="VIN" rules={[{ required: true, message: 'Please input the VIN of the car!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Year_of_manufacturing" label="Year" rules={[{ required: true, message: 'Please input the year of manufacturing of the car!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Brand" label="Brand" rules={[{ required: true, message: 'Please input the brand of the car!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Model" label="Model" rules={[{ required: true, message: 'Please input the model of the car!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Trim" label="Trim" rules={[{ required: true, message: 'Please input the trim of the car!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Mileage" label="Mileage" rules={[{ required: true, message: 'Please input the mileage of the car!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Type" label="Type" rules={[{ required: true, message: 'Please input the type of the car!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Gas_Type" label="Gas Type" rules={[{ required: true, message: 'Please input the gas type of the car!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Price" label="Price" rules={[{ required: true, message: 'Please input the price of the car!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Customer_ID" label="Customer ID" rules={[{ required: true, message: 'Please input the customer ID of the car!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="image_url" label="Image URL" rules={[{ required: true, message: 'Please input the image URL of the car!' }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Add Car</Button>
      </Form.Item>
    </Form>
  );
};

export default ManageCars;
