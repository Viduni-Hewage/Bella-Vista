import React, { useEffect, useState } from "react";
import { 
  Table, 
  Button, 
  Modal, 
  Select, 
  Tag, 
  Avatar, 
  message, 
  Spin, 
  Popconfirm,
  Space,
  Badge
} from "antd";
import { 
  UserOutlined, 
  LockOutlined, 
  UnlockOutlined, 
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined
} from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const { Option } = Select;

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRoleModalVisible, setIsRoleModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  
  const { getAccessTokenSilently, user } = useAuth0();
  const navigate = useNavigate();

  // Available roles
  const availableRoles = ['Admin', 'User', 'Moderator'];

  // Fetch users from backend using Auth0 Management API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Check admin access
      const roles = user?.["https://bella-vista-api/roles"] || [];
      if (!roles.includes("Admin")) {
        message.error("Access denied");
        navigate("/");
        return;
      }

      console.log('Fetching users for admin...');
      const token = await getAccessTokenSilently();
      
      const res = await axios.get("https://localhost:5000/api/users/admin/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Response:', res.data);
      
      if (res.data && res.data.success) {
        setUsers(res.data.users || []);
        message.success(`Loaded ${res.data.users?.length || 0} users`);
      } else {
        message.error('Failed to fetch users');
        setUsers([]);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch users';
      message.error(`Error: ${errorMessage}`);
      setUsers([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user, getAccessTokenSilently, navigate]);

  // Handle role update
  const handleUpdateRole = async () => {
    if (!selectedUser) return;
    
    try {
      const token = await getAccessTokenSilently();
      await axios.patch(
        `https://localhost:5000/api/users/${selectedUser.user_id}/role`,
        { roles: selectedRoles },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers(prev => 
        prev.map(u => 
          u.user_id === selectedUser.user_id 
            ? { ...u, roles: selectedRoles }
            : u
        )
      );

      message.success("User roles updated successfully");
      setIsRoleModalVisible(false);
      setSelectedUser(null);
      setSelectedRoles([]);
    } catch (err) {
      console.error(err);
      message.error(err.response?.data?.message || "Failed to update user roles");
    }
  };

  // Handle user block/unblock
  const handleToggleBlock = async (userId, currentBlockStatus) => {
    try {
      const token = await getAccessTokenSilently();
      const action = currentBlockStatus ? 'unblock' : 'block';
      
      await axios.patch(
        `https://localhost:5000/api/users/${userId}/${action}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers(prev => 
        prev.map(u => 
          u.user_id === userId 
            ? { ...u, blocked: !currentBlockStatus }
            : u
        )
      );

      message.success(`User ${action}ed successfully`);
    } catch (err) {
      console.error(err);
      message.error(`Failed to ${currentBlockStatus ? 'unblock' : 'block'} user`);
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    try {
      const token = await getAccessTokenSilently();
      await axios.delete(`https://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUsers(prev => prev.filter(u => u.user_id !== userId));
      message.success("User deleted successfully");
    } catch (err) {
      console.error(err);
      message.error("Failed to delete user");
    }
  };

  // Open role modal
  const openRoleModal = (user) => {
    setSelectedUser(user);
    setSelectedRoles(user.roles || []);
    setIsRoleModalVisible(true);
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "picture",
      key: "picture",
      width: 80,
      render: (picture, record) => (
        <Avatar 
          src={picture} 
          icon={<UserOutlined />}
          alt={record.name}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (name, record) => name || record.email?.split('@')[0] || 'N/A',
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Connection",
      dataIndex: "connection",
      key: "connection",
      width: 120,
      render: (connection) => (
        <Tag color={connection === 'Username-Password-Authentication' ? 'blue' : 'green'}>
          {connection === 'Username-Password-Authentication' ? 'Database' : connection}
        </Tag>
      ),
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      width: 150,
      render: (roles) => (
        <Space wrap>
          {roles?.length > 0 ? (
            roles.map(role => (
              <Tag 
                key={role} 
                color={role === 'Admin' ? 'red' : role === 'Moderator' ? 'orange' : 'blue'}
              >
                {role}
              </Tag>
            ))
          ) : (
            <Tag>No roles</Tag>
          )}
        </Space>
      ),
    },
    {
      title: "Status",
      key: "status",
      width: 100,
      render: (_, record) => (
        <Space>
          <Badge 
            status={record.blocked ? "error" : "success"} 
            text={record.blocked ? "Blocked" : "Active"} 
          />
          {record.email_verified && <Tag color="green">Verified</Tag>}
        </Space>
      ),
    },
    {
      title: "Last Login",
      dataIndex: "last_login",
      key: "last_login",
      width: 150,
      render: (lastLogin) => 
        lastLogin ? new Date(lastLogin).toLocaleString() : 'Never',
    },
    {
      title: "Logins",
      dataIndex: "logins_count",
      key: "logins_count",
      width: 80,
      render: (count) => count || 0,
    },
    {
      title: "Created",
      dataIndex: "created_at",
      key: "created_at",
      width: 150,
      render: (createdAt) => 
        createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A',
    },
    {
      title: "Actions",
      key: "actions",
      width: 200,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => openRoleModal(record)}
            size="small"
          >
            Roles
          </Button>
          
          <Button
            type="link"
            icon={record.blocked ? <UnlockOutlined /> : <LockOutlined />}
            onClick={() => handleToggleBlock(record.user_id, record.blocked)}
            size="small"
            style={{ color: record.blocked ? '#52c41a' : '#faad14' }}
          >
            {record.blocked ? 'Unblock' : 'Block'}
          </Button>
          
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDeleteUser(record.user_id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "5rem auto" }} />;
  }

  return (
    <div style={{ backgroundColor: "white", padding: "40px", margin: "-1.5rem" }}>
      <h2
        style={{
          fontSize: "2rem",
          fontFamily: "'Baskervville', serif",
          color: "#9b3803ff",
          textAlign: "Left",
          marginBottom: "2rem",
        }}
      >
        User Management
      </h2>
      
      <div style={{ marginBottom: 16 }}>
        <Button 
          type="primary" 
          icon={<ReloadOutlined />}
          onClick={fetchUsers} 
          disabled={loading}
        >
          Refresh Users
        </Button>
        <span style={{ marginLeft: 16, color: '#666' }}>
          Total Users: {users.length}
        </span>
      </div>

      <Table 
        columns={columns} 
        dataSource={users} 
        rowKey="user_id" 
        loading={loading}
        bordered
        scroll={{ x: 1200 }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
        }}
      />

      <Modal
        title="Update User Roles"
        open={isRoleModalVisible}
        onOk={handleUpdateRole}
        onCancel={() => {
          setIsRoleModalVisible(false);
          setSelectedUser(null);
          setSelectedRoles([]);
        }}
        width={500}
      >
        {selectedUser && (
          <div>
            <p><strong>User:</strong> {selectedUser.name || selectedUser.email}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Current Roles:</strong></p>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Select roles"
              value={selectedRoles}
              onChange={setSelectedRoles}
            >
              {availableRoles.map(role => (
                <Option key={role} value={role}>{role}</Option>
              ))}
            </Select>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserManagementPage;