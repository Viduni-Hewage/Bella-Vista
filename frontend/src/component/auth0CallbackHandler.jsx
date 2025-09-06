import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Auth0CallbackHandler = () => {
  const { isLoading, isAuthenticated, error } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (error) {
        console.error('Auth0 error:', error);
        navigate('/');
        return;
      }

      if (isAuthenticated) {
        const fromCart = sessionStorage.getItem("fromCart");
        const paymentMethod = sessionStorage.getItem("pendingPaymentMethod");

        const redirectTo = sessionStorage.getItem("redirectAfterLogin");

        if (fromCart === "true" && paymentMethod) {
          sessionStorage.removeItem("fromCart");
          sessionStorage.removeItem("pendingPaymentMethod");

          if (paymentMethod === "cod") {
            navigate("/cod-payment");
          } else if (paymentMethod === "card") {
            navigate("/card-payment");
          } else {
            navigate("/cart");
          }
        } else if (redirectTo) {
          sessionStorage.removeItem("redirectAfterLogin");
          navigate(redirectTo);
        } else {
          navigate("/");
        }
      }
    }
  }, [isLoading, isAuthenticated, error, navigate]);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem'
      }}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: 'red'
      }}>
        Authentication Error: {error.message}
      </div>
    );
  }

  return null;
};

export default Auth0CallbackHandler;
