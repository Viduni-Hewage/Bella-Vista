import React, { useEffect, useState } from "react";
import { Breadcrumb, Row, Col, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../component/productCard";
import accessoriesBg from "../../assets/category/cat4.jpg";

const Accessories = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/category/accessories")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div
        style={{
          width: "100%",
          maxHeight: "40vh",
          backgroundImage: `url(${accessoriesBg})`,
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
            padding: "1.9rem 2rem 2.3rem 2rem",
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
                    onClick={() =>
                      navigate("/shop-by-category/accessories")
                    }
                  >
                    Accessories
                  </span>
                ),
              },
            ]}
          />
          <h1 style={{ fontSize: "2rem", fontFamily: "'Baskervville', serif" }}>
            Chic and Stylish Fashion Accessories to Complete Your Look
          </h1>
          <p style={{ fontSize: "0.9rem", lineHeight: "1.3", margin: 0 }}>
            Discover our elegant range of fashion accessories, crafted to add style and personality to any outfit. From statement pieces to subtle finishing touches, each item enhances your look. Perfect for day-to-day wear or special occasions, these accessories bring charm and sophistication.
          </p>
        </div>
      </div>

      <div style={{padding: "3.5rem 2.5rem", backgroundColor:"#fcf3eeff"}}>
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={[16, 16]}>
            {products.map((product) => (
              <Col xs={24} sm={12} md={6} key={product._id}>
                <ProductCard
                  product={product}
                  onClick={() => navigate(`/product/${product._id}`, { state: { product } })
                  }
                />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default Accessories;

