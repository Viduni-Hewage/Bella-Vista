import React from "react";
import { useCart } from "../context/useCart";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "antd";

const HistoryPage = () => {
  const { purchasedItems } = useCart();
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    navigate(`/shop-by-category/${e.key}`);
  };


  if (purchasedItems.length === 0)
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>No purchase history yet.</p>;

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

      <div>
        <h3
        style={{
          textAlign: "left", 
          fontWeight: "bold", 
          fontFamily: "'Baskervville', serif",  
          color: "#9b3803ff", 
          margin: "4rem 6rem 3rem 6rem",
          fontSize:"1.7rem"
        }}
      >
        Purchase History
      </h3>
      </div>

      <div style={{ maxWidth: "1300px", margin: "2rem auto" }}>
      {purchasedItems.map(item => (
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
          <Link to={`/product/${item._id}`} style={{ flex: "0 0 80px", marginRight: "1rem" }}>
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
            <Link to={`/product/${item._id}`} style={{ textDecoration: "none", color: "black" }}>
              <h4 style={{ margin: 0, fontSize: "1.1rem" }}>{item.title}</h4>
            </Link>
            <p style={{ margin: "5px 0 0 0" }}>
              ${item.price} x {item.qty} = ${(item.price * item.qty).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default HistoryPage;



