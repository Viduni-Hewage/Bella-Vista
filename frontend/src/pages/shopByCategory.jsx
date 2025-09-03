import React from "react";
import { Menu } from "antd";
import { useNavigate, Outlet } from "react-router-dom";

const ShopByCategory = () => {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    navigate(`/shop-by-category/${e.key}`);
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          background: "#fcf3eeff",
          padding: "1rem 40px 0 0",
          boxShadow: "0 2px 8px #f0f1f2",
        }}
      >
        <div
          style={{
            fontSize: "5rem",
            fontWeight: "500",
            fontFamily: "'Baskervville', serif",
            color: "#9b3803ff",
            cursor: "pointer",
            textAlign: "center", 
            marginBottom: "0.5rem",
          }}
          onClick={() => navigate("/")}
        >
          Bellavista
        </div>

        <Menu
          mode="horizontal"
          style={{ justifyContent: "center", fontSize: "1rem", background: "transparent", gap:"3rem" }}
          onClick={handleMenuClick}
        >
          <Menu.Item key="jewelry">Jewelry</Menu.Item>
          <Menu.Item key="watches">Watches</Menu.Item>
          <Menu.Item key="decorations">Decorations</Menu.Item>
          <Menu.Item key="accessories">Accessories</Menu.Item>
        </Menu>
      </div>

      <div style = {{ }}>
        <Outlet />
      </div>
    </div>
  );
};

export default ShopByCategory;
