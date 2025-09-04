import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";

const ProductDetail = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: 1,
    title: "Elegant Diamond Necklace",
    description: "A stunning handcrafted diamond necklace featuring premium quality diamonds set in 18k white gold. This exquisite piece combines timeless elegance with modern sophistication, perfect for special occasions or as a luxurious everyday accessory. Each diamond is carefully selected for its brilliance and clarity, ensuring exceptional sparkle and beauty.",
    price: 2499.99,
    image: "/assets/products/diamond-necklace.jpg", 
    category: "jewelry",
    inStock: true,
    rating: 4.8,
    reviews: 127
  };

  const handleMenuClick = (e) => {
    navigate(`/shop-by-category/${e.key}`);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.title} to cart`);
  };

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
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

      <div
        style={{
          minHeight: "calc(100vh - 200px)",
          background: "#f8f9fa",
          padding: "3rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "8vh auto",
            display: "flex",
            gap: "10vw",
            alignItems: "flex-start"
          }}
        >
          <div
            style={{
              flex: "1",
              maxWidth: "500px"
            }}
          >
            <div
              style={{
                width: "100%",
                height: "500px",
                background: "#ffffff",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden"
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div
                style={{
                  display: "none",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#f0f0f0",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                  color: "#666",
                  flexDirection: "column"
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📷</div>
                <div>Product Image</div>
              </div>
            </div>
          </div>

          <div
            style={{
              flex: "1",
              maxWidth: "600px"
            }}
          >
            <div
              style={{
                background: "#ffffff",
                padding: "2.5rem",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
              }}
            >
              <h1
                style={{
                  fontSize: "2rem",
                  fontWeight: "600",
                  fontFamily: "'Baskervville', serif",
                  color: "black",
                  marginBottom: "1rem",
                  lineHeight: "1.3"
                }}
              >
                {product.title}
              </h1>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1.5rem"
                }}
              >
                <div style={{ color: "#ffa500", fontSize: "1.1rem" }}>
                  ⭐ {product.rating}
                </div>
                <div style={{ color: "#666", fontSize: "0.9rem" }}>
                  ({product.reviews} reviews)
                </div>
              </div>

              <div
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.6",
                  color: "#555",
                  marginBottom: "1.5rem",
                  textAlign: "justify"
                }}
              >
                {product.description}
              </div>

              {/* Divider */}
              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid #e0e0e0",
                  margin: "1.5rem 0"
                }}
              />

              {/* Product Price */}
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "black",
                  marginBottom: "2rem"
                }}
              >
                ${product.price.toFixed(2)}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "2rem"
                }}
              >
                <span style={{ fontWeight: "500", fontSize: "1rem" }}>Quantity:</span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    overflow: "hidden"
                  }}
                >
                  <button
                    onClick={() => handleQuantityChange('decrease')}
                    style={{
                      padding: "8px 12px",
                      border: "none",
                      background: "#f8f9fa",
                      cursor: "pointer",
                      fontSize: "1.2rem"
                    }}
                  >
                    -
                  </button>
                  <span
                    style={{
                      padding: "8px 16px",
                      background: "white",
                      minWidth: "50px",
                      textAlign: "center"
                    }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange('increase')}
                    style={{
                      padding: "8px 12px",
                      border: "none",
                      background: "#f8f9fa",
                      cursor: "pointer",
                      fontSize: "1.2rem"
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                style={{
                  width: "100%",
                  padding: "15px",
                  background: "#9b3803ff",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease"
                }}
                onMouseOver={(e) => e.target.style.background = "#7d2d02"}
                onMouseOut={(e) => e.target.style.background = "#9b3803ff"}
              >
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </button>

              <div
                style={{
                  marginTop: "1rem",
                  fontSize: "0.9rem",
                  color: product.inStock ? "#28a745" : "#dc3545",
                  textAlign: "center"
                }}
              >
                {product.inStock ? "✓ In Stock" : "✗ Out of Stock"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;