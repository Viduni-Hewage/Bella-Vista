import React from "react";
import { Layout, Menu, Badge } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";

const { Header } = Layout;

const WebHeader = ({ visible }) => {
  const navigate = useNavigate();
  const { getCartCount } = useCart();

  const handleMenuClick = (e) => {
    switch (e.key) {
      case "jewelry":
         navigate("/shop-by-category/jewelry");
         break;
      case "watches":
         navigate("/shop-by-category/watches");
         break;
      case "decorations":
         navigate("/shop-by-category/decorations");
         break;
      case "accessories":
         navigate("/shop-by-category/accessories");
         break;
      case "news":
        navigate("/news");
        break;
      case "world":
        navigate("/world");
        break;
      default:
        break;
    }
  };

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
      <div style={{ fontSize: "2rem", fontWeight: "bold", fontFamily: "'Baskervville', serif", color: "#9b3803ff", cursor: "pointer"}}  onClick={() => navigate("/")}>Bellavista</div>

      <Menu
        mode="horizontal"
        style={{ flex: 1, justifyContent: "center", borderBottom: "none", fontSize: "1rem"  }}
        onClick={handleMenuClick}
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

        <span style={{cursor: "pointer", display: "flex", alignItems: "center"}}
          onClick={() => navigate("/cart")}
        >
          <Badge
            count={getCartCount()} 
            offset={[0, 0]}
            style={{
              backgroundColor: "#f5222d", 
              fontSize: "0.75rem",
              minWidth: "18px",
              height: "18px",
              lineHeight: "18px",
              borderRadius: "50%",
            }}
          >
            <ShoppingCartOutlined style={{ fontSize: "20px" }} />
          </Badge>
        </span>
      </div>

    </Header>
  );
};

export default WebHeader;
