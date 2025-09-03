import React from "react";
import {Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";
import jewelryBg from "../../assets/category/cat2.jpg";

const Watches = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        maxHeight: "40vh",
        backgroundImage: `url(${jewelryBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >

      <div
        style={{
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "0.5rem",
          padding: "1.9rem 2rem 2.3rem 2rem",
          maxWidth:"45vw"
        }}
      >
        <Breadcrumb
          style={{ color: "#fff", paddingBottom:"1rem" }}
          separator={<span style={{ color: "#fff" }}> / </span>}
          items={[
            {
              title: <span style={{ cursor: "pointer", color: "#fff"  }} onClick={() => navigate("/")}>Home</span>,
            },
            {
              title: <span style={{ cursor: "pointer", color: "#fff"  }} onClick={() => navigate("/shop-by-category/watches")}>Watches</span>,
            },
          ]}
        />

        <h1 style={{ fontSize: "2rem", fontFamily: "'Baskervville', serif" }}>
          Timeless and Elegant Watches Collection for Every Occasion
        </h1>

        <p style={{ fontSize: "0.9rem", lineHeight: "1.3", margin: 0 }}>
          Explore our curated watch collection, designed for those who value style and precision. From sleek modern designs to timeless classics, each watch impresses while keeping perfect time. Ideal for everyday wear or special occasions, these watches elevate your look and make a statement.
        </p>
      </div>

    </div>
  );
};

export default Watches;
