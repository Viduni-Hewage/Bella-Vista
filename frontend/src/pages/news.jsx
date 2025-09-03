import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import News1 from "../assets/news/News1.jpg";
import News2 from "../assets/news/News2.jpg";
import News3 from "../assets/news/News3.jpg";
import News4 from "../assets/news/News4.jpg";
import News5 from "../assets/news/News5.jpg";

const News = () => {
    const navigate = useNavigate();

    const handleClick = (item) => {
        if (item === "World of BellaVista") {
        navigate("/world");
        }
        // if (item === "Jewelry") {
        //   navigate("/jewelry");
        // }
        // if (item === "Watches") {
        //   navigate("/watches");
        // }
        // if (item === "Decorations") {
        //   navigate("/decorations");
        // }
        // if (item === "Accessories") {
        //   navigate("/accessories");
        // }
        if (item === "News") {
        navigate("/news");
        }
    };

    const newsItems = [
    {
        title: "Introducing the 2025 Diamond Rings Collection",
        date: "Sep 1, 2025",
        description:
        "Bella Vista proudly presents the 2025 Diamond Rings Collection, a celebration of timeless elegance and meticulous craftsmanship. Each ring is designed to capture light, radiance, and sophistication, combining classic solitaires with bold, contemporary designs. Using ethically sourced materials and lab-grown diamonds, the collection reflects our commitment to sustainability without compromising luxury. Every piece tells a story of beauty, artistry, and enduring style, offering customers a unique opportunity to adorn themselves with creations that are both exquisite and meaningful.",
        image: News1,
    },
    {
        title: "BellaVista at Paris Fashion Week",
        date: "Aug 20, 2025",
        description:
        "Bella Vista made a spectacular impression at Paris Fashion Week, showcasing our exclusive jewelry pieces on a global stage. The runway featured a stunning array of designs blending traditional craftsmanship with modern aesthetics. Celebrities, fashion critics, and enthusiasts admired the elegance, creativity, and precision of our collection. This event reinforced BellaVista’s position as a leader in luxury jewelry, celebrating artistry, innovation, and timeless beauty. Each showcased piece reflected the brand’s commitment to exquisite design, attention to detail, and unparalleled quality for discerning customers worldwide.",
        image: News2,
    },
    {
        title: "Sustainability: Lab-Grown Diamonds",
        date: "Aug 5, 2025",
        description:
        "Bella Vista is committed to redefining luxury through sustainability. Our lab-grown diamonds are created with cutting-edge technology, offering the same brilliance and quality as mined stones while minimizing environmental impact. By choosing lab-grown options, BellaVista combines ethical responsibility with refined elegance, ensuring every piece is both beautiful and conscientious. Customers can enjoy stunning rings, necklaces, and earrings with confidence, knowing that each creation is eco-friendly, responsibly sourced, and crafted with meticulous attention to detail, demonstrating that luxury and sustainability can coexist harmoniously.",
        image: News3,
    },
    {
        title: "Exclusive Watches Launch 2025",
        date: "Jul 15, 2025",
        description:
        "Bella Vista unveils its 2025 line of exclusive luxury watches, combining Swiss precision with timeless design. Each watch reflects impeccable craftsmanship, attention to detail, and the elegance synonymous with the BellaVista brand. Designed for collectors and style enthusiasts alike, the collection offers both classic and contemporary styles that complement any wardrobe. From sophisticated mechanical movements to sleek modern finishes, every piece is crafted to ensure durability, performance, and aesthetic perfection. This launch represents our dedication to innovation, elegance, and enduring luxury for our clientele.",
        image: News4,
    },
    {
        title: "BellaVista Jewelry Charity Event",
        date: "Jun 30, 2025",
        description:
        "Bella Vista recently hosted an inspiring charity event aimed at supporting local communities and promoting social development. The event featured a curated showcase of signature jewelry collections, highlighting our dedication to artistry, luxury, and excellence. Guests enjoyed an elegant evening of networking, philanthropy, and appreciation for finely crafted pieces. Funds raised will contribute to educational initiatives, community programs, and sustainability projects. Through this event, BellaVista not only celebrated its exquisite creations but also demonstrated a deep commitment to making a meaningful positive impact on society and the environment.",
        image: News5,
    },
    ];

    return(
        <div>
            <div style = {{height:"60vh", backgroundColor: "#fcf3eeff", paddingBottom: "1rem"}}>  
                
                <div style={{textAlign: "center", marginBottom: "1rem" }} >
                    
                    <h1
                        style={{fontSize: "7rem", fontWeight: "500", fontFamily: "'Baskervville', serif", color: "#9b3803ff", marginBottom: "2rem", cursor: "pointer", paddingTop:"3rem"}}
                        onClick={() => navigate("/")}
                    >
                        BELLA VISTA
                    </h1>

                    <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1.5rem", marginTop: "-3rem" }} >
                        {[
                        "Jewelry",
                        "Watches",
                        "Decorations",
                        "Accessories",
                        "News",
                        "World of BellaVista",
                        ].map((item, index) => (
                            <Button key={index} type="text" 
                                style={{ fontSize: "1rem", fontWeight: "400", color: "#333", padding: 0, }}
                                onClick={() => handleClick(item)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "transparent";
                                    e.currentTarget.style.color = "#000";
                                    e.currentTarget.style.fontSize = "1.1rem";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "transparent";
                                    e.currentTarget.style.color = "#333";
                                    e.currentTarget.style.fontSize = "1rem";
                                }}
                            >
                                {item}
                            </Button>
                        )
                        )}
                    </div>
                    <div>
                        <h1 style={{fontSize: "2.4rem", fontWeight: "500", fontFamily: "'Baskervville', serif", marginBottom: "1.5rem", marginTop: "3.5rem"}}>News & Stories</h1>
                        <p style={{fontSize: "1.2rem" }}>Discover the latest updates, collections, and inspirations from the world of BellaVista.</p>

                    </div>
                </div>         
            </div> 
            <div style={{margin: "4rem 7rem"}}>
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                    {newsItems.map((item, index) => (
                    <div
                        key={index}
                        style={{
                        display: "flex",
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        overflow: "hidden",
                        backgroundColor: "#fff",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        alignItems: "center",
                        }}
                    >
                        {/* Left Image */}
                        <div style={{ flex: "0 0 40%", position: "relative"  }}>
                        <img
                            src={item.image}
                            alt={item.title}
                            style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover",display: "block"}}
                        />
                        </div>

                        {/* Right Content */}
                        <div style={{ flex: "1", padding: "1.5rem 4rem" }}>
                        <h2
                            style={{
                            fontSize: "1.8rem",
                            fontFamily: "'Baskervville', serif",
                            marginBottom: "0.5rem",
                            }}
                        >
                            {item.title}
                        </h2>
                        <p style={{ color: "gray", marginBottom: "2rem" }}>{item.date}</p>
                        <p style={{ fontSize: "1.05rem", lineHeight: "1.6", textAlign: "justify" }}>
                            {item.description}
                        </p>
                        </div>
                    </div>
                    ))}
                </div>                    
            </div>
            
            

        </div>
        
            
    );
}

export default News;
