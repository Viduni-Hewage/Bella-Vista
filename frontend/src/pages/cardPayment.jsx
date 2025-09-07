import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import visaImg from "../assets/cardPayment/visa.svg";
import masterImg from "../assets/cardPayment/mastercard.svg";
import cartBg1 from "../assets/cardPayment/cardbg1.png";
import { useCart } from "../context/useCart";
import axios from "axios";

const sanitizeInput = (str) => {
  if (!str) return "";
  return str.replace(/[&<>"'`=/]/g, (s) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
      "/": "&#x2F;",
      "=": "&#x3D;",
      "`": "&#x60;",
    };
    return map[s];
  });
};

const CardPaymentPage = () => {
  const navigate = useNavigate();
  const { getSelectedSubTotal } = useCart();
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();

  const [userDetails, setUserDetails] = useState({
    nic: "",
    phone: "",
    address: "",
    deliveryDate: "",
    deliveryTime: "",
    deliveryLocation: "",
  });

  const [errors, setErrors] = useState({});
  const [userConfirmed, setUserConfirmed] = useState(false);

  const [cardDetails, setCardDetails] = useState({
    type: "",
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [cardErrors, setCardErrors] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect({ appState: { returnTo: "/card-payment" } });
    }
  }, [isAuthenticated, loginWithRedirect]);

  if (!isAuthenticated) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.2rem",
        }}
      >
        Checking authentication...
      </div>
    );
  }

  const handleUserInputChange = (field, value) => {
    setUserDetails({ ...userDetails, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validateUser = () => {
    const errs = {};
    if (!userDetails.nic || !/^([0-9]{9}[vVxX]|[0-9]{12})$/.test(userDetails.nic))
      errs.nic = "Enter valid NIC (9 digits + V/X or 12 digits)";
    if (!userDetails.phone || !/^\d{10}$/.test(userDetails.phone)) errs.phone = "Enter valid 10-digit phone number";
    if (!userDetails.address || userDetails.address.length > 200) errs.address = "Enter valid address (max 200 chars)";
    if (!userDetails.deliveryDate) errs.deliveryDate = "Please select a delivery date";
    if (!userDetails.deliveryTime) errs.deliveryTime = "Please select a delivery time";
    if (!userDetails.deliveryLocation) errs.deliveryLocation = "Please select a delivery location";
    return errs;
  };

  const handleConfirmUser = () => {
    const errs = validateUser();
    setErrors(errs);
    const hasErrors = Object.values(errs).some((msg) => msg !== "");
    if (hasErrors) return;
    setUserConfirmed(true);
    alert("User details confirmed! Now you can fill in card details.");
  };

  const handleCardInputChange = (field, value) => {
    let newValue = sanitizeInput(value);
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
    setCardDetails({ ...cardDetails, [field]: newValue });
    setCardErrors({ ...cardErrors, [field]: "" });
  };

  const handleCardTypeSelect = (type) => {
    setCardDetails({ ...cardDetails, type });
    setCardErrors({ ...cardErrors, type: "" });
  };

  const validateCard = () => {
    const errs = {};
    if (!cardDetails.type) errs.type = "Select card type";
    if (!cardDetails.number || cardDetails.number.replace(/\s/g, "").length !== 16) errs.number = "Enter valid 16-digit card number";
    if (!cardDetails.name) errs.name = "Enter name on card";
    if (!cardDetails.expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry)) errs.expiry = "Enter valid MM/YY";
    if (!cardDetails.cvv || !/^\d{3}$/.test(cardDetails.cvv)) errs.cvv = "Enter valid 3-digit CVV";
    return errs;
  };

  const handleConfirmPayment = async () => {
    const errs = validateCard();
    setCardErrors(errs);
    const hasErrors = Object.values(errs).some((msg) => msg !== "");
    if (hasErrors) return;

    const subtotal = getSelectedSubTotal();
    try {
      const token = await getAccessTokenSilently();
      const res = await axios.post(
        "https://localhost:5000/api/orders/card",
        {
          totalAmount: subtotal,
          ...userDetails,
          card: {
            type: cardDetails.type,
            number: cardDetails.number.replace(/\s/g, "").slice(-4),
            name: cardDetails.name,
          },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        alert("Payment successful!");
        navigate("/success-transaction");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Payment failed. Try again.");
    }
  };

  const handleMenuClick = (e) => navigate(`/shop-by-category/${e.key}`);

  const labelStyle = { fontWeight: "400", marginBottom: "0.5rem", color: "black" };
  const inputStyle = { padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" };
  const errorStyle = { color: "red", fontSize: "13px", margin: "0.15rem 0 0 0" };
  const fieldContainerStyle = { display: "flex", flexDirection: "column", marginBottom: "0.8rem" };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ width: "100%", background: "#fcf3eeff", padding: "1rem 40px 0 0", boxShadow: "0 2px 8px #f0f1f2" }}>
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
          style={{ justifyContent: "center", fontSize: "1rem", background: "transparent", gap: "3rem" }}
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
            display: "flex",
            flexWrap: "wrap",
            gap: "3rem",
            justifyContent: "center",
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          <div style={{ flex: "1 1 400px", maxWidth: "500px" }}>
            <div style={{ width: "100%", padding: "2rem", border: "1px solid #ccc", borderRadius: "8px", background: "#fafafa", display: "flex", flexDirection: "column" }}>
              <h3 style={{ textAlign: "center", fontWeight: "bold", marginBottom: "1rem" }}>User & Delivery Details</h3>

              <div style={fieldContainerStyle}>
                <label style={labelStyle}>NIC</label>
                <input type="text" style={inputStyle} placeholder="Enter your NIC" value={userDetails.nic} onChange={(e) => handleUserInputChange("nic", e.target.value)} />
                {errors.nic && <p style={errorStyle}>{errors.nic}</p>}
              </div>

              <div style={fieldContainerStyle}>
                <label style={labelStyle}>Phone</label>
                <input type="text" style={inputStyle} placeholder="Enter your phone" value={userDetails.phone} onChange={(e) => handleUserInputChange("phone", e.target.value)} />
                {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
              </div>

              <div style={fieldContainerStyle}>
                <label style={labelStyle}>Address</label>
                <textarea style={{ ...inputStyle, resize: "none" }} rows={3} placeholder="Enter address" value={userDetails.address} onChange={(e) => handleUserInputChange("address", e.target.value)} />
                {errors.address && <p style={errorStyle}>{errors.address}</p>}
              </div>

              <div style={fieldContainerStyle}>
                <label style={labelStyle}>Delivery Date</label>
                <input type="date" style={inputStyle} value={userDetails.deliveryDate} onChange={(e) => handleUserInputChange("deliveryDate", e.target.value)} min={new Date().toISOString().split("T")[0]} />
                {errors.deliveryDate && <p style={errorStyle}>{errors.deliveryDate}</p>}
              </div>

              <div style={fieldContainerStyle}>
                <label style={labelStyle}>Delivery Time</label>
                <select style={inputStyle} value={userDetails.deliveryTime} onChange={(e) => handleUserInputChange("deliveryTime", e.target.value)}>
                  <option value="">Select Time</option>
                  <option value="10 AM">10 AM</option>
                  <option value="11 AM">11 AM</option>
                  <option value="12 PM">12 PM</option>
                </select>
                {errors.deliveryTime && <p style={errorStyle}>{errors.deliveryTime}</p>}
              </div>

              <div style={fieldContainerStyle}>
                <label style={labelStyle}>Delivery Location</label>
                <select style={inputStyle} value={userDetails.deliveryLocation} onChange={(e) => handleUserInputChange("deliveryLocation", e.target.value)}>
                  <option value="">Select District</option>
                  <option value="Colombo">Colombo</option>
                  <option value="Gampaha">Gampaha</option>
                  <option value="Kandy">Kandy</option>
                  <option value="Kurunegala">Kurunegala</option>
                  <option value="Galle">Galle</option>
                </select>
                {errors.deliveryLocation && <p style={errorStyle}>{errors.deliveryLocation}</p>}
              </div>

              <button onClick={handleConfirmUser} style={{ padding: "12px", background: "#171717", color: "#fff", border: "none", cursor: "pointer", fontWeight: "bold", borderRadius: "6px", marginTop: "1rem" }}>
                Confirm Details
              </button>
            </div>
          </div>

          <div style={{ flex: "1 1 400px", maxWidth: "500px", position: "relative" }}>
            <div style={{ width: "100%", padding: "2rem", border: "1px solid #ccc", borderRadius: "8px", background: "#fafafa", display: "flex", flexDirection: "column", position: "relative" }}>
              <h3 style={{ textAlign: "center", fontWeight: "bold", marginBottom: "1rem" }}>Card Details</h3>

              <div style={{ display: "flex", gap: "1rem" }}>
                <img src={visaImg} alt="Visa" onClick={() => handleCardTypeSelect("Visa")} style={{ cursor: "pointer", width: "60px", border: cardDetails.type === "Visa" ? "2px solid #9b3803ff" : "1px solid #ccc", borderRadius: "4px", padding: "2px" }} />
                <img src={masterImg} alt="Mastercard" onClick={() => handleCardTypeSelect("Mastercard")} style={{ cursor: "pointer", width: "60px", border: cardDetails.type === "Mastercard" ? "2px solid #9b3803ff" : "1px solid #ccc", borderRadius: "4px", padding: "2px" }} />
              </div>
              {cardErrors.type && <p style={errorStyle}>{cardErrors.type}</p>}

              <input type="text" style={inputStyle} placeholder="Card Number" value={cardDetails.number} onChange={(e) => handleCardInputChange("number", e.target.value)} />
              {cardErrors.number && <p style={errorStyle}>{cardErrors.number}</p>}

              <input type="text" style={inputStyle} placeholder="Name on Card" value={cardDetails.name} onChange={(e) => handleCardInputChange("name", e.target.value)} />
              {cardErrors.name && <p style={errorStyle}>{cardErrors.name}</p>}

              <div style={{ display: "flex", gap: "1rem" }}>
                <input type="text" style={{ ...inputStyle, flex: 1 }} placeholder="Expiry MM/YY" value={cardDetails.expiry} onChange={(e) => handleCardInputChange("expiry", e.target.value)} />
                <input type="text" style={{ ...inputStyle, flex: 1 }} placeholder="CVV" value={cardDetails.cvv} onChange={(e) => handleCardInputChange("cvv", e.target.value)} />
              </div>
              {cardErrors.expiry && <p style={errorStyle}>{cardErrors.expiry}</p>}
              {cardErrors.cvv && <p style={errorStyle}>{cardErrors.cvv}</p>}

              <button onClick={handleConfirmPayment} style={{ padding: "12px", background: "#171717", color: "#fff", border: "none", cursor: "pointer", fontWeight: "bold", borderRadius: "6px", marginTop: "1rem" }}>
                Confirm Payment
              </button>

              {!userConfirmed && (
                <div
                  onClick={() => alert("Please fill and confirm your user details first!")}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(255,255,255,0.6)",
                    cursor: "not-allowed",
                    borderRadius: "8px",
                    zIndex: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                ></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPaymentPage;