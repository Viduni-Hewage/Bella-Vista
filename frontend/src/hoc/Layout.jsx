import { Outlet, useLocation } from 'react-router-dom';
import WebHeader from "../component/header";
import WebFooter from '../component/footer';
import { useState, useEffect } from 'react';

const Layout = () => {
  const [showHeader, setShowHeader] = useState(false);
  const location = useLocation();

  const hideHeaderRoutes = ["/card-payment", "/cod-payment", "/success-transaction"];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowHeader(scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <div>
      {!shouldHideHeader && <WebHeader visible={showHeader} />}
      <main>
        <Outlet />
      </main>
      <WebFooter />
    </div>
  );
};

export default Layout;
