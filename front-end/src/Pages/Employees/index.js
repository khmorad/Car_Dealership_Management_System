import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);



  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Employees</Typography.Title>

    </Space>
  );
}
export default Customers;
