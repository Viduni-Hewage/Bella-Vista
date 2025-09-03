import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const WebHeader = ({ visible }) => {
  const navigate = useNavigate();
  return (
    <Header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        padding: "0 40px",
        boxShadow: "0 2px 8px #f0f1f2",
        height:"10vh",
        transition: "all 0.3s ease",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        zIndex: 1000,
      }}
    >
      <div style={{ fontSize: "2rem", fontWeight: "bold", fontFamily: "'Baskervville', serif", color: "#9b3803ff"}}>Bellavista</div>

      <Menu
        mode="horizontal"
        style={{ flex: 1, justifyContent: "center", borderBottom: "none", fontSize: "1rem"  }}
      >
        <Menu.Item key="jewelry">Jewelry</Menu.Item>
        <Menu.Item key="watches">Watches</Menu.Item>
        <Menu.Item key="decorations">Decorations</Menu.Item>
        <Menu.Item key="accessories">Accessories</Menu.Item>
        <Menu.Item key="news">News</Menu.Item>
        <Menu.Item key="world">World of BellaVista</Menu.Item>
      </Menu>

      <div style={{ fontSize: "1rem", display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "20px", cursor: "pointer", display: "flex", alignItems: "center" }}
        onClick={() => navigate("/login")}
        >
            <UserOutlined style={{  fontSize: "20px", marginRight: "6px" }} /> Login
        </span>
        <span style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
            <ShoppingCartOutlined style={{ fontSize: "20px", marginRight: "6px" }} />
        </span>
      </div>

    </Header>
  );
};

export default WebHeader;
