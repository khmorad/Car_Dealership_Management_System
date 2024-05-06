import { Button, Form, Input, Space, Table, Typography } from "antd";
import { useEffect, useState, useRef } from "react";

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm(); // Ant Design Form hook

  useEffect(() => {
    fetch('http://127.0.0.1:5000/customer') 
      .then(response => response.json())
      .then(data => {
        setCustomers(data);
      })
      .catch(error => console.error('Error fetching customers:', error));
  }, []);

  const isEditing = (record) => record.Customer_ID === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ ...record }); // Set form values for the editing row
    setEditingKey(record.Customer_ID);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields(); // Validate form fields
      // Perform save operation here, for example, update the customer record in the database
      console.log("Update customer with ID:", key, "and data:", row);
      setEditingKey('');
    } catch (errorInfo) {
      console.log('Validate Failed:', errorInfo);
    }
  };

  const handleSaveAll = () => {
    // Loop through all edited rows and save changes
    dataSource.forEach((record) => {
      if (isEditing(record)) {
        save(record.Customer_ID);
      }
    });
  };

  const columns = [
    {
      title: 'Customer ID',
      dataIndex: 'Customer_ID',
      key: 'Customer_ID',
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      editable: true, // Make the column editable
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
      editable: true, // Make the column editable
    },
    {
      title: 'Phone',
      dataIndex: 'Phone',
      key: 'Phone',
      editable: true, // Make the column editable
    },
    {
      title: 'Address',
      dataIndex: 'Address',
      key: 'Address',
      editable: true, // Make the column editable
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space size="middle">
            <Button type="primary" onClick={() => save(record.Customer_ID)}>Save</Button>
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
      <Typography.Title level={4}>Customers</Typography.Title>
      <Form form={form} component={false}>
        <Table
          columns={columns.map(col => ({
            ...col,
            onCell: record => ({
              record,
              editable: col.editable,
              dataIndex: col.dataIndex,
              title: col.title,
              editing: isEditing(record),
            }),
          }))}
          dataSource={customers}
          loading={loading}
          rowKey="Customer_ID"
          components={{
            body: {
              cell: EditableCell,
            },
          }}
        />
      </Form>
      {editingKey !== '' && (
        <Button type="primary" onClick={handleSaveAll}>Save All</Button>
      )}
    </Space>
  );
}

// Editable cell component
// Editable cell component
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  form, // Form prop
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null); // Initialize the inputRef

  const toggleEdit = () => {
    setEditing(!editing);
  };

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      console.log('Save values:', values);
    } catch (errorInfo) {
      console.log('Validate Failed:', errorInfo);
    }
  };

  let childNode = children;

  if (editable && editing) {
    childNode = (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        initialValue={record[dataIndex]} // Set initial value to the current value
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    );
  } else {
    childNode = (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default Customers;
