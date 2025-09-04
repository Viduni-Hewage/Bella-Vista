import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import visaImg from "../assets/cardPayment/visa.svg";
import masterImg from "../assets/cardPayment/mastercard.svg";
import cartBg1 from "../assets/cardPayment/cardbg1.png";

const CardPaymentPage = () => {
  const navigate = useNavigate();
  const [card, setCard] = useState({ type: "", number: "", name: "", expiry: "", cvv: "" });
  const [errors, setErrors] = useState({ type: "", number: "", name: "", expiry: "", cvv: "" });

  const totalAmount = 149.99; 

  const handleCardChange = (field, value) => {
    let newValue = value;
    if (field === "number") {
      newValue = value.replace(/\D/g, "").slice(0, 16);
      newValue = newValue.replace(/(\d{4})/g, "$1 ").trim();
    }
    setCard({ ...card, [field]: newValue });
    setErrors({ ...errors, [field]: "" });
  };

  const handleCardTypeSelect = (type) => {
    setCard({ ...card, type });
    setErrors({ ...errors, type: "" });
  };

  const validateCard = () => {
    const errs = { type: "", number: "", name: "", expiry: "", cvv: "" };
    if (!card.type) errs.type = "Select card type";
    if (!card.number || card.number.replace(/\s/g, "").length !== 16)
      errs.number = "Enter valid 16-digit card number";
    if (!card.name) errs.name = "Enter name on card";
    if (!card.expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry))
      errs.expiry = "Enter valid MM/YY";
    if (!card.cvv || !/^\d{3}$/.test(card.cvv)) errs.cvv = "Enter valid 3-digit CVV";
    return errs;
  };

  const handleConfirmPayment = () => {
    const newErrors = validateCard();
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((msg) => msg !== "");
    if (hasErrors) return;
    navigate("/success-transaction");
  };

  const handleMenuClick = (e) => {
    navigate(`/shop-by-category/${e.key}`);
  };

  // Consistent styles
  const labelStyle = {
    fontWeight: "400",
    marginBottom: "0.5rem",
    color: "black"
  };

  const inputStyle = {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px"
  };

  const errorStyle = {
    color: "red",
    fontSize: "13px",
    margin: "0.15rem 0 0 0"
  };

  const fieldContainerStyle = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "0.8rem"
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          width: "100%", 
          background: "#fcf3eeff", 
          padding: "1rem 40px 0 0", 
          boxShadow: "0 2px 8px #f0f1f2"
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
            marginBottom: "0.5rem" 
          }}
          onClick={() => navigate("/")}
        >
          Bellavista
        </div>

        <Menu
          mode="horizontal"
          style={{ 
            justifyContent: "center", 
            fontSize: "1rem", 
            background: "transparent", 
            gap: "3rem" 
          }}
          onClick={handleMenuClick}
        >
          <Menu.Item key="jewelry">Jewelry</Menu.Item>
          <Menu.Item key="watches">Watches</Menu.Item>
          <Menu.Item key="decorations">Decorations</Menu.Item>
          <Menu.Item key="accessories">Accessories</Menu.Item>
        </Menu>
      </div>

      {/* Main Content */}
      <div
        style={{
          minHeight: "calc(100vh - 200px)",
          backgroundImage: `url(${cartBg1})`,
          padding: "3rem 1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            background: "rgba(255,255,255,0.95)",
            padding: "2.5rem 2rem",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <h2 style={{ 
            textAlign: "center", 
            fontWeight: "bold", 
            fontFamily: "'Baskervville', serif",  
            color: "#9b3803ff", 
            paddingBottom: "0rem",
            marginBottom: "1rem"
          }}>
            Add Card Details
          </h2>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Card Type Section */}
            <div style={fieldContainerStyle}>
              <label style={labelStyle}>Card Type</label>
              <div style={{ display: "flex", gap: "3rem", alignItems: "center", marginLeft: "1rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input 
                    type="radio" 
                    name="cardType" 
                    value="visa" 
                    checked={card.type === "visa"} 
                    onChange={() => handleCardTypeSelect("visa")} 
                  />
                  <img src={visaImg} alt="Visa" style={{ height: "30px" }} />
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input 
                    type="radio" 
                    name="cardType" 
                    value="master" 
                    checked={card.type === "master"} 
                    onChange={() => handleCardTypeSelect("master")} 
                  />
                  <img src={masterImg} alt="MasterCard" style={{ height: "30px" }} />
                </label>
              </div>
              {errors.type && <p style={errorStyle}>{errors.type}</p>}
            </div>

            {/* Card Number */}
            <div style={fieldContainerStyle}>
              <label style={labelStyle}>Card Number</label>
              <input 
                type="text" 
                value={card.number} 
                onChange={(e) => handleCardChange("number", e.target.value)} 
                placeholder="XXXX XXXX XXXX XXXX" 
                style={inputStyle} 
              />
              {errors.number && <p style={errorStyle}>{errors.number}</p>}
            </div>

            {/* Name on Card */}
            <div style={fieldContainerStyle}>
              <label style={labelStyle}>Name on Card</label>
              <input 
                type="text" 
                value={card.name} 
                onChange={(e) => handleCardChange("name", e.target.value)} 
                placeholder="Ex: John Doe" 
                style={inputStyle} 
              />
              {errors.name && <p style={errorStyle}>{errors.name}</p>}
            </div>

            {/* Expiry Date */}
            <div style={fieldContainerStyle}>
              <label style={labelStyle}>Expiry Date (MM/YY)</label>
              <input 
                type="text" 
                value={card.expiry} 
                onChange={(e) => handleCardChange("expiry", e.target.value)} 
                placeholder="MM/YY" 
                style={inputStyle} 
              />
              {errors.expiry && <p style={errorStyle}>{errors.expiry}</p>}
            </div>

            {/* CVV */}
            <div style={fieldContainerStyle}>
              <label style={labelStyle}>CVV</label>
              <input 
                type="password" 
                value={card.cvv} 
                onChange={(e) => handleCardChange("cvv", e.target.value)} 
                placeholder="123" 
                style={inputStyle} 
              />
              {errors.cvv && <p style={errorStyle}>{errors.cvv}</p>}
            </div>
          </div>

          <div style={{ 
            padding: "1rem", 
            border: "1px solid #ccc", 
            borderRadius: "8px", 
            fontWeight: "bold", 
            textAlign: "center",
            marginTop: "1rem"
          }}>
            Subtotal: ${totalAmount.toFixed(2)}
          </div>

          <button
            onClick={handleConfirmPayment}
            style={{
              padding: "12px",
              background: "#171717",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              borderRadius: "6px",
              marginTop: "1rem"
            }}
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPaymentPage;