import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Row, Col, Spin, Empty, message } from "antd";
import axios from "axios";
import ProductCard from "../component/productCard";

const FavouritePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleMenuClick = (e) => {
    navigate(`/shop-by-category/${e.key}`);
  };

  const getStoredLikes = () => {
    const stored = JSON.parse(localStorage.getItem("likedProducts")) || [];
    const now = new Date().getTime();

    const validLikes = stored.filter(
      (item) => now - item.timestamp < 30 * 24 * 60 * 60 * 1000
    );

    if (validLikes.length !== stored.length) {
      localStorage.setItem("likedProducts", JSON.stringify(validLikes));
    }

    return validLikes.map((item) => item.id);
  };

  useEffect(() => {
    const fetchFavouriteProducts = async () => {
      setLoading(true);
      try {
        const likedIds = getStoredLikes();

        if (likedIds.length === 0) {
          setProducts([]);
          setLoading(false);
          return;
        }

        const response = await axios.post(
          "https://localhost:5000/api/products/by-ids",
          { ids: likedIds }
        );

        setProducts(response.data.products || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching favourite products:", err);
        message.error("Failed to load favourite products");
        setProducts([]);
        setLoading(false);
      }
    };

    fetchFavouriteProducts();

    const handleLikeChange = () => {
      fetchFavouriteProducts();
    };

    window.addEventListener("likeChanged", handleLikeChange);

    return () => {
      window.removeEventListener("likeChanged", handleLikeChange);
    };
  }, []);

  return (
    <div>
      <div
        style={{
          width: "100%",
          background: "#fcf3eeff",
          padding: "1rem 40px 0 0",
          boxShadow: "0 2px 8px #f0f1f2",
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
            marginBottom: "0.5rem",
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
            gap: "3rem",
          }}
          onClick={handleMenuClick}
        >
          <Menu.Item key="jewelry">Jewelry</Menu.Item>
          <Menu.Item key="watches">Watches</Menu.Item>
          <Menu.Item key="decorations">Decorations</Menu.Item>
          <Menu.Item key="accessories">Accessories</Menu.Item>
        </Menu>
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
          fontFamily: "'Baskervville', serif",
        }}
      >
        Your Favourites
      </div>

      <div style={{ padding: "3.5rem 2.5rem", backgroundColor: "#fcf3eeff" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem 0" }}>
            <Spin size="large" />
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem 0" }}>
            <Empty
              description={
                <span style={{ fontSize: "1.1rem", color: "#666" }}>
                  No favourite products yet. Start exploring and add items to your wishlist!
                </span>
              }
            />
            <div style={{ marginTop: "1.5rem" }}>
              <button
                onClick={() => navigate("/shop-by-category")}
                style={{
                  padding: "0.8rem 2rem",
                  fontSize: "1rem",
                  background: "#9b3803ff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontFamily: "'Baskervville', serif",
                }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <>            
            <Row gutter={[16, 16]}>
              {products.map((product) => (
                <Col xs={24} sm={12} md={6} key={product._id}>
                  <ProductCard
                    product={product}
                    onClick={() =>
                      navigate(`/product/${product._id}`, { state: { product } })
                    }
                  />
                </Col>
              ))}
            </Row>
          </>
        )}
      </div>
    </div>
  );
};

export default FavouritePage;
