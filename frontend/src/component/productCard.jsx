import React, { useState } from "react";
import { Card, Badge, message } from "antd";
import { HeartOutlined, HeartFilled, ShoppingCartOutlined, CheckOutlined } from "@ant-design/icons";
import { useCart } from "../context/useCart";

const ProductCard = ({ product, onClick }) => {
  const [liked, setLiked] = useState(false);
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = () => {
    try {
      addToCart(product);
      message.success(`${product.title} added to cart!`);
    } catch (error) {
      message.error("Failed to add item to cart");
      console.error("Add to cart error:", error);
    }
  };

  const handleLikeToggle = () => {
    setLiked(!liked);
    message.info(liked ? "Removed from wishlist" : "Added to wishlist");
  };

  const isProductInCart = isInCart(product._id);

  return (
    <Card
      hoverable
      style={{ width: "100%", marginBottom: "1rem", borderRadius: 0 }}
      cover={
        <img
          alt={product.title}
          src={product.image}
          style={{
            objectFit: "contain",
            width: "100%",
            height: "40vh",
            borderRadius: 0,
            cursor: "pointer"
          }}
          onClick={onClick}
        />
      }
      actions={[
        <div key="like" onClick={handleLikeToggle} style={{ cursor: "pointer" }}>
          {liked ? (
            <HeartFilled style={{ color: "red", fontSize: "1.2rem" }} />
          ) : (
            <HeartOutlined style={{ color: "gray", fontSize: "1.2rem" }} />
          )}
        </div>,
        <div
          key="cart"
          onClick={product.inStock ? handleAddToCart : null}
          style={{
            cursor: product.inStock ? "pointer" : "not-allowed",
            color: !product.inStock
              ? "#ccc"
              : isProductInCart
              ? "green"
              : "inherit",
          }}
        >
          {isProductInCart ? (
            <CheckOutlined style={{ fontSize: "1.2rem", color: "green" }} />
          ) : (
            <ShoppingCartOutlined style={{ fontSize: "1.2rem" }} />
          )}
        </div>
      ]}
    >
      {product.isNew && <Badge.Ribbon text="New" color="red" />}
      {isProductInCart && <Badge.Ribbon text="In Cart" color="green" />}
      
      <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
        {product.title}
      </h3>
      <p style={{ fontSize: "0.95rem", color: "#555", marginBottom: "0.5rem" }}>
        {product.description && product.description.length > 60
          ? product.description.substring(0, 60) + "…"
          : product.description || "No description available"}
      </p>
      <p style={{ fontWeight: "bold", marginBottom: "-1rem" }}>
        ${product.price?.toFixed(2)}{" "}
        <span
          style={{
            fontWeight: "normal",
            fontSize: "0.85rem",
            color: product.inStock ? "#28a745" : "#dc3545",
            marginLeft: "0.3rem",
          }}
        >
          ({product.inStock ? "In Stock" : "Out of Stock"})
        </span>
      </p>
    </Card>
  );
};

export default ProductCard;