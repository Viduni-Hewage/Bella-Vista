import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import errorImage from "../assets/error/404.jpg";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        padding: "1rem",
        boxSizing: "border-box",
        flexDirection: "column",
        textAlign: "center",
      }}
    >

      <img
        src={errorImage}
        alt="404 Not Found"
        style={{
          maxWidth: "300px",
          width: "50%",
          marginBottom: "2rem",
        }}
      />

      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>404</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        Sorry, the page you visited does not exist.
      </p>
      <Button
        type="primary"
        style={{ backgroundColor: "#9b3803", borderColor: "#9b3803" }}
        onClick={() => navigate("/")}
      >
        Back Home
      </Button>
    </div>
  );
};

export default ErrorPage;
