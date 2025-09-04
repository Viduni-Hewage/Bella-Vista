// src/component/productCard.jsx
import React, { useState } from "react";
import { Card, Badge } from "antd";
import { HeartOutlined, HeartFilled, ShoppingCartOutlined } from "@ant-design/icons";

const ProductCard = ({ product, onClick }) => {
  const [liked, setLiked] = useState(false);

  return (
    <Card
      hoverable
      style={{ width: "100%", marginBottom: "1rem", borderRadius: 0 }}
      cover={
        <img
          alt={product.title}
          src={product.image}
          style={{
            objectFit: "cover",
            width: "100%",
            aspectRatio: "1 / 1",
            borderRadius: 0,
            cursor: "pointer",
          }}
          onClick={onClick} 
        />
      }
      actions={[
        liked ? (
          <HeartFilled
            key="like"
            onClick={() => setLiked(false)}
            style={{ color: "red", fontSize: "1.2rem" }}
          />
        ) : (
          <HeartOutlined
            key="like"
            onClick={() => setLiked(true)}
            style={{ color: "gray", fontSize: "1.2rem" }}
          />
        ),
        <ShoppingCartOutlined
          key="cart"
          style={{ fontSize: "1.2rem" }}
          onClick={() => console.log("Add to cart:", product.title)}
        />,
      ]}
    >
      {product.isNew && <Badge.Ribbon text="New" color="red" />}
      <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>{product.title}</h3>
      <p style={{ fontSize: "0.95rem", color: "#555", marginBottom: "0.5rem" }}>
        {product.description}
      </p>
      <p style={{ fontWeight: "bold", marginBottom: "-1rem" }}>${product.price || "0.00"}</p>
    </Card>
  );
};

export default ProductCard;
