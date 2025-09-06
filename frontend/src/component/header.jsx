// import React, { useState, useEffect, useRef } from "react";
// import { Layout, Menu, Badge } from "antd";
// import { UserOutlined, ShoppingCartOutlined, HistoryOutlined, LogoutOutlined, LoginOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/useCart";
// import { useAuth0 } from "@auth0/auth0-react";

// const { Header } = Layout;

// const WebHeader = ({ visible }) => {
//   const navigate = useNavigate();
//   const { getCartCount } = useCart();
//   const userCardRef = useRef(null);

//   const [showUserCard, setShowUserCard] = useState(false);

//   const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (userCardRef.current && !userCardRef.current.contains(event.target)) {
//         setShowUserCard(false);
//       }
//     };

//     if (showUserCard) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showUserCard]);

//   const handleMenuClick = (e) => {
//     switch (e.key) {
//       case "jewelry":
//         navigate("/shop-by-category/jewelry");
//         break;
//       case "watches":
//         navigate("/shop-by-category/watches");
//         break;
//       case "decorations":
//         navigate("/shop-by-category/decorations");
//         break;
//       case "accessories":
//         navigate("/shop-by-category/accessories");
//         break;
//       case "news":
//         navigate("/news");
//         break;
//       case "world":
//         navigate("/world");
//         break;
//       default:
//         break;
//     }
//   };

//   const handleUserButtonClick = () => {
//     if (isAuthenticated) {
//       logout({ returnTo: window.location.origin });
//     } else {
//       loginWithRedirect();
//     }
//   };

//   return (
//     <Header
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100%",
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         background: "#fff",
//         padding: "0 40px",
//         boxShadow: "0 2px 8px #f0f1f2",
//         height: "10vh",
//         transition: "all 0.3s ease",
//         opacity: visible ? 1 : 0,
//         pointerEvents: visible ? "auto" : "none",
//         zIndex: 1000,
//       }}
//     >
//       <div
//         style={{
//           fontSize: "2rem",
//           fontWeight: "bold",
//           fontFamily: "'Baskervville', serif",
//           color: "#9b3803ff",
//           cursor: "pointer",
//         }}
//         onClick={() => navigate("/")}
//       >
//         BellaVista
//       </div>

//       <Menu
//         mode="horizontal"
//         style={{ flex: 1, justifyContent: "center", borderBottom: "none", fontSize: "1rem" }}
//         onClick={handleMenuClick}
//       >
//         <Menu.Item key="jewelry">Jewelry</Menu.Item>
//         <Menu.Item key="watches">Watches</Menu.Item>
//         <Menu.Item key="decorations">Decorations</Menu.Item>
//         <Menu.Item key="accessories">Accessories</Menu.Item>
//         <Menu.Item key="news">News</Menu.Item>
//         <Menu.Item key="world">World of BellaVista</Menu.Item>
//       </Menu>

//       <div style={{ fontSize: "1rem", display: "flex", alignItems: "center", position: "relative" }}>
//         <span
//           style={{
//             marginRight: "20px",
//             cursor: "pointer",
//             display: "flex",
//             alignItems: "center",
//             position: "relative",
//             padding: "8px 12px",
//             borderRadius: "50px",
//             transition: "all 0.3s ease",
//             backgroundColor: "transparent",
//           }}
//           onClick={() => setShowUserCard(!showUserCard)}
//           ref={userCardRef}
//         >
//           <UserOutlined
//             style={{
//               fontSize: "20px",
//               marginRight: "6px",
//               color: "#9b3803ff",
//               transition: "color 0.3s ease",
//             }}
//           />
//           {isAuthenticated && (
//             <span
//               style={{
//                 color: "#9b3803ff",
//                 fontWeight: "500",
//                 display: window.innerWidth > 768 ? "inline" : "none",
//               }}
//             >
//               {user.name}
//             </span>
//           )}

//           {showUserCard && (
//             <div
//               style={{
//                 position: "absolute",
//                 top: "120%",
//                 right: 0,
//                 width: "280px",
//                 minWidth: "16rem",
//                 background: "#ffffff",
//                 border: "1px solid #e8e8e8",
//                 boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
//                 borderRadius: "12px",
//                 zIndex: 100,
//                 overflow: "hidden",
//                 animation: "slideDown 0.3s ease-out",
//               }}
//             >
//               <div
//                 style={{
//                   padding: "20px",
//                   borderBottom: "1px solid #f0f0f0",
//                   background: isAuthenticated
//                     ? "linear-gradient(135deg, #9b3803ff 0%, #b8441eff 100%)"
//                     : "#f8f9fa",
//                   color: isAuthenticated ? "white" : "#333",
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   textAlign: "center",
//                   gap: "1px",
//                 }}
//               >
//                 <div
//                   style={{
//                     width: "60px",
//                     height: "60px",
//                     borderRadius: "50%",
//                     background: isAuthenticated ? "rgba(255, 255, 255, 0.2)" : "#e9ecef",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <UserOutlined
//                     style={{
//                       fontSize: "24px",
//                       color: isAuthenticated ? "white" : "#6c757d",
//                     }}
//                   />
//                 </div>

