import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import WebHeader from "../component/header";
import WebFooter from "../component/footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

const onFinishFailed = (errorInfo) => { 
    console.log("Failed:", errorInfo); 
};

const SignUp = () => {
    const navigate = useNavigate();
    const [showHeader, setShowHeader] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
          const scrollY = window.scrollY;
          setShowHeader(scrollY > 200);
    };
    
    window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    
    const onFinish = async (values) => {
        console.log("Raw form values:", values); // Debug: see all form data
        
        const { name, email, password } = values;

        console.log("Extracted values:", { name, email, password }); // Debug log
        console.log("Data types:", { 
            nameType: typeof name, 
            emailType: typeof email, 
            passwordType: typeof password 
        });

        if (!email || !password) {
            console.error("Missing required fields:", { email: !!email, password: !!password });
            message.error("Please fill all required fields");
            return;
        }

        const requestData = { name, email, password };
        console.log("Request data to send:", requestData);

        try {
            console.log("Making API call to:", "https://localhost:5000/api/auth/register");
            
            const res = await axios.post("https://localhost:5000/api/auth/register", requestData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log("API Response:", res.data);

            message.success(res.data.message || "User registered successfully");

            navigate("/login");
        } catch (err) {
            console.error("Full error object:", err); 
            console.error("Error response:", err.response);
            console.error("Error response data:", err.response?.data); 
            console.error("Error status:", err.response?.status); 
            
            const errorMessage = err.response?.data?.message || "Registration failed";
            message.error(errorMessage);
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
                    marginTop: "-3rem",
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
                    Create your account
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
                    style={{ marginBottom: "1.5rem" }}
                    name="name"
                    rules={[
                        { required: true, message: "* Please enter the name" },
                        { type: "string", message: "* Please enter a valid name" },
                    ]}
                    >
                    <Input
                        placeholder="Username"
                        style={{
                        width: "100%",
                        fontSize: "1rem",
                        padding: "0.5rem",
                        color: "#000",
                        borderRadius: "0",
                        }}
                    />
                    </Form.Item>
                    <Form.Item
                    style={{ marginBottom: "1.5rem" }}
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
                        padding: "0.5rem",
                        color: "#000",
                        borderRadius: "0",
                        }}
                    />
                    </Form.Item>

                    <Form.Item
                    style={{ marginBottom: "1.5rem" }}
                    name="password"
                    rules={[{ required: true, message: "* Please enter the password" }]}
                    >
                    <Input.Password
                        placeholder="Password"
                        style={{
                        width: "100%",
                        fontSize: "1rem",
                        padding: "0.5rem",
                        color: "#000",
                        borderRadius: "0",
                        }}
                    />
                    </Form.Item>

                    <Form.Item
                    style={{ marginBottom: "1.5rem" }}
                    name="confirmpassword"
                    rules={[{ required: true, message: "* Please confirm the password" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                                }
                                return Promise.reject(new Error('Passwords do not match!'));
                            },
                        }),
                    ]}
                    >
                    <Input.Password
                        placeholder="Confirm Password"
                        style={{
                        width: "100%",
                        fontSize: "1rem",
                        padding: "0.5rem",
                        color: "#000",
                        borderRadius: "0",
                        }}
                    />
                    </Form.Item>

                    <Form.Item style={{ marginTop: "2rem" }}>
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

                    <div style={{ textAlign: "center", marginTop: "1rem" }}>
                    <span style={{ fontSize: "1rem", color: "#474747ff" }}>
                        Already have an account?{" "}
                        <span
                        style={{
                            color: "#9b3803ff",
                            fontWeight: "600",
                            cursor: "pointer",
                        }}
                        onClick={() => navigate("/login")}
                        >
                        Sign in
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

export default SignUp;