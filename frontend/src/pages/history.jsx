import React from "react";
import { useCart } from "../context/useCart";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { useAuth0 } from "@auth0/auth0-react";

const HistoryPage = () => {
  const { purchasedItems, removePurchasedItem, clearPurchaseHistory } = useCart();
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (!isAuthenticated) {
    loginWithRedirect({ appState: { returnTo: "/history" } });
    return null;
  }

  const handleMenuClick = (e) => {
    navigate(`/shop-by-category/${e.key}`);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm("Are you sure you want to remove this item from your purchase history?")) {
      removePurchasedItem(id);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your entire purchase history? This action cannot be undone.")) {
      clearPurchaseHistory();
    }
  };

  if (purchasedItems.length === 0) {
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

        <div>
          <h3
            style={{
              textAlign: "left",
              fontWeight: "bold",
              fontFamily: "'Baskervville', serif",
              color: "#9b3803ff",
              margin: "4rem 6rem 3rem 6rem",
              fontSize: "1.7rem",
            }}
          >
            Purchase History
          </h3>
        </div>
        <p style={{ textAlign: "center", margin: "6rem auto 0rem auto" }}>
          No purchase history yet.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            style={{margin: "3rem auto 4rem auto", color: "white", backgroundColor: "#9b3803ff", padding: "0.7rem 2.5rem", border: "none", borderRadius: "4px", cursor: "pointer" }}
            onClick={() => navigate("/shop-by-category")}
          >
            Go back shopping
          </button>
        </div>
      </div>
      
    );
  }

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

      {/* Title and Clear History Button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "4rem 6rem 3rem 6rem" }}>
        <h3
          style={{
            fontWeight: "bold",
            fontFamily: "'Baskervville', serif",
            color: "#9b3803ff",
            fontSize: "1.7rem",
            margin: 0,
          }}
        >
          Purchase History
        </h3>
        {purchasedItems.length > 0 && (
          <button
            onClick={handleClearHistory}
            style={{
              color: "white",
              backgroundColor: "#dc3545",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.9rem",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#c82333"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#dc3545"}
          >
            Clear All History
          </button>
        )}
      </div>

      <div style={{ maxWidth: "1300px", margin: "2rem auto" }}>
        {purchasedItems.map((item) => (
          <div
            key={item._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "2px solid rgba(0,0,0,0.2)",
              borderRadius: 9,
              padding: "1.5rem 2rem",
              margin: "2rem",
              position: "relative",
            }}
          >
            <Link
              to={`/product/${item._id}`}
              style={{ flex: "0 0 80px", marginRight: "1rem" }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "contain",
                  borderRadius: 5,
                  border: "1px solid #ccc",
                }}
              />
            </Link>

            <div style={{ flex: 1 }}>
              <Link
                to={`/product/${item._id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <h4 style={{ margin: 0, fontSize: "1.1rem" }}>{item.title}</h4>
              </Link>
              <p style={{ margin: "5px 0 0 0" }}>
                ${item.price} x {item.qty} = $
                {(item.price * item.qty).toFixed(2)}
              </p>
            </div>

            <button
              onClick={() => handleDeleteItem(item._id)}
              style={{
                backgroundColor: "transparent",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "0.5rem",
                cursor: "pointer",
                marginLeft: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "40px",
                height: "45px",
                transition: "transform 0.2s",
                fontSize: "1.2rem",
              }}
              onMouseOver={(e) => e.target.style.transform = "scale(1.2)"}
              onMouseOut={(e) => e.target.style.transform = "scale(1)"}
              title="Remove from history"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;