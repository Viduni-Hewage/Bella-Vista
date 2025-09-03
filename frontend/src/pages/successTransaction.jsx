import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import successGif from "../assets/success.png"; 

const SuccessTransaction = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        textAlign: "center",
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
  
      <img
        src={successGif}
        alt="Transaction Successful"
        style={{
          maxWidth: "210px",
          width: "45%",
          marginBottom: "2rem",
        }}
      />

      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", fontFamily: "'Baskervville', serif", color: "#9b3803ff" }}>
        Purchase Successful!
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        Thank you for your purchase. Your transaction was completed successfully.
      </p>

      <Button
        type="primary"
        style={{
          backgroundColor: "#9b3803ff",
          color: "white",
          borderColor: "#fff",
          borderRadius: 4,
          fontWeight: "400",
          padding: "1.3rem 5rem",
          fontSize:"1rem"

        }}
        onClick={() => navigate("/")}
      >
        Back Home
      </Button>
    </div>
  );
};

export default SuccessTransaction;

