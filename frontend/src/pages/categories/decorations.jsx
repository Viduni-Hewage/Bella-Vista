import React, { useEffect, useState } from "react";
import { Breadcrumb, Row, Col, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../component/productCard";
import decorationsBg from "../../assets/category/cat3.png";

const Decorations = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/category/decorations")
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
          backgroundImage: `url(${decorationsBg})`,
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
                      navigate("/shop-by-category/decorations")
                    }
                  >
                    Decorations
                  </span>
                ),
              },
            ]}
          />
          <h1 style={{ fontSize: "2rem", fontFamily: "'Baskervville', serif" }}>
            Exquisite Home Decorations to Beautify Every Corner
          </h1>
          <p style={{ fontSize: "0.9rem", lineHeight: "1.3", margin: 0 }}>
            Transform your home with our stylish decorations, bring beauty and elegance to any space. Each piece complements your decor, whether modern or classic. From eye-catching accents to subtle details, these decorations enhance your living environment with charm and timeless appeal.
          </p>
        </div>
      </div>

      <div style={{ padding: "3.5rem 2.5rem", backgroundColor:"#fcf3eeff"}}>
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

export default Decorations;

