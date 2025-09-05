import React, { useState } from "react";

const UserDetails = ({ onConfirmOrder }) => { 

  const [user, setUser] = useState({ nic: "", phone: "", address: "" });
  const [errors, setErrors] = useState({ nic: "", phone: "", address: "" });

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

  const handleChange = (field, value) => {
    setUser({ ...user, [field]: value });
    setErrors({ ...errors, [field]: "" }); 
  };

  const validate = () => {
    const newErrors = { nic: "", phone: "", address: "" };
    let isValid = true;

    if (!user.nic.trim()) {
      newErrors.nic = "NIC is required";
      isValid = false;
    } else if (!/^[0-9Vv]{10,12}$/.test(user.nic.trim())) {
      newErrors.nic = "Enter valid NIC (10-12 characters)";
      isValid = false;
    }

    if (!user.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(user.phone.trim())) {
      newErrors.phone = "Enter valid 10-digit phone number";
      isValid = false;
    }

    if (!user.address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleConfirmClick = () => {
    if (validate()) {
      onConfirmOrder(user); 
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        padding: "2.5rem 2.2rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        background: "#fafafa",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
      }}
    >
      <h3
        style={{
          textAlign: "center", 
          fontWeight: "bold", 
          fontFamily: "'Baskervville', serif",  
          color: "#9b3803ff", 
          marginBottom: "1rem",
          fontSize:"1.5rem"
        }}
      >
        User Details
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>NIC</label>
          <input
            type="text"
            placeholder="Enter your NIC"
            style={inputStyle}
            value={user.nic}
            onChange={(e) => handleChange("nic", e.target.value)}
          />
          {errors.nic && <p style={errorStyle}>{errors.nic}</p>}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>Phone Number</label>
          <input
            type="text"
            placeholder="Enter your phone number"
            style={inputStyle}
            value={user.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>Address</label>
          <textarea
            placeholder="Enter your address"
            rows={3}
            style={{ ...inputStyle, resize: "none" }}
            value={user.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
          {errors.address && <p style={errorStyle}>{errors.address}</p>}
        </div>

        <button
          onClick={handleConfirmClick}
          style={{
            padding: "12px",
            background: "#9b3803ff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            borderRadius: "6px",
            marginTop: "2rem"
          }}
        >
          Confirm the Order
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
