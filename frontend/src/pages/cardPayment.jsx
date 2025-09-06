import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import visaImg from "../assets/cardPayment/visa.svg";
import masterImg from "../assets/cardPayment/mastercard.svg";
import cartBg1 from "../assets/cardPayment/cardbg1.png";
import { useCart } from "../context/useCart";
import axios from "axios";

const sanitizeInput = (value) => {
  const temp = document.createElement("div");
  temp.textContent = value;
  return temp.innerHTML;
};

const CardPaymentPage = () => {
  const navigate = useNavigate();
  const { getSelectedSubTotal } = useCart();
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently, user } = useAuth0();

  const [userDetails, setUserDetails] = useState({ nic: "", phone: "", address: "" });
  const [userErrors, setUserErrors] = useState({ nic: "", phone: "", address: "" });
  const [userConfirmed, setUserConfirmed] = useState(false);

  const [card, setCard] = useState({ type: "", number: "", name: "", expiry: "", cvv: "" });
  const [cardErrors, setCardErrors] = useState({ type: "", number: "", name: "", expiry: "", cvv: "" });

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect({ appState: { returnTo: "/card-payment" } });
    }
  }, [isAuthenticated, loginWithRedirect]);

  if (!isAuthenticated) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "1.2rem" }}>Checking authentication...</div>;
  }

  const handleUserChange = (field, value) => {
    const sanitizedValue = sanitizeInput(value);
    setUserDetails({ ...userDetails, [field]: sanitizedValue });
    setUserErrors({ ...userErrors, [field]: "" });
  };

  const validateUser = () => {
    const errs = { nic: "", phone: "", address: "" };
    if (!userDetails.nic) errs.nic = "Enter NIC";
    if (!userDetails.phone || !/^\d{10}$/.test(userDetails.phone)) errs.phone = "Enter valid 10-digit phone number";
    if (!userDetails.address) errs.address = "Enter address";
    return errs;
  };

  const handleConfirmUser = () => {
    const errs = validateUser();
    setUserErrors(errs);
    if (Object.values(errs).some((msg) => msg !== "")) return;
    setUserConfirmed(true);
    alert("User Details Confirmed! You can now fill Card Details.");
  };

  const handleCardChange = (field, value) => {
    let newValue = value.replace(/</g, "&lt;").replace(/>/g, "&gt;"); // simple sanitization

    if (field === "number") {
      newValue = newValue.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})/g, "$1 ").trim();
    }
    if (field === "expiry") {
      newValue = newValue.replace(/\D/g, "").slice(0, 4);
      if (newValue.length >= 2) newValue = newValue.slice(0, 2) + "/" + newValue.slice(2);
    }
    if (field === "cvv") {
      newValue = newValue.replace(/\D/g, "").slice(0, 3);
    }

    setCard({ ...card, [field]: newValue });
    setCardErrors({ ...cardErrors, [field]: "" });
  };

  const handleCardTypeSelect = (type) => {
    setCard({ ...card, type });
    setCardErrors({ ...cardErrors, type: "" });
  };

  const validateCard = () => {
    const errs = { type: "", number: "", name: "", expiry: "", cvv: "" };
    if (!card.type) errs.type = "Select card type";
    if (!card.number || card.number.replace(/\s/g, "").length !== 16) errs.number = "Enter valid 16-digit card number";
    if (!card.name) errs.name = "Enter name on card";
    if (!card.expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry)) errs.expiry = "Enter valid MM/YY";
    if (!card.cvv || !/^\d{3}$/.test(card.cvv)) errs.cvv = "Enter valid 3-digit CVV";
    return errs;
  };

  const handleConfirmPayment = async () => {
    const cardValidationErrors = validateCard();
    setCardErrors(cardValidationErrors);
    if (Object.values(cardValidationErrors).some((msg) => msg !== "")) return;

    const subtotal = getSelectedSubTotal();

    try {
      const token = await getAccessTokenSilently();

      const res = await axios.post(
        "https://localhost:5000/api/orders/card",
        {
          totalAmount: subtotal,
          nic: userDetails.nic,
          phone: userDetails.phone,
          address: userDetails.address,
          cardDetails: {
            type: card.type,
            lastFourDigits: card.number.replace(/\s/g, "").slice(-4),
            nameOnCard: card.name,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        alert("Payment successful!");
        navigate("/success-transaction");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error("Payment error:", err);
      if (err.message.includes("login_required")) {
        loginWithRedirect({ appState: { returnTo: "/card-payment" } });
      } else {
        alert("Payment failed. Please try again.");
      }
    }
  };

  const handleMenuClick = (e) => {
    navigate(`/shop-by-category/${e.key}`);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ width: "100%", background: "#fcf3eeff", padding: "1rem 40px 0 0", boxShadow: "0 2px 8px #f0f1f2" }}>
        <div
          style={{ fontSize: "5rem", fontWeight: "500", fontFamily: "'Baskervville', serif", color: "#9b3803ff", cursor: "pointer", textAlign: "center", marginBottom: "0.5rem" }}
          onClick={() => navigate("/")}
        >
          Bella Vista
        </div>
        <Menu mode="horizontal" style={{ justifyContent: "center", fontSize: "1rem", background: "transparent", gap: "3rem" }} onClick={handleMenuClick}>
          <Menu.Item key="jewelry">Jewelry</Menu.Item>
          <Menu.Item key="watches">Watches</Menu.Item>
          <Menu.Item key="decorations">Decorations</Menu.Item>
          <Menu.Item key="accessories">Accessories</Menu.Item>
        </Menu>
      </div>

      <div
        style={{
          minHeight: "calc(100vh - 200px)",
          backgroundImage: `url(${cartBg1})`,
          padding: "5rem 1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            padding: "1rem",
            border: "1px solid #050505ff",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: "1.5rem",
            textAlign: "center",
            background: "#fff",
            margin: "0 auto 2rem auto",
          }}
        >
          Subtotal: ${getSelectedSubTotal()}
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            display: "flex",
            gap: "6rem",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "flex-start",
            margin: "0 auto",
          }}
        >
          <div style={{ flex: "1 1 400px", maxWidth: "500px", display: "flex", justifyContent: "center" }}>
            <div style={{ width: "100%", padding: "2.5rem 2.2rem", border: "1px solid #ccc", borderRadius: "8px", background: "#fafafa", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <h3 style={{ textAlign: "center", fontWeight: "bold", fontFamily: "'Baskervville', serif", color: "#9b3803ff", marginBottom: "1rem", fontSize: "1.5rem" }}>
                User Details
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {["nic", "phone", "address"].map((field) => (
                  <div key={field} style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ fontWeight: "400", marginBottom: "0.5rem", color: "black" }}>{field.toUpperCase()}</label>
                    {field !== "address" ? (
                      <input type="text" value={userDetails[field]} onChange={(e) => handleUserChange(field, e.target.value)} style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }} />
                    ) : (
                      <textarea value={userDetails[field]} onChange={(e) => handleUserChange(field, e.target.value)} rows={3} style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", resize: "none" }} />
                    )}
                    {userErrors[field] && <p style={{ color: "red", fontSize: "13px", margin: "0.15rem 0 0 0" }}>{userErrors[field]}</p>}
                  </div>
                ))}
                <button onClick={handleConfirmUser} style={{ padding: "12px", background: "#9b3803ff", color: "#fff", border: "none", cursor: "pointer", fontWeight: "bold", borderRadius: "6px", marginTop: "1rem" }}>
                  Confirm User Details
                </button>
              </div>
            </div>
          </div>

          <div style={{ flex: "1 1 400px", maxWidth: "500px", position: "relative", display: "flex", justifyContent: "center" }} onClick={() => !userConfirmed && alert("Please complete the User Details form first")}>
            <div style={{ width: "100%", background: "rgba(255,255,255,0.95)", padding: "2.5rem 2rem", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.3)", display: "flex", flexDirection: "column", gap: "1rem", pointerEvents: userConfirmed ? "auto" : "none", position: "relative" }}>
              {!userConfirmed && <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(200,200,200,0.5)", borderRadius: "10px", zIndex: 5 }} />}
              <h2 style={{ textAlign: "center", fontWeight: "bold", fontFamily: "'Baskervville', serif", color: "#9b3803ff", marginBottom: "1rem", fontSize: "1.5rem" }}>Add Card Details</h2>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", gap: "2rem", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                    <input type="radio" name="cardType" value="visa" checked={card.type === "visa"} onChange={() => handleCardTypeSelect("visa")} />
                    <img src={visaImg} alt="Visa" style={{ height: "30px" }} />
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                    <input type="radio" name="cardType" value="master" checked={card.type === "master"} onChange={() => handleCardTypeSelect("master")} />
                    <img src={masterImg} alt="MasterCard" style={{ height: "30px" }} />
                  </label>
                </div>
                {["number", "name", "expiry", "cvv"].map((field) => (
                  <div key={field} style={{ display: "flex", flexDirection: "column", marginBottom: "0.8rem" }}>
                    <label style={{ fontWeight: "400", marginBottom: "0.5rem", color: "black" }}>{field === "name" ? "Name on Card" : field.toUpperCase()}</label>
                    <input type={field === "cvv" ? "password" : "text"} value={card[field]} onChange={(e) => handleCardChange(field, e.target.value)} style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }} />
                    {cardErrors[field] && <p style={{ color: "red", fontSize: "13px", margin: "0.15rem 0 0 0" }}>{cardErrors[field]}</p>}
                  </div>
                ))}
              </div>

              <button onClick={handleConfirmPayment} style={{ padding: "12px", background: "#171717", color: "#fff", border: "none", cursor: "pointer", fontWeight: "bold", borderRadius: "6px", marginTop: "1rem" }}>
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPaymentPage;