//                 <div style={{ fontSize: "16px", fontWeight: "600" }}>
//                   {isAuthenticated ? `Hi, ${user.name}` : "Welcome"}
//                 </div>

//                 <div style={{ fontSize: "14px", opacity: 1, marginTop: "-2rem" }}>
//                   {isAuthenticated ? "Valued Customer" : "Please sign in"}
//                 </div>
//               </div>

//               <div style={{ padding: "8px 0" }}>
//                 {isAuthenticated && (
//                   <>
//                     <button
//                       onClick={() => {
//                         navigate("/purchase-history");
//                         setShowUserCard(false);
//                       }}
//                       style={{
//                         width: "100%",
//                         padding: "3px 20px",
//                         border: "none",
//                         background: "transparent",
//                         textAlign: "left",
//                         cursor: "pointer",
//                         fontSize: "14px",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "12px",
//                         transition: "background-color 0.2s ease",
//                       }}
//                       onMouseEnter={(e) => (e.target.style.backgroundColor = "#f8f8f8")}
//                       onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
//                     >
//                       <HistoryOutlined style={{ fontSize: "16px", color: "#666", width: "16px" }} />
//                       <span style={{ color: "#333", fontWeight: "500" }}>Purchase History</span>
//                     </button>

//                     <div
//                       style={{
//                         height: "1px",
//                         background: "#f0f0f0",
//                         margin: "0px 20px",
//                       }}
//                     ></div>
//                   </>
//                 )}

//                 <button
//                   onClick={() => {
//                     handleUserButtonClick();
//                     setShowUserCard(false);
//                   }}
//                   style={{
//                     width: "100%",
//                     padding: "12px 20px",
//                     border: "none",
//                     background: "transparent",
//                     textAlign: "left",
//                     cursor: "pointer",
//                     fontSize: "14px",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "12px",
//                     transition: "background-color 0.2s ease",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.target.style.backgroundColor = isAuthenticated ? "#fff2f0" : "#f6ffed";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.backgroundColor = "transparent";
//                   }}
//                 >
//                   {isAuthenticated ? (
//                     <LogoutOutlined style={{ fontSize: "16px", color: "#ff4d4f", width: "16px" }} />
//                   ) : (
//                     <LoginOutlined style={{ fontSize: "16px", color: "#52c41a", width: "16px" }} />
//                   )}
//                   <span style={{ color: isAuthenticated ? "#ff4d4f" : "#52c41a", fontWeight: "600" }}>
//                     {isAuthenticated ? "Sign Out" : "Sign In"}
//                   </span>
//                 </button>
//               </div>
//             </div>
//           )}
//         </span>

//         <span style={{ cursor: "pointer", display: "flex", alignItems: "center" }} onClick={() => navigate("/cart")}>
//           <Badge
//             count={getCartCount()}
//             offset={[0, 0]}
//             style={{
//               backgroundColor: "#f5222d",
//               fontSize: "0.75rem",
//               minWidth: "18px",
//               height: "18px",
//               lineHeight: "18px",
//               borderRadius: "50%",
//             }}
//           >
//             <ShoppingCartOutlined style={{ fontSize: "20px" }} />
//           </Badge>
//         </span>
//       </div>

//       <style jsx>{`
//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </Header>
//   );
// };

// export default WebHeader;


import React, { useState, useEffect, useRef } from "react";
import { Layout, Menu, Badge } from "antd";
import { UserOutlined, ShoppingCartOutlined, LogoutOutlined, LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useAuth0 } from "@auth0/auth0-react";

const { Header } = Layout;

