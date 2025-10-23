import React, { useState, useEffect } from "react";
import { Card, Badge, message } from "antd";
import { HeartOutlined, HeartFilled, ShoppingCartOutlined, CheckOutlined } from "@ant-design/icons";
import { useCart } from "../context/useCart";
import { useAuth0 } from "@auth0/auth0-react";

const ProductCard = ({ product, onClick }) => {
  const { addToCart, isInCart } = useCart();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [liked, setLiked] = useState(false);

  const getStoredLikes = () => {
    const stored = JSON.parse(localStorage.getItem("likedProducts")) || [];
    const now = new Date().getTime();

    const validLikes = stored.filter((item) => now - item.timestamp < 30 * 24 * 60 * 60 * 1000);

    if (validLikes.length !== stored.length) {
      localStorage.setItem("likedProducts", JSON.stringify(validLikes));
    }

    return validLikes.map((item) => item.id);
  };

  useEffect(() => {
    const likedIds = getStoredLikes();
    setLiked(likedIds.includes(product._id));
  }, [product._id]);

  const handleAddToCart = () => {
    try {
      addToCart(product);
      message.success(`${product.title} added to cart!`);
    } catch (error) {
      message.error("Failed to add item to cart");
      console.error("Add to cart error:", error);
    }
  };

  const handleLikeToggle = async () => {
    if (!isAuthenticated) {
      sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
      await loginWithRedirect({
        appState: { returnTo: window.location.pathname },
      });
      return;
    }

    const stored = JSON.parse(localStorage.getItem("likedProducts")) || [];
    let updated;

    if (liked) {
      updated = stored.filter((item) => item.id !== product._id);
      message.info("Removed from wishlist");
    } else {
      updated = [
        ...stored,
        { id: product._id, timestamp: new Date().getTime() },
      ];
      message.success("Added to wishlist");
    }

    localStorage.setItem("likedProducts", JSON.stringify(updated));
    setLiked(!liked);

    window.dispatchEvent(new Event("likeChanged"));
  };

  const isProductInCart = isInCart(product._id);

  return (
    <Card
      hoverable
      style={{ width: "100%", marginBottom: "1rem", borderRadius: 0 }}
      cover={
        <div style={{ overflow: "hidden", width: "100%", height: "40vh" }}>
          <img
            alt={product.title}
            src={product.image}
            style={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
              borderRadius: 0,
              cursor: "pointer",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            onClick={onClick}
          />
        </div>
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
        </div>,
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
