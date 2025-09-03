import { Layout, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import {
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

const WebFooter = () => {
  const navigate = useNavigate();

  return (
    <Footer style={{ background: "#000", color: "#fff", padding: "5rem 4rem" }}>
      <Row justify="center" gutter={[70, 0]} style={{ marginBottom: "3rem" }}>
        <Col>
            <h3 style={{ color: "#fff", fontSize: "1.1rem", margin: 0, fontWeight: 400, cursor:"pointer" }}
              onClick={() => navigate("/news")}
            >
            News
            </h3>
        </Col>
        <Col>
            <h3 style={{ color: "#fff", fontSize: "1.1rem", margin: 0, fontWeight: 400, cursor:"pointer" }}
               onClick={() => navigate("/world")}
            >
            World of BellaVista
            </h3>
        </Col>
      </Row>

      <hr style={{ borderColor: "#333", marginBottom: "2rem" }} />

      <Row justify="space-between" align="middle" >
        <Col span={8} style={{ textAlign: "left", fontSize: "0.9rem" }}>
          <p style={{ marginBottom: "0.8rem", width: "25vw" }}>
            Copyright © 2025 BellaVista Other Countries / Regions.  
            All rights reserved.
          </p>
          <p style={{ margin: 0, width: "25vw"  }}>
            BELLA VISTA and the BELLA logo are registered trademarks of BellaVista AG.
          </p>
        </Col>

        <Col span={8} style={{ textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: "2rem", fontFamily: "'Baskervville', serif" }}>
            BELLA VISTA
          </h2>
        </Col>

        <Col span={8} style={{ textAlign: "right", display: "flex", justifyContent: "flex-end", gap: "17px" }}>
          <FacebookOutlined style={{ fontSize: "1.3rem", color: "#fff" }} />          
          <InstagramOutlined style={{ fontSize: "1.3rem", color: "#fff" }} />
          <YoutubeOutlined style={{ fontSize: "1.3rem", color: "#fff" }} />
          
        </Col>
      </Row>
    </Footer>
  );
};

export default WebFooter;
