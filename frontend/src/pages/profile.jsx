import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Card, Button, Menu } from "antd";
import { UserOutlined, HistoryOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    navigate(`/shop-by-category/${e.key}`);
  };

  const roles = user?.["https://bella-vista-api/roles"] || [];
  const isAdmin = roles.includes("Admin");

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: "center", marginTop: "5rem" }}>
        <h2>Please log in to view your profile.</h2>
        <Button type="primary" onClick={() => window.location.reload()}>
          Login
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          width: "100%",
          background: "#fcf3eeff",
          padding: "1rem 40px 1rem 0",
          boxShadow: "0 2px 8px #f0f1f2",
        }}
      >
        <div
          style={{
            fontSize: "3rem",
            fontWeight: "500",
            fontFamily: "'Baskervville', serif",
            color: "#9b3803ff",
            cursor: "pointer",
            textAlign: "center",
            marginBottom: "0.5rem",
          }}
          onClick={() => navigate("/")}
        >
          Bella Vista
        </div>

        <Menu
          mode="horizontal"
          style={{
            justifyContent: "center",
            fontSize: "1rem",
            background: "transparent",
            gap: "3rem",
          }}
          onClick={handleMenuClick}
        >
          <Menu.Item key="jewelry">Jewelry</Menu.Item>
          <Menu.Item key="watches">Watches</Menu.Item>
          <Menu.Item key="decorations">Decorations</Menu.Item>
          <Menu.Item key="accessories">Accessories</Menu.Item>
        </Menu>
      </div>

      <div
        style={{
          maxWidth: "900px",
          margin: "2rem auto",
          padding: "0 20px",
        }}
      >
        <h1
          style={{
            textAlign: "left",
            marginBottom: "2rem",
            fontWeight: "bold",
            fontFamily: "'Baskervville', serif",
            color: "#9b3803ff",
            margin: "3rem 2rem 2rem 0rem",
            fontSize: "1.7rem",
          }}
        >
          Profile
        </h1>

        <Card
          style={{
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
          bodyStyle={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            gap: "2rem",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              color: "#9b3803ff",
              margin: "0 auto",
            }}
          >
            <UserOutlined />
          </div>

          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
              {user.name}
            </h2>
            <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
              <strong>Email:</strong> {user.email}
            </p>
            <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
              <strong>Contact:</strong>{" "}
              {user.phone_number ? user.phone_number : "Not provided"}
            </p>
            <p style={{ fontSize: "1.1rem", marginBottom: "3rem" }}>
              <strong>Country:</strong>{" "}
              {user.country ? user.country : "Not provided"}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "6rem",
                marginTop: "1rem",
              }}
            >
              {isAdmin ? (
                <Button
                  style={{
                    backgroundColor: "#9b3803ff",
                    fontSize: "15px",
                    fontWeight: "600",
                    padding: "1.5rem 2rem",
                  }}
                  type="primary"
                  icon={<HistoryOutlined />}
                  onClick={() => navigate("/order-summary")}
                >
                  View Order Summary
                </Button>
              ) : (
                <Button
                  style={{
                    backgroundColor: "#9b3803ff",
                    fontSize: "15px",
                    fontWeight: "600",
                    padding: "1.5rem 2rem",
                  }}
                  type="primary"
                  icon={<HistoryOutlined />}
                  onClick={() => navigate("/purchase-history")}
                >
                  View Purchased History
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;