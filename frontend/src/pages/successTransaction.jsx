import React, { useEffect } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import successGif from "../assets/success.png";
import { useCart } from "../context/useCart"; 

const SuccessTransaction = () => {
  const navigate = useNavigate();
  const { removeSelectedItems, cartItems, addPurchasedItems } = useCart();

  useEffect(() => {
    const purchased = cartItems.filter((item) => item.selected);
    if (purchased.length > 0) {
      addPurchasedItems(purchased);
    }
    removeSelectedItems();

    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", onBackButtonEvent);

    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, []);

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    navigate("/", { replace: true });
  };

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

      <Button
        type="default"
        style={{
          marginTop: "1rem",
          borderRadius: 4,
          padding: "1.2rem 4rem",
          fontSize: "1rem",
          fontWeight: "400",
        }}
        onClick={() => navigate("/purchase-history")}
      >
        View Purchase History
      </Button>
    </div>
  );
};

export default SuccessTransaction;
