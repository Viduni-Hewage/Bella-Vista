import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../component/cartItem";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { useCart } from "../context/useCart";

const CartPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();
  
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    getCartCount, 
    getCartSubTotal 
  } = useCart();

  const qtyChangeHandler = (id, qty) => {
    updateQuantity(id, qty);
  };

  const removeFromCartHandler = (id) => {
    removeFromCart(id);
  };

  const handleMenuClick = (e) => {
    navigate(`/shop-by-category/${e.key}`);
  };

  const handleProceedBtn = () => {
    if (paymentMethod === "cod") {
      navigate("/success-transaction");
    } else if (paymentMethod === "card") {
      navigate("/card-payment");
    } else {
      alert("Please select a payment method!");
    }
  };

  return (
    <div>
      <div>
        <div
          style={{
            width: "100%",
            background: "#fcf3eeff",
            padding: "1rem 40px 0 0",
            boxShadow: "0 2px 8px #f0f1f2"
          }}
        >
          <div
            style={{
              fontSize: "5rem",
              fontWeight: "500",
              fontFamily: "'Baskervville', serif",
              color: "#9b3803ff",
              cursor: "pointer",
              textAlign: "center",
              marginBottom: "0.5rem"
            }}
            onClick={() => navigate("/")}
          >
            Bellavista
          </div>

          <Menu
            mode="horizontal"
            style={{
              justifyContent: "center",
              fontSize: "1rem",
              background: "transparent",
              gap: "3rem"
            }}
            onClick={handleMenuClick}
          >
            <Menu.Item key="jewelry">Jewelry</Menu.Item>
            <Menu.Item key="watches">Watches</Menu.Item>
            <Menu.Item key="decorations">Decorations</Menu.Item>
            <Menu.Item key="accessories">Accessories</Menu.Item>
          </Menu>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          background: "linear-gradient(135deg, #562003ff, #c34c0bff)",
          textAlign: "center",
          padding: "3rem 0",
          color: "white",
          fontSize: "2.5rem",
          fontWeight: "bold",
          fontFamily: "'Baskervville', serif"
        }}
      >
        Shopping Cart
      </div>

      <div
        style={{
          display: "flex",
          maxWidth: "1400px",
          margin: "3rem auto",
          gap: "2rem",
          flexDirection: window.innerWidth <= 960 ? "column" : "row",
          alignItems: "flex-start"
        }}
      >
        <div
          style={{
            flexBasis: window.innerWidth <= 960 ? "100%" : "70%",
            padding: "1rem"
          }}
        >
          {cartItems.length === 0 ? (
            <div style={{ fontSize: "1.1rem" }}>
              Your Cart Is Empty{" "}
              <Link to="/" style={{ color: "#9b3803ff" }}>
                Go Back
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                qtyChangeHandler={qtyChangeHandler}
                removeHandler={() => removeFromCartHandler(item._id)}
              />
            ))
          )}
        </div>

        <div
          style={{
            flexBasis: window.innerWidth <= 960 ? "100%" : "30%",
            background: "#fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
            height: "fit-content",
            padding: "1rem",
            marginTop: "3rem"
          }}
        >
          <div
            style={{
              padding: "3rem 2rem 1rem 2rem",
              fontWeight: "400",
              fontSize: "1.1rem"
            }}
          >
            <p>Total Items : {getCartCount()}</p>
            <p>Sub Total : ${getCartSubTotal()}</p>
          </div>

          <hr style={{ margin: "0rem 2rem" }} />

          <div style={{ padding: "1rem 2rem", marginBottom: "1.2rem" }}>
            <p style={{ fontWeight: "400", marginBottom: "0.5rem" }}>
              Payment Method
            </p>

            <div style={{ marginBottom: "0.5rem" }}>
              <input
                type="radio"
                id="card"
                name="payment"
                value="card"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="card" style={{ marginLeft: "0.5rem" }}>
                Card Payment
              </label>
            </div>

            <div>
              <input
                type="radio"
                id="cod"
                name="payment"
                value="cod"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="cod" style={{ marginLeft: "0.5rem" }}>
                Cash on Delivery
              </label>
            </div>
          </div>

          <div>
            <button
              onClick={handleProceedBtn}
              style={{
                padding: "10px 17px",
                width: "100%",
                background: "#171717",
                color: "#f4f4f4",
                border: "1px solid #171717",
                cursor: "pointer"
              }}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;