const WebHeader = ({ visible }) => {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const userCardRef = useRef(null);
  const [showUserCard, setShowUserCard] = useState(false);
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userCardRef.current && !userCardRef.current.contains(event.target)) {
        setShowUserCard(false);
      }
    };

    if (showUserCard) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserCard]);

  const handleMenuClick = (e) => {
    switch (e.key) {
      case "jewelry":
        navigate("/shop-by-category/jewelry");
        break;
      case "watches":
        navigate("/shop-by-category/watches");
        break;
      case "decorations":
        navigate("/shop-by-category/decorations");
        break;
      case "accessories":
        navigate("/shop-by-category/accessories");
        break;
      case "news":
        navigate("/news");
        break;
      case "world":
        navigate("/world");
        break;
      default:
        break;
    }
  };

  const handleUserButtonClick = () => {
    if (isAuthenticated) {
      logout({ returnTo: window.location.origin });
    } else {
      loginWithRedirect();
    }
  };

  return (
    <Header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        padding: "0 40px",
        boxShadow: "0 2px 8px #f0f1f2",
        height: "10vh",
        transition: "all 0.3s ease",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          fontFamily: "'Baskervville', serif",
          color: "#9b3803ff",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        BellaVista
      </div>

      {/* Navigation Menu */}
      <Menu
        mode="horizontal"
        style={{ flex: 1, justifyContent: "center", borderBottom: "none", fontSize: "1rem" }}
        onClick={handleMenuClick}
      >
        <Menu.Item key="jewelry">Jewelry</Menu.Item>
        <Menu.Item key="watches">Watches</Menu.Item>
        <Menu.Item key="decorations">Decorations</Menu.Item>
        <Menu.Item key="accessories">Accessories</Menu.Item>
        <Menu.Item key="news">News</Menu.Item>
        <Menu.Item key="world">World of BellaVista</Menu.Item>
      </Menu>

      {/* User & Cart */}
      <div style={{ fontSize: "1rem", display: "flex", alignItems: "center", position: "relative" }}>
        {/* User Dropdown */}
        <span
          style={{
            marginRight: "20px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            position: "relative",
            padding: "8px 12px",
            borderRadius: "50px",
            transition: "all 0.3s ease",
            backgroundColor: "transparent",
          }}
          onClick={() => setShowUserCard(!showUserCard)}
          ref={userCardRef}
        >
          <UserOutlined
            style={{
              fontSize: "20px",
              marginRight: "6px",
              color: "#9b3803ff",
              transition: "color 0.3s ease",
            }}
          />
          {isAuthenticated && (
            <span
              style={{
                color: "#9b3803ff",
                fontWeight: "500",
                display: window.innerWidth > 768 ? "inline" : "none",
              }}
            >
              {user.name}
            </span>
          )}

          {showUserCard && (
            <div
              style={{
                position: "absolute",
                top: "120%",
                right: 0,
                width: "280px",
                minWidth: "16rem",
                background: "#ffffff",
                border: "1px solid #e8e8e8",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                borderRadius: "12px",
                zIndex: 100,
                overflow: "hidden",
                animation: "slideDown 0.3s ease-out",
              }}
            >
              {/* User Info */}
              <div
                style={{
                  padding: "20px",
                  borderBottom: "1px solid #f0f0f0",
                  background: isAuthenticated
                    ? "linear-gradient(135deg, #9b3803ff 0%, #b8441eff 100%)"
                    : "#f8f9fa",
                  color: isAuthenticated ? "white" : "#333",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  gap: "1px",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: isAuthenticated ? "rgba(255, 255, 255, 0.2)" : "#e9ecef",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <UserOutlined
                    style={{
                      fontSize: "24px",
                      color: isAuthenticated ? "white" : "#6c757d",
                    }}
                  />
                </div>

                <div style={{ fontSize: "16px", fontWeight: "600" }}>
                  {isAuthenticated ? `Hi, ${user.name}` : "Welcome"}
                </div>
                <div style={{ fontSize: "14px", opacity: 1, marginTop: "-2rem" }}>
                  {isAuthenticated ? "Valued Customer" : "Please sign in"}
                </div>
              </div>

              {/* Dropdown Buttons */}
              <div style={{ padding: "8px 0" }}>
                {isAuthenticated && (
                  <>
                    {/* Profile Button */}
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setShowUserCard(false);
                      }}
                      style={{
                        width: "100%",
                        padding: "3px 20px",
                        border: "none",
                        background: "transparent",
                        textAlign: "left",
                        cursor: "pointer",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        transition: "background-color 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#f8f8f8")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                    >
                      <UserOutlined style={{ fontSize: "16px", color: "#666", width: "16px" }} />
                      <span style={{ color: "#333", fontWeight: "500" }}>Profile</span>
                    </button>

                    <div
                      style={{
                        height: "1px",
                        background: "#f0f0f0",
                        margin: "0px 20px",
                      }}
                    ></div>
                  </>
                )}

                {/* Login / Logout Button */}
                <button
                  onClick={() => {
                    handleUserButtonClick();
                    setShowUserCard(false);
                  }}
                  style={{
                    width: "100%",
                    padding: "12px 20px",
                    border: "none",
                    background: "transparent",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = isAuthenticated ? "#fff2f0" : "#f6ffed";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                  }}
                >
                  {isAuthenticated ? (
                    <LogoutOutlined style={{ fontSize: "16px", color: "#ff4d4f", width: "16px" }} />
                  ) : (
                    <LoginOutlined style={{ fontSize: "16px", color: "#52c41a", width: "16px" }} />
                  )}
                  <span style={{ color: isAuthenticated ? "#ff4d4f" : "#52c41a", fontWeight: "600" }}>
                    {isAuthenticated ? "Sign Out" : "Sign In"}
                  </span>
                </button>
              </div>
            </div>
          )}
        </span>

        {/* Cart */}
        <span style={{ cursor: "pointer", display: "flex", alignItems: "center" }} onClick={() => navigate("/cart")}>
          <Badge
            count={getCartCount()}
            offset={[0, 0]}
            style={{
              backgroundColor: "#f5222d",
              fontSize: "0.75rem",
              minWidth: "18px",
              height: "18px",
              lineHeight: "18px",
              borderRadius: "50%",
            }}
          >
            <ShoppingCartOutlined style={{ fontSize: "20px" }} />
          </Badge>
        </span>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Header>
  );
};

export default WebHeader;

