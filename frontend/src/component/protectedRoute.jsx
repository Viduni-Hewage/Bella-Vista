import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Spin } from "antd";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "5rem" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    return null; 
  }

  return children;
};

export default ProtectedRoute;
