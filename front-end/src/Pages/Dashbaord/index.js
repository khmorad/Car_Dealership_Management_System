import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
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
    <Card style={{height: "100px", width: "200px", display: "flex", alignItems: "center"}}>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}



function RecentOrders() {
  const [carPart, setCarPart] = useState([]);

  useEffect(() => {
    // Assuming you have a function to fetch car part data from an API endpoint
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

    // Call the fetchCarParts function when the component mounts
    fetchCarParts();
  }, []); // Empty dependency array to ensure the effect runs only once
  const paginationConfig = {
    pageSize: 4, // Number of rows per page
    total: carPart.length, // Total number of data items (optional, if known)
  };
  return (
    <>
      <Typography.Text>Recent Orders</Typography.Text>
      <Table
        columns={[
          {
            title: "Part ID",
            dataIndex: "Part_ID",
          },
          {
            title: "Name",
            dataIndex: "Name",
          },
          {
            title: "Brand",
            dataIndex: "Brand",
          },
          {
            title: "Fitment",
            dataIndex: "Fitment",
          },
          {
            title: "Price",
            dataIndex: "Price",
          },
        ]}
        dataSource={carPart}
        pagination={paginationConfig}
      />
    </>
  );
}


function DashboardChart({ transactions }) {
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Revenue',
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
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
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
          hoverBorderColor: 'rgba(54, 162, 235, 1)',
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
