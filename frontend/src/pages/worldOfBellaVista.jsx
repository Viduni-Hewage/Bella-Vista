import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import world1 from "../assets/world/world1.jpg";
import world2 from "../assets/world/world2.jpg";
import world3 from "../assets/world/world3.jpg";
import world4 from "../assets/world/world4.jpg";


const WorldOfBellaVista = () => {
    const navigate = useNavigate();

    const handleClick = (item) => {
    if (item === "World of BellaVista") {
      navigate("/world");
    }
    if (item === "Jewelry") {
      navigate("/shop-by-category/jewelry");
    }
    if (item === "Watches") {
      navigate("/shop-by-category/watches");
    }
    if (item === "Decorations") {
      navigate("/shop-by-category/decorations");
    }
    if (item === "Accessories") {
      navigate("/shop-by-category/accessories");
    }
    if (item === "News") {
       navigate("/news");
    }
  };

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
                        <h1 style={{fontSize: "2.4rem", fontWeight: "500", fontFamily: "'Baskervville', serif", marginBottom: "1.5rem", marginTop: "3.5rem"}}>World of Bella Vista</h1>
                        <p style={{fontSize: "1.2rem" }}>Illuminating the many facets of Bella Vista from heritage to lifestyle and beyond. </p>

                    </div>
                </div>         
            </div> 
            
            <div style={{ display: "flex", alignItems: "center"}}>        
                <img 
                    src={world1}
                    alt="Sample" 
                    style={{ width: "50%", aspectRatio: "1/ 1", objectFit: "cover", }} 
                />
                    
                <div style={{ width: "50%", textAlign: "justify", padding: "6rem" }}>
                    <h2 style={{ fontSize: "1.8rem", marginBottom: "25px", fontFamily: "'Baskervville', serif"  }}>The Art of Sparkle</h2>
                    <p style={{ fontSize: "1.2rem", lineHeight: "1.4",  marginBottom: "1.5rem" }}>
                        Each crystal is cut with technical mastery to reflect brilliance from every angle, capturing light in its purest form. The craftsmanship ensures that even the smallest detail shines, turning jewelry into more than just an accessory—it becomes an artwork of radiance, beauty, and precision.
                    </p>
                    <p style={{ fontSize: "1.2rem", lineHeight: "1.4",  marginBottom: "1.5rem" }}>
                        Beyond the sparkle lies a deeper meaning: confidence, individuality, and elegance in every moment. Whether worn casually or saved for grand occasions, these creations remind you that sophistication is not occasional - it’s a way of life meant to be celebrated.
                    </p>
                </div>  
            </div>

            <div style={{ display: "flex", alignItems: "center"}}>        

                <div style={{ width: "50%", textAlign: "justify", padding: "6rem" }}>                
                    <h2 style={{ fontSize: "1.8rem", marginBottom: "25px", fontFamily: "'Baskervville', serif"  }}>Color Your World</h2>
                    <p style={{ fontSize: "1.2rem", lineHeight: "1.4",  marginBottom: "1.5rem" }}>
                        Colors hold power, emotion, and character, and our jewelry embraces them all. From vivid shades that ignite confidence to soft tones that speak of calm, each piece lets you express a personal story through radiant hues.
                    </p>
                    <p style={{ fontSize: "1.2rem", lineHeight: "1.4",  marginBottom: "1.5rem" }}>
                        By combining the brilliance of crystal with the richness of color, jewelry transforms into a canvas of personality. Each shade shines as bright as your individuality, allowing you to step into the world boldly, embracing style that reflects both your spirit and mood. 
                    </p>
                </div>
                <img 
                    src={world2}
                    alt="Sample" 
                    style={{ width: "50%", aspectRatio: "1/ 1", objectFit: "cover", }} 
                />  
            </div>

            <div style={{ display: "flex", alignItems: "center"}}>        
                <img 
                    src={world3}
                    alt="Sample" 
                    style={{ width: "50%", aspectRatio: "1/ 1", objectFit: "cover", }} 
                />
                    
                <div style={{ width: "50%", textAlign: "justify", padding: "6rem" }}>                    
                    <h2 style={{ fontSize: "1.8rem", marginBottom: "25px", fontFamily: "'Baskervville', serif"  }}>Innovating Tradition</h2>
                    <p style={{ fontSize: "1.2rem", lineHeight: "1.4",  marginBottom: "1.5rem" }}>
                        Heritage and innovation come together in designs that respect the past while reimagining the future. Our jewelry honors timeless artistry while adopting bold modern techniques, striking a perfect balance between legacy and progress.
                    </p>
                    <p style={{ fontSize: "1.2rem", lineHeight: "1.4",  marginBottom: "1.5rem" }}>
                        These creations carry the elegance of tradition infused with fresh creativity. With every design, innovation keeps the heritage alive, making each piece meaningful today and tomorrow. It is jewelry that resonates across generations while continuing to inspire new ways of expressing style.
                    </p>
                </div>  
            </div>

            <div style={{ display: "flex", alignItems: "strech"}}>        
                    
                <div style={{ width: "50%", textAlign: "justify", padding: "6rem" }}>
                    <h2 style={{ fontSize: "1.8rem", marginBottom: "25px", fontFamily: "'Baskervville', serif"  }}>Timeless Radiance</h2>
                    <p style={{ fontSize: "1.2rem", lineHeight: "1.4",  marginBottom: "1.5rem" }}>
                        True luxury is not bound by time or fleeting fashion. With precision-cut crystals and enduring design, our jewelry promises brilliance that outlives trends, staying relevant for years to come. 
                    </p> 
                    <p style={{ fontSize: "1.2rem", lineHeight: "1.4",  marginBottom: "1.5rem" }}>
                        Every piece symbolizes love, sophistication, and beauty that transcends occasions. Worn daily or treasured for milestones, timeless radiance ensures jewelry remains not only a style statement but also a lasting reflection of elegance that grows more meaningful with every moment.
                    </p>                    
                </div> 
                <img 
                    src={world4}
                    alt="Sample" 
                    style={{ width: "50%", aspectRatio: "1/ 1", objectFit: "cover", }} 
                /> 
            </div>



        </div>
        
            
    );
}

export default WorldOfBellaVista;
