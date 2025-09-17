import React, { useEffect, useState } from "react";
import { Table, Button, Avatar, message, Spin, Space, Badge, Tag } from "antd";
import { UserOutlined, LockOutlined, UnlockOutlined, DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getAccessTokenSilently, user } = useAuth0();
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const roles = user?.["https://bella-vista-api/roles"] || [];
      if (!roles.includes("Admin")) {
        message.error("Access denied");
        navigate("/");
        return;
      }

      const token = await getAccessTokenSilently();
      const res = await axios.get("https://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data && res.data.success) {
        setUsers(res.data.users || []);
      } else {
        message.error("Failed to fetch users");
        setUsers([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      message.error(err.response?.data?.message || err.message || "Failed to fetch users");
      setUsers([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchUsers();
  }, [user, getAccessTokenSilently, navigate]);

  const handleToggleBlock = async (userId, blocked) => {
    try {
      const token = await getAccessTokenSilently();
      const action = blocked ? "unblock" : "block";
      await axios.patch(`https://localhost:5000/api/users/${userId}/${action}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(prev => prev.map(u => u.user_id === userId ? { ...u, blocked: !blocked } : u));
      message.success(`User ${action}ed successfully`);
    } catch (err) {
      console.error(err);
      message.error(`Failed to ${blocked ? "unblock" : "block"} user`);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const token = await getAccessTokenSilently();
      await axios.delete(`https://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(prev => prev.filter(u => u.user_id !== userId));
      message.success("User deleted successfully");
    } catch (err) {
      console.error(err);
      message.error("Failed to delete user");
    }
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "picture",
      key: "picture",
      width: 80,
      render: (picture, record) => (
        <Avatar src={picture} icon={<UserOutlined />} alt={record.name} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (name, record) => name || record.email?.split("@")[0] || "N/A",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      width: 150,
      render: (roles) => (
        <Space wrap>
          {roles && roles.length > 0
            ? roles.map(role => (
                <Tag key={role} color={role === "Admin" ? "red" : "blue"}>
                  {role}
                </Tag>
              ))
            : <Tag>No roles</Tag>
          }
        </Space>
      ),
    },
    {
      title: "Status",
      key: "status",
      width: 120,
      render: (_, record) => (
        <Space>
          <Badge status={record.blocked ? "error" : "success"} text={record.blocked ? "Blocked" : "Active"} />
          {record.email_verified && <Tag color="green">Verified</Tag>}
        </Space>
      ),
    },
    {
      title: "Last Login",
      dataIndex: "last_login",
      key: "last_login",
      width: 150,
      render: (lastLogin) => lastLogin ? new Date(lastLogin).toLocaleString() : "Never",
    },
    {
      title: "Actions",
      key: "actions",
      width: 200,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={record.blocked ? <UnlockOutlined /> : <LockOutlined />}
            onClick={() => handleToggleBlock(record.user_id, record.blocked)}
            size="small"
            style={{ color: record.blocked ? "#52c41a" : "#faad14" }}
          >
            {record.blocked ? "Unblock" : "Block"}
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDeleteUser(record.user_id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "5rem auto" }} />;
  }

  return (
    <div style={{ backgroundColor: "white", padding: "40px", margin: "-1.5rem" }}>
      <h2 style={{ fontSize: "2rem", fontFamily: "'Baskervville', serif", color: "#9b3803ff", textAlign: "left", marginBottom: "2rem" }}>
        User Management
      </h2>

      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<ReloadOutlined />} onClick={fetchUsers} disabled={loading}>
          Refresh Users
        </Button>
        <span style={{ marginLeft: 16, color: "#666" }}>
          Total Users: {users.length}
        </span>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="user_id"
        loading={loading}
        bordered
        scroll={{ x: 1000 }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
        }}
      />
    </div>
  );
};

export default UserManagementPage;
