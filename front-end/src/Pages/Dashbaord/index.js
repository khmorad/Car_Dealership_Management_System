import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography,Button,Modal, Form, Input, message  } from "antd";
import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [Employees,setEmployees] = useState([])
  const [customers, setCustomers] = useState([])
  const [cars, setCars] = useState([])
  const [transaction, setTransaction] = useState([])
  useEffect(() => {
    fetch('http://127.0.0.1:5000/employee') 
      .then(response => response.json())
      .then(data => {
        setEmployees(data);
        
      })
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/transactions') 
      .then(response => response.json())
      .then(data => {
        setTransaction(data);
        
      })
      .catch(error => console.error('Error fetching transaction:', error));
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/customer') 
      .then(response => response.json())
      .then(data => {
        setCustomers(data);
        console.log('customers:', data);
      })
      .catch(error => console.error('Error fetching customer:', error));
  }, []);
  useEffect(() => {
    fetch('http://127.0.0.1:5000/cars/all') 
      .then(response => response.json())
      .then(data => {
        setCars(data);
      })
      .catch(error => console.error('Error fetching cars:', error));
  }, []);

  const ObjCounter = (data) => {
    if (!data) return 0;

    if (Array.isArray(data)) {
      return data.length; 
    } else if (typeof data === 'object') {
      return Object.keys(data).length; 
    } else {
      return 0; 
    } 
  }


  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Employees"}
          value={ObjCounter(Employees)}
        />
                <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Customer"}
          value={ObjCounter(customers)}
        />
        <DashboardCard
          icon={
            <ShoppingOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Inventory"}
          value={ObjCounter(cars)}
        />

        <DashboardCard
          icon={
            <ShoppingCartOutlined
              style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"transactions"}
          value={ObjCounter(transaction)}
        />
      </Space>
      <Space>
        <RecentOrders />
        <DashboardChart transactions={transaction} />
      </Space>
    </Space>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card style={{height: "100px", width: "250px", display: "flex", alignItems: "center"}}>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}



const RecentOrders = () => {
  const [carPart, setCarPart] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const fetchCarParts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/browse/parts/all');
      if (!response.ok) {
        throw new Error('Failed to fetch car parts');
      }
      const data = await response.json();
      setCarPart(data);
    } catch (error) {
      console.error('Error fetching car parts:', error);
    }
  };

  useEffect(() => {
    fetchCarParts();
  }, []);

  const handleEdit = (record) => {
    setEditingKey(record.Part_ID);
  };

  const handleSave = async (record) => {
    try {
      const updatedCarPart = { ...record };
      const response = await fetch(`http://127.0.0.1:5000/update/parts`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCarPart),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update car part');
      }
  
      message.success('Car part updated successfully.');
      setEditingKey('');
      fetchCarParts(); // Fetch updated car parts after saving
    } catch (error) {
      console.error('Error updating car part:', error);
      message.error('Failed to update car part.');
    }
  };
  

  const handleDelete = async (record) => {
    try {
      await fetch(`http://127.0.0.1:5000/remove/parts/${record.Part_ID}`, {
        method: 'DELETE',
      });
      setCarPart(carPart.filter(item => item.Part_ID !== record.Part_ID));
      message.success('Car part deleted successfully.');
    } catch (error) {
      console.error('Error deleting car part:', error);
      message.error('Failed to delete car part.');
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
      const randomPartID = Math.floor(Math.random() * 900) + 100;
      const carPartData = {
        Part_ID: randomPartID,
        ...values
      };
      const response = await fetch('http://127.0.0.1:5000/add/parts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carPartData),
      });
      if (!response.ok) {
        throw new Error('Failed to add car part');
      }
      message.success('Car part added successfully.');
      setAddModalVisible(false);
      fetchCarParts(); // Fetch updated car parts after adding
    } catch (error) {
      console.error('Error adding car part:', error);
      message.error('Failed to add car part.');
    }
  };
  
  const columns = [
    {
      title: "Part ID",
      dataIndex: "Part_ID",
    },
    {
      title: "Name",
      dataIndex: "Name",
      editable: true,
      render: (text, record) => renderCell(record, 'Name', text),
    },
    {
      title: "Brand",
      dataIndex: "Brand",
      editable: true,
      render: (text, record) => renderCell(record, 'Brand', text),
    },
    {
      title: "Fitment",
      dataIndex: "Fitment",
      editable: true,
      render: (text, record) => renderCell(record, 'Fitment', text),
    },
    {
      title: "Price",
      dataIndex: "Price",
      editable: true,
      render: (text, record) => renderCell(record, 'Price', text),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => {
        const editable = record.Part_ID === editingKey;
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
    // Update the carPart state to reflect the changes
    setCarPart(carPart.map(item => (item.Part_ID === record.Part_ID ? updatedRecord : item)));
  };
  const renderCell = (record, dataIndex, text) => {
    const editable = record.Part_ID === editingKey;
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
      <Typography.Text>Recent Orders</Typography.Text>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: '16px' }}>Add Car Part</Button>
      <Table
        columns={columns}
        dataSource={carPart}
        pagination={{ pageSize: 4 }}
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
        <p>Are you sure you want to delete this car part?</p>
      </Modal>
      <Modal
        title="Add Car Part"
        visible={addModalVisible}
        onCancel={handleAddCancel}
        footer={null}
      >
        <AddCarPartForm onSubmit={handleAddSubmit} />
      </Modal>
    </>
  );
}

const AddCarPartForm = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="Name" label="Name" rules={[{ required: true, message: 'Please input the name of the car part!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Brand" label="Brand" rules={[{ required: true, message: 'Please input the brand of the car part!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Fitment" label="Fitment" rules={[{ required: true, message: 'Please input the fitment of the car part!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Price" label="Price" rules={[{ required: true, message: 'Please input the price of the car part!' }]}>
        <Input type="number" min={0} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Add Car Part</Button>
      </Form.Item>
    </Form>
  );
}
function DashboardChart({ transactions }) {
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Revenue',
        backgroundColor: 'rgba(0,153,255, 0.6)',
        borderColor: 'rgba(0,153,255, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(0,153,255, 0.8)',
        hoverBorderColor: 'rgba(0,153,255, 1)',
        data: [],
      },
    ],
  });

  useEffect(() => {
    if (transactions.length > 0) {
      const employeeRevenueMap = {};
      transactions.forEach(transaction => {
        const employeeID = transaction.Employee_ID;
        const price = transaction.Price;
        if (!employeeRevenueMap[employeeID]) {
          employeeRevenueMap[employeeID] = price;
        } else {
          employeeRevenueMap[employeeID] += price;
        }
      });
      const labels = Object.keys(employeeRevenueMap);
      const data = labels.map(label => employeeRevenueMap[label]);
      setRevenueData({
        labels: labels,
        datasets: [{
          label: 'Revenue',
          backgroundColor: 'rgba(0,153,255,0.7)',
          borderColor: 'rgba(0,153,255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0,153,255, 0.8)',
          hoverBorderColor: 'rgba(0,153,255, 1)',
          data: data,
        }],
      });
    }
  }, [transactions]);
  

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Order Revenue',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Employee ID',
        },
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Revenue',
        },
      },
    },
  };

  return (
    <Card style={{ width: 500, height: 250 }}>
      <Bar options={options} data={revenueData} />
    </Card>
  );
}

export default Dashboard;
