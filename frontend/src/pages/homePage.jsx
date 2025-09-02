import React, { useRef } from "react";
import { Carousel, Card, Row, Col, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import slide1Img from "../assets/slide1.jpg";
import slide2Img from "../assets/slide2.jpg";
import slide3Img from "../assets/slide3.jpg";
import slide4Img from "../assets/slide4.png";
import bts1 from "../assets/bts-necklace.jpg";
import bts2 from "../assets/bts-bracelet.jpg";
import bts3 from "../assets/bts-earing.jpg";
import home1 from "../assets/home1.png";
import home2 from "../assets/home2.jpg";
import ct1 from "../assets/ct1.jpg";
import ct2 from "../assets/ct2.jpg";
import ct3 from "../assets/ct3.jpg";
import ct4 from "../assets/ct4.jpg";
import news1 from "../assets/news1.jpg";
import news2 from "../assets/news2.jpg";
import news3 from "../assets/news3.jpg";

const slides = [
  {
    id: 1,
    bgImage: slide1Img,
    title: "BELLA VISTA",
    description: "Transform Every Outfit with Accessories That Speak Your Style.",
    extra: <button style={{ zIndex: 10, background: "#fff", color: "black", border: "none", borderRadius: "3px", padding: "6px 70px", cursor: "pointer", fontSize: "1rem" }}>Shop Now</button>
  },
  {
    id: 2,
    bgImage: slide2Img,
    title: "BELLA VISTA",
    description: "Discover the Perfect Pieces to Add Elegance and Charm to Your Look.",
    extra: <button style={{ zIndex: 10, background: "#fff", color: "black", border: "none", borderRadius: "3px", padding: "6px 70px", cursor: "pointer", fontSize: "1rem" }}>Shop Now</button>
  },
  {
    id: 3,
    bgImage: slide3Img,
    title: "BELLA VISTA",
    description: "From Minimalist to Statement, Find Accessories That Define You.",
    extra: <button style={{ zIndex: 10, background: "#fff", color: "black", border: "none", borderRadius: "3px", padding: "6px 70px", cursor: "pointer", fontSize: "1rem" }}>Shop Now</button>
  },
  {
    id: 4,
    bgImage: slide4Img,
    title: "BELLA VISTA",
    description: "Where Fashion Meets Personality - Accessories That Make an Impression.",
    extra: <button style={{ zIndex: 10, background: "#fff", color: "black", border: "none", borderRadius: "3px", padding: "6px 70px", cursor: "pointer", fontSize: "1rem" }}>Shop Now</button>
  },
];

const cards = [
  { title: "Necklaces", image: bts1, description: "This season, let your neckline shine. Delicate chains adorned with sparkling crystals and signature motifs create pieces that are both elegant and contemporary. Each necklace catches the light beautifully, making every outfit unforgettable.", buttonText: "Shop Now" },
  { title: "Bracelets", image: bts2, description: "Add a touch of brilliance to your wrist. From sleek bangles to layered designs, our bracelets combine radiant crystals with refined craftsmanship, striking the perfect balance between subtle elegance and statement style.", buttonText: "Shop Now" },
  { title: "Earrings", image: bts3, description: "Transform your look with earrings that dazzle and inspire. From graceful drops to bold hoops, each design is crafted to reflect light and personality. Perfect for both everyday elegance and special occasions.", buttonText: "Shop Now" },
];

const categoryCards = [
  { title: "Jewelry", image: ct1 },
  { title: "Watches", image: ct2 },
  { title: "Decorations", image: ct3 },
  { title: "Accessories", image: ct4 },
];

const newsCards = [
  { title: "The Art of Sparkle", image: news1, description: "Explore how Bella Vista crystals capture and reflect light, transforming everyday pieces into extraordinary expressions of style and elegance.", buttonText: "Discover more" },
  { title: "Color Your World", image: news2, description: "Dive into the vibrant spectrum of crystal colors and learn how each hue can inspire your creativity and personal expression.", buttonText: "Discover more" },
  { title: "Innovating Tradition", image: news3, description: "See how modern design meets timeless craftsmanship, with Bella Vista pieces that honor heritage while pushing the boundaries of style.", buttonText: "Discover more" },
];

const contentStyle = {
  height: "94vh",
  width: "100%",
  color: "#fff",
  fontSize: "2rem",
  position: "relative",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const Home = () => {
  const carouselRef = useRef(null);

  return (
    <div>
      {/* Carousel Section */}
      <Carousel ref={carouselRef} autoplay dots={false}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <div
              style={{
                ...contentStyle,
                backgroundImage: `url(${slide.bgImage})`,
                paddingTop: "5rem",
              }}
            >
              {/* Left Arrow */}
              <button
                style={{
                  position: "absolute",
                  left: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  background: "none",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  padding: "10px",
                  cursor: "pointer",
                }}
                onClick={() => carouselRef.current.prev()}
              >
                <LeftOutlined />
              </button>

              {/* Right Arrow */}
              <button
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  background: "none",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  padding: "10px",
                  cursor: "pointer",
                }}
                onClick={() => carouselRef.current.next()}
              >
                <RightOutlined />
              </button>

              <h1
                style={{
                  fontSize: "8rem",
                  fontWeight: "400",
                  textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
                  fontFamily: "'Baskervville', serif",
                  textAlign: "center",
                  marginBottom: "5rem",
                }}
              >
                {slide.title}
              </h1>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "700px",
                  paddingLeft: "8rem",
                  paddingTop: "4rem",
                }}
              >
                <p style={{ fontSize: "1.3rem", marginBottom: "1rem", fontWeight: "500" }}>
                  {slide.description}
                </p>
                <div>{slide.extra}</div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      <div style={{ padding: "4rem 4rem", background: "#fcf3eeff", textAlign: "center" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "2.5rem", fontFamily: "'Baskervville', serif" }}>
          Shaping Style, Perfecting Craft
        </h2>
        <p style={{ fontSize: "1.1rem" }}>
          From concept to creation, our expertise ensures each accessory is a statement of sophistication and elegance. Every piece combines timeless craftsmanship with modern design, creating accessories that elevate your style and leave a lasting impression.
        </p>
      </div>


      <div style={{ padding: "4rem 4rem", background: "#FFFFFF", textAlign: "center", paddingBottom:"0"}}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "3rem", fontFamily: "'Baskervville', serif" }}>
          Back-to-School Season
        </h2>

        <Row gutter={16} justify="center">
          {cards.map((card, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                variant="borderless"
                style={{ marginBottom: 1 }}
                cover={
                  <img
                    alt={card.title}
                    src={card.image}
                    style={{ height: "600px", border: "none" }} 
                  />
                }
              >
                <h3 style={{ fontSize: "1.7rem", marginBottom: "1.6rem", marginTop: "1.6rem", fontFamily: "'Baskervville', serif" }}>
                  {card.title}
                </h3>

                <p style={{fontSize: "1.1rem", textAlign: "justify" }}>{card.description}</p>
                <Button type="text" style={{fontSize: "1.1rem",color: "black",fontWeight: 400,textDecoration: "underline", textUnderlineOffset: "5px", padding: 0,cursor: "pointer", display: "block", textAlign: "left", background: "transparent", marginBottom: "2.5rem"}}  onMouseEnter={e => {e.currentTarget.style.color = "#555"; e.currentTarget.style.background = "transparent"; }} onMouseLeave={e => {e.currentTarget.style.color = "black"; e.currentTarget.style.background = "transparent"; }}>
                  {card.buttonText}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px"}}>        
        <img 
          src={home1}
          alt="Sample" 
          style={{ width: "50%", aspectRatio: "11/ 12", objectFit: "cover", }} 
        />
        
        <div style={{ width: "50%", textAlign: "justify", padding: "6rem" }}>
          <p style={{ fontSize: "1.2rem", marginBottom: "6px",  }}>BELLA VISTA CREATED DIAMONDS</p>
          <h2 style={{ fontSize: "1.7rem", marginBottom: "25px", fontFamily: "'Baskervville', serif"  }}>The Rings Collection</h2>
          <p style={{ fontSize: "1.05rem", lineHeight: "1.4",  marginBottom: "1.5rem" }}>
            Crafted with precision and elegance, the Bella Vista Rings Collection showcases timeless beauty in every design. Adorned with laboratory-grown diamonds, each ring reflects brilliance and style—from classic solitaires to contemporary statement pieces. Set in fine metals, these rings are made to shine for a lifetime. 
          </p>
          <Button type="text" style={{fontSize: "1.1rem",color: "black",fontWeight: 400,textDecoration: "underline", textUnderlineOffset: "5px", padding: 0,cursor: "pointer", display: "block", textAlign: "left", background: "transparent", marginBottom: "2.5rem"}}  onMouseEnter={e => {e.currentTarget.style.color = "#555"; e.currentTarget.style.background = "transparent"; }} onMouseLeave={e => {e.currentTarget.style.color = "black"; e.currentTarget.style.background = "transparent"; }}>
                  Discover the Rings
          </Button>
      </div>     
    </div>

    <div style={{padding: "4rem 4rem", height: "90vh",backgroundImage: `url(${home2})`, backgroundSize: "cover", backgroundPosition: "center", textAlign: "left", color: "#fff", marginTop:"10vh",display: "flex",alignItems: "center"}}>
      <h2 style={{fontSize: "2rem",width: "20vw", fontWeight:300, textAlign:"center" }}>
        Every Bella Vista piece reflects timeless beauty and elegance.
      </h2>
    </div>

    <div style={{ padding: "5rem 4rem", background: "#fcf3eeff", textAlign: "center"}}>
      <h2 style={{ fontSize: "2.5rem", marginBottom: "3rem", fontFamily: "'Baskervville', serif" }}>
        Shop by Category
      </h2>

      <Row gutter={16} justify="center">
        {categoryCards.map((category, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card
              variant="borderless"
              style={{ marginBottom: 1 }}
              cover={
                <img
                  alt={category.title}
                  src={category.image}
                  style={{ height: "400px", objectFit: "cover", border: "none" }} 
                />
              }
            >
              <h3 style={{ fontSize: "1.5rem", marginTop: "1rem", fontFamily: "'Baskervville', serif" }}>
                {category.title}
              </h3>
            </Card>
          </Col>
        ))}
      </Row>
    </div>

    <div style={{ padding: "5rem 4rem", background: "#FFFFFF", textAlign: "center"}}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "3rem", fontFamily: "'Baskervville', serif" }}>
          World of Bella Vista
        </h2>

        <Row gutter={30} justify="center">
          {newsCards.map((news, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                variant="borderless"
                style={{ marginBottom: 1 }}
                cover={
                  <img
                    alt={news.title}
                    src={news.image}
                    style={{ aspectRatio: "11/ 12", border: "none" }} 
                  />
                }
              >
                <h3 style={{ fontSize: "1.7rem", marginBottom: "1.6rem", marginTop: "1.6rem", fontFamily: "'Baskervville', serif" }}>
                  {news.title}
                </h3>

                <p style={{fontSize: "1.1rem", textAlign: "justify" }}>{news.description}</p>
                <Button type="text" style={{fontSize: "1.1rem",color: "black",fontWeight: 400,textDecoration: "underline", textUnderlineOffset: "5px", padding: 0,cursor: "pointer", display: "block", textAlign: "left", background: "transparent", marginBottom: "2.5rem"}}  onMouseEnter={e => {e.currentTarget.style.color = "#555"; e.currentTarget.style.background = "transparent"; }} onMouseLeave={e => {e.currentTarget.style.color = "black"; e.currentTarget.style.background = "transparent"; }}>
                  {news.buttonText}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
    </div>
    
    <div style={{ padding: "4rem 4rem", background: "#fcf3eeff", textAlign: "center" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "2.5rem", fontFamily: "'Baskervville', serif" }}>
          Capturing Light, Celebrating Elegance
        </h2>
        <p style={{ fontSize: "1.1rem" }}>
          From design to finish, each accessory is crafted to reflect brilliance and sophistication. Combining expert craftsmanship with contemporary style, every piece adds a radiant touch that enhances your look and leaves a lasting impression.
        </p>
    </div>



    




    </div>
  );
};

export default Home;
