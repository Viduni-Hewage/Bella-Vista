import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import cartBg1 from "../assets/cardPayment/cardbg1.png";
import { useCart } from "../context/useCart";
import UserDetails from "../component/userDetails";
import axios from "axios";

const CodPayment = () => {
  const navigate = useNavigate();
  const { getSelectedSubTotal } = useCart();

  const handleConfirmOrder = async (userDetails) => {
  const token = localStorage.getItem("token");
  const subtotal = getSelectedSubTotal();

  if (!token) {
    alert("Please login first!");
    navigate("/login");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:5000/api/orders/cod",
      { 
        totalAmount: subtotal,
        nic: userDetails.nic,
        phone: userDetails.phone,
        address: userDetails.address
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.success) {
      navigate("/success-transaction");
    } else {
      alert(res.data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};


  const handleMenuClick = (e) => {
    navigate(`/shop-by-category/${e.key}`);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ width: "100%", background: "#fcf3eeff", padding: "1rem 40px 0 0", boxShadow: "0 2px 8px #f0f1f2" }}>
        <div
          style={{ fontSize: "5rem", fontWeight: "500", fontFamily: "'Baskervville', serif", color: "#9b3803ff", cursor: "pointer", textAlign: "center", marginBottom: "0.5rem" }}
          onClick={() => navigate("/")}
        >
          Bellavista
        </div>
        <Menu mode="horizontal" style={{ justifyContent: "center", fontSize: "1rem", background: "transparent", gap: "3rem" }} onClick={handleMenuClick}>
          <Menu.Item key="jewelry">Jewelry</Menu.Item>
          <Menu.Item key="watches">Watches</Menu.Item>
          <Menu.Item key="decorations">Decorations</Menu.Item>
          <Menu.Item key="accessories">Accessories</Menu.Item>
        </Menu>
      </div>
      
      <div style={{ 
        minHeight: "calc(100vh - 200px)", 
        backgroundImage: `url(${cartBg1})`, 
        padding: "5rem 1rem", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        flexDirection: "column", 
        gap: "2rem" 
      }}>
        <div style={{
          width: "100%",
          maxWidth: "1200px",
          padding: "1rem",
          border: "1px solid #050505ff",
          borderRadius: "8px",
          fontWeight: "bold",
          fontSize: "1.5rem",
          textAlign: "center",
          background: "#fff",
          margin: "0 auto 2rem auto"
        }}>
          Subtotal: &nbsp;${getSelectedSubTotal()}
        </div>

        <UserDetails onConfirmOrder={handleConfirmOrder} />        
        
          </div>
        </div>   
  );
};

export default CodPayment;