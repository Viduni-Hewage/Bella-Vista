import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import WebHeader from "../component/header";
import WebFooter from "../component/footer";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showHeader, setShowHeader] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
          const scrollY = window.scrollY;
          setShowHeader(scrollY > 200);
    };
    
    window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

     const handleLoginSuccess = (token) => {
        localStorage.setItem("token", token);

        if (location.state?.fromCart) {
        if (location.state.paymentMethod === "cod") {
            navigate("/success-transaction");
        } else if (location.state.paymentMethod === "card") {
            navigate("/card-payment");
        } else {
            navigate("/cart");
        }
        } else {
        navigate("/");
        }
    };

    const onFinish = async (values) => {
        const { email, password } = values;

        try {
        const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
        message.success(res.data.message || "Login successful");

        handleLoginSuccess(res.data.token);
        } catch (err) {
        message.error(err.response?.data?.message || "Login failed");
        }
    };

    return(
        <div>
            <div
                style={{
                backgroundColor: "#fcf3eeff",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                }}
            >

            <WebHeader visible={showHeader} />

            <div
                style={{
                    textAlign: "center",
                    marginBottom: "1rem",
                    marginTop: "-4rem",
                }}
                >
                <h1
                    style={{
                    fontSize: "7rem",
                    fontWeight: "500",
                    fontFamily: "'Baskervville', serif",
                    color: "#9b3803ff",
                    marginBottom: "2rem",
                    cursor: "pointer",
                    }}
                    onClick={() => navigate("/")}
                >
                    BELLA VISTA
                </h1>

                <div
                    style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: "1.5rem",
                    marginTop: "-2rem",
                    }}
                >
                    {[
                    "Jewelry",
                    "Watches",
                    "Decorations",
                    "Accessories",
                    "News",
                    "World of BellaVista",
                    ].map((item, index) => (
                    <Button
                        key={index}
                        type="text"
                        style={{
                        fontSize: "1rem",
                        fontWeight: "400",
                        color: "#333",
                        padding: 0,

                        }}

                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#000";
                            e.currentTarget.style.fontSize = "1.1rem";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#333";
                            e.currentTarget.style.fontSize = "1rem";
                        }}
                    >
                        {item}
                    </Button>
                    ))}
                </div>
                </div>

                <div
                style={{
                    marginTop: "3rem",
                    background: "#fff",
                    padding: "1.5rem 2rem",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    width: "90vw",
                    borderRadius: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                >
                <div
                    style={{
                    width: "70%",
                    maxWidth: "800px",
                    minWidth: "250px",
                    textAlign: "center",
                    marginBottom: "2rem",
                    }}
                >
                    <h2
                    style={{
                        fontSize: "1.5rem",
                        fontWeight: "normal",
                        color: "#333",
                        margin: "0",
                        fontFamily: "'Poppins', serif",
                    }}
                    >
                    Login to your account
                    </h2>
                </div>

                <Form
                    name="basic"
                    layout="vertical"
                    style={{
                    width: "40%",
                    maxWidth: "800px",
                    minWidth: "250px",
                    }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                    style={{ marginBottom: "2rem" }}
                    name="email"
                    rules={[
                        { required: true, message: "* Please enter the email" },
                        { type: "email", message: "* Please enter a valid email" },
                    ]}
                    >
                    <Input
                        placeholder="Email"
                        style={{
                        width: "100%",
                        fontSize: "1rem",
                        padding: "0.6rem",
                        color: "#000",
                        borderRadius: "0",
                        }}
                    />
                    </Form.Item>

                    <Form.Item
                    style={{ marginBottom: "2rem" }}
                    name="password"
                    rules={[{ required: true, message: "* Please enter the password" }]}
                    >
                    <Input.Password
                        placeholder="Password"
                        style={{
                        width: "100%",
                        fontSize: "1rem",
                        padding: "0.6rem",
                        color: "#000",
                        borderRadius: "0",
                        }}
                    />
                    </Form.Item>

                    <Form.Item style={{ marginTop: "3rem" }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                        backgroundColor: "black",
                        fontWeight: "500",
                        padding: "1.2rem 0",
                        width: "100%",
                        fontSize: "1rem",
                        borderRadius: "0",
                        }}
                    >
                        Submit
                    </Button>
                    </Form.Item>

                    <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                    <span style={{ fontSize: "1rem", color: "#474747ff" }}>
                        Don't have an account?{" "}
                        <span
                        style={{
                            color: "#9b3803ff",
                            fontWeight: "600",
                            cursor: "pointer",
                        }}
                        onClick={() => navigate("/sign-up")}
                        >
                        Sign up
                        </span>
                    </span>
                    </div>
                </Form>
                </div>

                <style>
                {`
                    @media (max-width: 1024px) {
                    .ant-form {
                        width: 80% !important;
                    }
                    }
                    @media (max-width: 768px) {
                    .ant-form {
                        width: 90% !important;
                    }
                    }
                `}
                </style>
            </div>
            <WebFooter/>
        </div>    
    );
}

export default Login;
