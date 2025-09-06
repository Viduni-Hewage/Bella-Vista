import React, { useState, useEffect, useRef } from "react";
import { Layout, Menu, Badge } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";
import axios from "axios";

const { Header } = Layout;

const WebHeader = ({ visible }) => {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const userCardRef = useRef(null);

  const [showUserCard, setShowUserCard] = useState(false);

  const token = localStorage.getItem("token");

const [username, setUsername] = useState("");
const [loading, setLoading] = useState(false);

useEffect(() => {
    const handleClickOutside = (event) => {
      if (userCardRef.current && !userCardRef.current.contains(event.target)) {
        setShowUserCard(false);
      }
    };

    if (showUserCard) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserCard]);

useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsername(res.data.name || "");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);

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

  const handleUserButtonClick = () => {
    if (token) {
      localStorage.removeItem("token");
      window.location.reload();
    } else {
      navigate("/login");
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
        height: "10vh",
        transition: "all 0.3s ease",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          fontFamily: "'Baskervville', serif",
          color: "#9b3803ff",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        BellaVista
      </div>

      <Menu
        mode="horizontal"
        style={{ flex: 1, justifyContent: "center", borderBottom: "none", fontSize: "1rem" }}
        onClick={handleMenuClick}
      >
        <Menu.Item key="jewelry">Jewelry</Menu.Item>
        <Menu.Item key="watches">Watches</Menu.Item>
        <Menu.Item key="decorations">Decorations</Menu.Item>
        <Menu.Item key="accessories">Accessories</Menu.Item>
        <Menu.Item key="news">News</Menu.Item>
        <Menu.Item key="world">World of BellaVista</Menu.Item>
      </Menu>

      <div style={{ fontSize: "1rem", display: "flex", alignItems: "center", position: "relative" }}>
        <span
          style={{
            marginRight: "20px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
          onClick={() => setShowUserCard(!showUserCard)}
          ref={userCardRef}
        >
          <UserOutlined style={{ fontSize: "20px", marginRight: "6px" }} />

          {showUserCard && (
            <div
              style={{
                position: "absolute",
                top: "120%",
                right: 0,
                width:"20vw",
                minWidth: "16rem",
                padding: "0.2rem 0.5rem",
                background: "#ffffffff",
                border: "1px solid #9b3803ff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                borderRadius: "6px",
                zIndex: 100,
                display: "flex",
                flexDirection: "column",
                gap: "0rem",
              }}
            >
                 <p style={{ margin: 0, paddingLeft: 8, fontSize:"1.2rem" }}>
  {loading ? "Loading..." : `Hi, ${username}`}
</p>
              <button
                onClick={handleUserButtonClick}
                style={{
                  height: "8vh",
    padding: "0",
    border: "none",
    backgroundColor: "#fcf3eef",
    color: token ? "red" : "green",
    cursor: "pointer",
    borderRadius: "4px",
    fontWeight: "500",
    fontSize:"1.2rem"
                }}
              >
                {token ? "Logout" : "Login"}
              </button>
            </div>
          )}
        </span>

        <span
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
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
