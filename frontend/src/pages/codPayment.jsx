import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
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

const CodPayment = () => {
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

  const [errors, setErrors] = useState({
    nic: "",
    phone: "",
    address: "",
    deliveryDate: "",
    deliveryTime: "",
    deliveryLocation: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect({ appState: { returnTo: "/cod-payment" } });
    }
  }, [isAuthenticated, loginWithRedirect]);

  if (!isAuthenticated) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "1.2rem",
      }}>
        Checking authentication...
      </div>
    );
  }

  const handleInputChange = (field, value) => {
    setUserDetails({ ...userDetails, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validateUser = () => {
    const errs = {
      nic: "",
      phone: "",
      address: "",
      deliveryDate: "",
      deliveryTime: "",
      deliveryLocation: "",
    };

    if (!userDetails.nic || !/^([0-9]{9}[vVxX]|[0-9]{12})$/.test(userDetails.nic)) errs.nic = "Enter valid NIC (9 digits + V/X or 12 digits)";
    if (!userDetails.phone || !/^\d{10}$/.test(userDetails.phone)) errs.phone = "Enter valid 10-digit phone number";
    if (!userDetails.address || userDetails.address.length > 200) errs.address = "Enter valid address (max 200 chars)";
    if (!userDetails.deliveryDate) errs.deliveryDate = "Please select a delivery date";
    if (!userDetails.deliveryTime) errs.deliveryTime = "Please select a delivery time";
    if (!userDetails.deliveryLocation) errs.deliveryLocation = "Please select a delivery location";

    return errs;
  };

  const handleConfirmOrder = async () => {
    const errs = validateUser();
    setErrors(errs);
    const hasErrors = Object.values(errs).some((msg) => msg !== "");
    if (hasErrors) return;

    const subtotal = getSelectedSubTotal();

    const safeNIC = sanitizeInput(userDetails.nic);
    const safePhone = sanitizeInput(userDetails.phone);
    const safeAddress = sanitizeInput(userDetails.address);
    const safeDeliveryDate = sanitizeInput(userDetails.deliveryDate);
    const safeDeliveryTime = sanitizeInput(userDetails.deliveryTime);
    const safeDeliveryLocation = sanitizeInput(userDetails.deliveryLocation);

    try {
      const token = await getAccessTokenSilently();
      const res = await axios.post(
        "https://localhost:5000/api/orders/cod",
        {
          totalAmount: subtotal,
          nic: safeNIC,
          phone: safePhone,
          address: safeAddress,
          deliveryDate: safeDeliveryDate,
          deliveryTime: safeDeliveryTime,
          deliveryLocation: safeDeliveryLocation,
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
      console.error("Order error:", err.response?.data || err.message);
      if (err.message.includes("login_required")) {
        loginWithRedirect({ appState: { returnTo: "/cod-payment" } });
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  const handleMenuClick = (e) => {
    navigate(`/shop-by-category/${e.key}`);
  };

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
          Subtotal: &nbsp;${getSelectedSubTotal()}
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            padding: "2rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            background: "#fafafa",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <h3 style={{ textAlign: "center", fontWeight: "bold", marginBottom: "1rem" }}>User & Delivery Details</h3>

          <div style={fieldContainerStyle}>
            <label style={labelStyle}>NIC</label>
            <input
              type="text"
              value={userDetails.nic}
              onChange={(e) => handleInputChange("nic", e.target.value)}
              placeholder="Enter your NIC"
              style={inputStyle}
            />
            {errors.nic && <p style={errorStyle}>{errors.nic}</p>}
          </div>

          <div style={fieldContainerStyle}>
            <label style={labelStyle}>Phone Number</label>
            <input
              type="text"
              value={userDetails.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="Enter your phone number"
              style={inputStyle}
            />
            {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
          </div>

          <div style={fieldContainerStyle}>
            <label style={labelStyle}>Address</label>
            <textarea
              value={userDetails.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              rows={3}
              style={{ ...inputStyle, resize: "none" }}
              placeholder="Enter your address"
            />
            {errors.address && <p style={errorStyle}>{errors.address}</p>}
          </div>

          <div style={fieldContainerStyle}>
            <label style={labelStyle}>Delivery Date</label>
            <input
              type="date"
              value={userDetails.deliveryDate}
              onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
              style={inputStyle}
              min={new Date().toISOString().split("T")[0]}
            />
            {errors.deliveryDate && <p style={errorStyle}>{errors.deliveryDate}</p>}
          </div>

          <div style={fieldContainerStyle}>
            <label style={labelStyle}>Delivery Time</label>
            <select
              value={userDetails.deliveryTime}
              onChange={(e) => handleInputChange("deliveryTime", e.target.value)}
              style={inputStyle}
            >
              <option value="">Select Time</option>
              <option value="10 AM">10 AM</option>
              <option value="11 AM">11 AM</option>
              <option value="12 PM">12 PM</option>
            </select>
            {errors.deliveryTime && <p style={errorStyle}>{errors.deliveryTime}</p>}
          </div>

          <div style={fieldContainerStyle}>
            <label style={labelStyle}>Delivery Location</label>
            <select
              value={userDetails.deliveryLocation}
              onChange={(e) => handleInputChange("deliveryLocation", e.target.value)}
              style={inputStyle}
            >
              <option value="">Select District</option>
              <option value="Colombo">Colombo</option>
              <option value="Gampaha">Gampaha</option>
              <option value="Kandy">Kandy</option>
              <option value="Kurunegala">Kurunegala</option>
              <option value="Galle">Galle</option>
            </select>
            {errors.deliveryLocation && <p style={errorStyle}>{errors.deliveryLocation}</p>}
          </div>

          <button
            onClick={handleConfirmOrder}
            style={{
              padding: "12px",
              background: "#171717",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              borderRadius: "6px",
              marginTop: "1rem",
            }}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodPayment;

