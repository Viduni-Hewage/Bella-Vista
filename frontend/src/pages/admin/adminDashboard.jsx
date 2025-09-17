import React, { useState } from "react";
import OrderManagementPage from "./orderManagement";
import ProductManagementPage from "./productManagement";
import StatisticsPage from "./adminStatistics";
import UserManagementPage from "./userManagement";

const AdminDashboard = () => {
  const [selectedPage, setSelectedPage] = useState("Statistics");

  const renderContent = () => {
    if (selectedPage === "User Management") return <UserManagementPage />;
    if (selectedPage === "Product Management") return <ProductManagementPage />;
    if (selectedPage === "Order Management") return <OrderManagementPage />;
    return <StatisticsPage />;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div
        style={{
          padding: "2.8rem",
          backgroundColor: "#fcf3eeff",
          color: "#9b3803ff",
          fontSize: "3rem",
          fontFamily: "'Baskervville', serif",
          fontWeight: "600",
          flexShrink: 0,
          textAlign: "center",
        }}
      >
        Admin Dashboard
      </div>

      <div style={{ display: "flex", flex: 1, zIndex: 1 }}>
        <div
          style={{
            width: "220px",
            backgroundColor: "white",
            borderRight: "1px solid #da7945ff",
          }}
        >
          {["Statistics", "User Management", "Product Management", "Order Management"].map((item) => (
            <button
              key={item}
              onClick={() => setSelectedPage(item)}
              style={{
                display: "block",
                width: "100%",
                padding: "15px",
                textAlign: "left",
                background: "white",
                border: "1px solid #da7945ff",
                borderLeft: "none",
                borderRight: "none",
                borderBottom: "1px solid #da7945ff",
                fontSize: "1rem",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#fcf3eeff")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "white")
              }
            >
              {item}
            </button>
          ))}
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: "#f9f9f9",
            padding: "20px",
            overflow: "auto",
            margin: "0",
            borderTop: "1px solid #da7945ff",
          }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
