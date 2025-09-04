import React, { useState, useEffect } from "react";
import { Menu, Breadcrumb, Row, Col, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../component/productCard";
import jewelryBg from "../../assets/category/cat1.png";

const Jewelry = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("necklaces"); // default type

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products/category/jewelry`
        );
        // filter by type (necklaces, bracelets, earrings, rings)
        const filtered = data.filter((p) => p.type === selectedType);
        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedType]);

  return (
    <div>
      <div
        style={{
          width: "100%",
          maxHeight: "45vh",
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
            padding: "2rem 2rem 0 2rem",
            maxWidth: "45vw",
          }}
        >
          <Breadcrumb
            style={{ color: "#fff", paddingBottom: "1rem" }}
            separator={<span style={{ color: "#fff" }}> / </span>}
            items={[
              {
                title: (
                  <span
                    style={{ cursor: "pointer", color: "#fff" }}
                    onClick={() => navigate("/")}
                  >
                    Home
                  </span>
                ),
              },
              {
                title: (
                  <span
                    style={{ cursor: "pointer", color: "#fff" }}
                    onClick={() => navigate("/shop-by-category/jewelry")}
                  >
                    Jewelry
                  </span>
                ),
              },
            ]}
          />
          <h1 style={{ fontSize: "2rem", fontFamily: "'Baskervville', serif" }}>
            Jewelry: Earrings, Bracelets, Necklaces and Rings
          </h1>
          <p style={{ fontSize: "0.9rem", lineHeight: "1.3", margin: 0 }}>
            Looking for wear-forever fashion jewelry? You've come to the right place. Expect necklaces, earrings, rings, and everything in-between with crystal designs that make a unique statement, day or night.
          </p>
        </div>

        <Menu
          mode="horizontal"
          style={{
            justifyContent: "center",
            borderBottom: "none",
            fontSize: "1rem",
            fontWeight: "500",
            gap: "2rem",
            alignSelf: "center",
            background: "transparent",
          }}
          selectedKeys={[selectedType]}
          onClick={(e) => setSelectedType(e.key)}
        >
          <Menu.Item key="necklaces">Necklaces</Menu.Item>
          <Menu.Item key="bracelets">Bracelets</Menu.Item>
          <Menu.Item key="earrings">Earrings</Menu.Item>
          <Menu.Item key="rings">Rings</Menu.Item>
        </Menu>
      </div>

      <div style={{ padding: "3.5rem 2.5rem", backgroundColor:"#fcf3eeff" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "5rem" }}>
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={[16, 16]}>
            {products.length > 0 ? (
              products.map((product) => (
                <Col xs={24} sm={12} md={6} key={product._id}>
                  <ProductCard
                    product={product}
                    onClick={() =>
                      navigate(`/product/${product._id}`)
                    }
                  />
                </Col>
              ))
            ) : (
              <p>No products found for {selectedType}</p>
            )}
          </Row>
        )}
      </div>
    </div>
  );
};

export default Jewelry;

